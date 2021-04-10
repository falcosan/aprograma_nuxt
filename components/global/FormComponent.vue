
<template>
  <transition-group
    tag="div"
    appear
    appear-active-class="transition-opacity duration-200 out-in"
    appear-class="opacity-0"
    class="form-container"
  >
    <h1 key="form-title" class="form-title mb-10">
      {{ blok.title }}
    </h1>
    <form key="form" class="form grid gap-y-10 w-7/12" novalidate="true" @submit.prevent="test">
      <Field
        v-for="(input, index) in blok.body"
        :key="input._uid"
        class=""
        :field-value.sync="fields[index]"
        :blok="input"
      />
      <input class="button-submit justify-self-end py-3 px-10 cursor-pointer bg-black text-white" type="submit" :value="blok.submit">
    </form>
  </transition-group>
</template>

<script>
import emailjs from 'emailjs-com'
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
      fields: {}
    }
  },

  destroyed () {
    this.$store.dispatch('validator/clearValues')
  },
  methods: {
    // submit (e) {
    //   if (this.blok.type === 'contact_form') {
    //     this.$store.dispatch('validator/checkValues')
    //     if (this.$store.state.validator.email.passed === 'yes' && this.$store.state.validator.message.passed === 'yes') {
    //       emailjs.sendForm(this.$config.emailJSservice, 'contact_form', e.target,
    //         this.$config.emailJSuser)
    //         .then(() => {
    //           alert(this.blok.passed_message)
    //           this.$store.dispatch('validator/clearValues')
    //         }, () => {
    //           alert('form di contatto momentaneamenre non disponibile')
    //         })
    //     } else if (this.$store.state.validator.email.passed === 'no' && this.$store.state.validator.message.passed === 'yes') {
    //       alert(this.blok.reject_email_field)
    //     } else if (this.$store.state.validator.email.passed === 'yes' && this.$store.state.validator.message.passed === 'no') {
    //       alert(this.blok.reject_text_field)
    //     } else {
    //       alert(this.blok.reject_message)
    //     }
    //   }
    // },
    test () {
      if (this.blok.type === 'contact_form') {
        this.$store.dispatch('validator/checkValues')
        if (this.$store.state.validator.email.passed === 'yes' && this.$store.state.validator.message.passed === 'yes' && Object.keys(this.fields).length === this.blok.body.length && Object.values(this.fields).every(text => text.length > 1)) {
          alert(this.blok.passed_message)
          this.$store.dispatch('validator/clearValues')
        } else if (this.$store.state.validator.email.passed === 'no' && this.$store.state.validator.message.text > 5) {
          alert(this.blok.reject_email_field)
        } else if (this.$emailValidator(this.$store.state.validator.email.text) && this.$store.state.validator.message.passed === 'no') {
          alert(this.blok.reject_text_field)
        } else {
          alert(this.blok.reject_message)
        }
      }
    }
  }
}
</script>
