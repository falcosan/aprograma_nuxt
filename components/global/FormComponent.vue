
<template>
  <div
    class="form"
  >
    <transition
      enter-active-class="duration-200 in-out"
      leave-active-class="duration-200 out-in"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <Icon
        v-if="submitting"
        tag="span"
        loader
        class="form-loader w-screen h-screen fixed flex justify-center inset-0 z-30 pointer-events-none bg-opacity-80 bg-white"
        size="w-32"
      />
    </transition>
    <transition enter-active-class="duration-200 linear" leave-active-class="duration-200 linear" enter-class="-translate-y-full" leave-to-class="-translate-y-full">
      <div v-if="alert.message" :class="`form-alert fixed z-20 w-full top-0 left-0 p-5 opacity-90 text-center text-sm md:text-base transform ${alert.color} text-white`" v-text="alert.message" />
    </transition>
    <h2 v-if="blok.show_title" :class="`form-title mb-10 text-4xl`">
      {{ blok.title }}
    </h2>
    <form
      :name="blok.title.toLowerCase().replace(/ /g,'-')"
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
import Field from '../global/FieldComponent'
export default {
  components: { Field },
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
  watch: {
    submitting: { handler () { this.onSubmiting() } }
  },
  destroyed () {
    this.clearFields()
  },
  methods: {
    setAlert (message, color) {
      this.alert.message = message
      this.alert.color = color
      clearInterval(this.alert.timer)
      this.removeAlert()
    },
    removeAlert () {
      this.alert.timer = setTimeout(() => {
        this.alert.timer = 0
        this.alert.message = null
        this.alert.color = ''
      }, 5000)
    },
    clearFields () {
      this.fields = {}
      this.alert.timer = 0
      this.alert.message = null
      this.alert.color = ''
      this.$store.dispatch('validator/clearValues')
    },
    onSubmiting () {
      if (this.submitting) {
        window.scrollTo(0, 0)
        document.body.classList.add('noscroll')
      } else {
        document.body.classList.remove('noscroll')
      }
    },
    async submit () {
      if (this.blok.type === 'contact_form') {
        this.$store.dispatch('validator/checkValues')
        if (this.$store.state.validator.email.passed === 'yes' && this.$store.state.validator.message.passed === 'yes' && Object.keys(this.fields).length === this.$contentByName(this.blok.body, 'Field').length && Object.values(this.fields).every(text => text.length > 0)) {
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
            document.querySelector('form').reset()
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
