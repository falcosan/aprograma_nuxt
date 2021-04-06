
<template>
  <form class="contact-form" @submit.prevent="sendEmail">
    <label>Name</label>
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

    <input type="submit" value="Send">
  </form>
</template>

<script>
import emailjs from 'emailjs-com'
export default {
  data () {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    sendEmail (e) {
      emailjs.sendForm(this.$config.emailJSservice, 'contact_form', e.target,
        this.$config.emailJSuser)
        .then((result) => {
          console.log('SUCCESS!', result.status, result.text)
        }, (error) => {
          console.log('FAILED...', error)
        })
    }
  }
}
</script>
