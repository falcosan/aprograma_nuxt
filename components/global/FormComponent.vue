
<template>
  <transition-group
    tag="form"
    appear
    appear-active-class="transition-opacity duration-200 out-in"
    appear-class="opacity-0"
    novalidate="true"
    class="form flex"
    @submit="sendEmail"
  >
    <ul key="field-list" class="field-list">
      <InputForm
        v-for="(input, index) in blok.body"
        :key="input._uid"
        :field-value.sync="fields[index]"
        :blok="input"
      />
    </ul>
    <!-- <label>Name</label>
      <input
        v-model="name"
        type="text"
        name="name"
        placeholder="Your Name"
      >
      <label>Email</label>
      <input
        v-model="email"
        type="email"
        name="email"
        placeholder="Your Email"
      >
      <label>Message</label>
      <textarea
        v-model="message"
        name="message"
        cols="30"
        rows="5"
        placeholder="Message"
      />
      <input type="submit" value="Send"> -->
  </transition-group>
</template>

<script>
import emailjs from 'emailjs-com'
import InputForm from './InputFormComponent'
export default {
  components: { InputForm },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      fields: {},
      value: ''
    }
  },
  methods: {
    sendEmail (e) {
      // if (this.name !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) && this.message !== '') {
      emailjs.sendForm(this.$config.emailJSservice, 'contact_form', e.target,
        this.$config.emailJSuser)
        .then((result) => {
          console.log('SUCCESS!', result.status, result.text)
        }, (error) => {
          console.log('FAILED...', error)
        })
      // } else {
      //   alert('compila il form con tutte le informazioni')
      // }
    }
  }
}
</script>
