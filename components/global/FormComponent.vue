
<template>
  <div
    :class="`form-container w-full items-center m-0 ${customClass('contact', 'all', 'col-start-1 col-end-1')}`"
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
        size="w-32"
        class="form-loader w-full h-full flex justify-center absolute top-0 left-0 z-40 bg-white"
      />
    </transition>
    <transition enter-active-class="duration-200 linear" leave-active-class="duration-200 linear" enter-class="-translate-y-full" leave-to-class="-translate-y-full">
      <div v-if="alert.message" :class="`form-alert absolute w-full top-0 left-0 p-5 text-center transform transition-transform text-lg ${alert.color} text-white`" v-text="alert.message" />
    </transition>
    <h1 v-if="blok.show_title && !$store.state.data.mobile" :class="`form-title mb-10 text-5xl ${customClass('contact', 'all', 'pt-6 text-right')}`">
      {{ blok.title }}
    </h1>
    <form
      id="form"
      :name="blok.title.toLowerCase().replace(/ /g,'-')"
      class="form w-full grid gap-y-5"
      novalidate="true"
      @submit.prevent="submit"
    >
      <Field
        v-for="(input, index) in blok.body"
        :key="input._uid"
        class="contact-field"
        :field-value.sync="fields[index]"
        :blok="input"
      />
      <input class="button-submit justify-self-end py-3 px-10 cursor-pointer bg-black text-white" type="submit" :value="blok.submit">
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
      return Object.assign(...this.blok.body.map(({ title }, index) => ({ [title.toLowerCase()]: Object.values(this.fields)[index] })))
    }
  },
  destroyed () {
    this.clearFields()
  },
  methods: {
    customClass (page, component, style) {
      if (this.$store.state.data.page === page && component) {
        return style
      } else {
        return ''
      }
    },
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
    async submit () {
      if (this.blok.type === 'contact_form') {
        this.$store.dispatch('validator/checkValues')
        if (this.$store.state.validator.email.passed === 'yes' && this.$store.state.validator.message.passed === 'yes' && Object.keys(this.fields).length === this.blok.body.length && Object.values(this.fields).every(text => text.length > 0)) {
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
            this.clearFields()
            document.getElementById('form').reset()
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
