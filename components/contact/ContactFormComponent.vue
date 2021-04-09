
<template>
  <transition-group
    tag="div"
    appear
    appear-active-class="transition-opacity duration-200 out-in"
    appear-class="opacity-0"
    class="form-container"
  >
    <form key="form" class="form flex" novalidate="true" @submit.prevent="test">
      <Field
        v-for="(input, index) in blok.body"
        :key="input._uid"
        :field-value.sync="fields[index]"
        :blok="input"
      />
      <input type="submit" :value="blok.submit">
    </form>
  </transition-group>
</template>

<script>
// import emailjs from 'emailjs-com'
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
      fields: []
    }
  },
  methods: {
    // sendEmail (e) {
    //   if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.$store.state.validator.email) && this.countWords.every(text => text > 5)) {
    //     emailjs.sendForm(this.$config.emailJSservice, 'contact_form', e.target,
    //       this.$config.emailJSuser)
    //       .then((result) => {
    //         console.log('SUCCESS!', result.status, result.text)
    //       }, (error) => {
    //         console.log('FAILED...', error)
    //       })
    //   } else {
    //     alert('compila il form con tutte le informazioni')
    //   }
    // },
    test () {
      this.$store.dispatch('validator/checkValues')
      if (this.$store.state.validator.email.passed === 'yes' && this.$store.state.validator.message.passed === 'yes') {
        alert('ies')
      } else {
        alert('compila il form con tutte le informazioni')
      }
    }
  }
}
</script>
