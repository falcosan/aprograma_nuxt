
<template>
  <div
    :class="`form-container w-full m-0 items-center`"
  >
    <Loader v-if="submitting" size="w-32" class="form-loading w-full h-full flex justify-center absolute top-0 left-0 opacity-70 bg-black" />
    <transition enter-active-class="duration-200 linear" leave-active-class="duration-200 linear" enter-class="-translate-y-full" leave-to-class="-translate-y-full">
      <div v-if="alert.message" :class="`form-alert absolute w-full top-0 left-0 p-5 text-center transform transition-transform text-lg ${alert.color} text-white`" v-text="alert.message" />
    </transition>
    <h1 key="form-title" class="form-title mb-10">
      {{ blok.title }}
    </h1>
    <form key="form" class="form w-full grid gap-y-10" novalidate="true" @submit.prevent="submit">
      <Field
        v-for="(input, index) in blok.body"
        :key="input._uid"
        class="contact-field"
        :field-value.sync="fields[index]"
        :blok="input"
      />
      <input class="button-submit justify-self-end py-3 px-10 cursor-pointer focus:outline-none bg-black text-white" type="submit" :value="blok.submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Field from '../global/FieldComponent'
import Loader from '../global/LoaderComponent'
export default {
  components: { Field, Loader },
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

  destroyed () {
    this.$store.dispatch('validator/clearValues')
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

    async submit () {
      if (this.blok.type === 'contact_form') {
        this.$store.dispatch('validator/checkValues')
        if (this.$store.state.validator.email.passed === 'yes' && this.$store.state.validator.message.passed === 'yes' && Object.keys(this.fields).length === this.blok.body.length && Object.values(this.fields).every(text => text.length > 0)) {
          this.submitting = true
          try {
            await axios.post(
              '/.netlify/functions/sendmail',
              {
                name: this.fields[0],
                email: this.$store.state.validator.email.text,
                message: this.$store.state.validator.message.text
              }
            )
            this.submitting = false
            this.setAlert(this.blok.passed_message, 'bg-green-400')
          } catch {
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
