
<template>
  <div
    ref="form"
    class="form w-full"
  >
    <Modal class="modal-submit" :open="submitting" modal-style="bg-opacity-90 bg-gray-200 cursor-wait">
      <template #body>
        <Icon
          tag="span"
          loader
          class="form-loader max-h-full"
          size="w-32"
        />
      </template>
    </Modal>
    <transition enter-active-class="duration-200 linear" leave-active-class="duration-200 linear" enter-class="-translate-y-full" leave-to-class="-translate-y-full">
      <div v-if="alert.message" :class="`form-alert fixed z-30 w-full left-0 p-5 opacity-90 text-center text-sm md:text-base transform text-white ${$store.state.data.windowWidth < 768 || !$device.isDesktop ? 'top-10' : 'top-0'} ${alert.color}`" v-text="alert.message" />
    </transition>
    <h2 v-if="blok.show_title && blok.title" :class="`form-title mb-10 text-4xl`">
      {{ blok.title }}
    </h2>
    <form
      :name="blok.name.toLowerCase().replace(/ /g,'_')"
      class="form-fields"
      novalidate="true"
      @submit.prevent="submit"
    >
      <Field
        v-for="(input, index) in $contentByName(blok.body, 'Field')"
        :key="input._uid"
        class="contact-field"
        :field-value.sync="fields[index]"
        :blok="input"
      />
      <Button v-for="button in $contentByName(blok.body, 'Button')" :key="button._uid" class="submit-button float-right py-3 px-10" :blok="button" />
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Field from './FieldComponent'
import Modal from './ModalComponent'
export default {
  components: { Field, Modal },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      fields: {},
      submitting: false,
      alert: {
        timer: 0,
        message: null,
        color: ''
      }
    }
  },
  computed: {
    nameField () {
      return Object.assign(...this.$contentByName(this.blok.body, 'Field').map(({ title }, index) => ({ [title.toLowerCase()]: Object.values(this.fields)[index] })))
    }
  },
  beforeDestroy () {
    this.clearFields()
  },
  methods: {
    setAlert (message, color) {
      this.alert.message = message
      this.alert.color = color
      clearInterval(this.alert.timer)
      this.alert.timer = setTimeout(() => { this.removeAlert() }, 5000)
    },
    removeAlert () {
      clearInterval(this.alert.timer)
      this.alert.message = null
      this.alert.color = ''
    },
    clearFields () {
      this.fields = {}
      this.alert.timer = 0
      this.alert.message = null
      this.alert.color = ''
      this.$store.dispatch('validator/clearValues')
    },
    async submit () {
      if (this.blok.type === 'contact_form') {
        this.$store.dispatch('validator/checkValues')
        if (this.$store.state.validator.email.passed === 'yes' && this.$store.state.validator.message.passed === 'yes' && Object.keys(this.fields).length === this.$contentByName(this.blok.body, 'Field').length && Object.values(this.fields).every(text => text.length > 0)) {
          this.removeAlert()
          this.submitting = true
          try {
            await axios.post(
              '/.netlify/functions/sendmail',
              {
                name: this.nameField.name,
                email: this.nameField.email,
                message: this.nameField.message
              }
            )
            this.submitting = false
            this.$refs.form.reset()
            this.clearFields()
            this.setAlert(this.blok.passed_message, 'bg-green-400')
          } catch {
            this.submitting = false
            this.setAlert(this.blok.error_message, 'bg-red-400')
          }
        } else {
          this.setAlert(this.blok.reject_message, 'bg-red-400')
        }
      }
    }
  }
}
</script>
