
<template>
  <form class="contact-form" @submit="sendEmail">
    <label>Name</label>
    <input type="text" name="user_name">
    <label>Email</label>
    <input type="email" name="user_email">
    <label>Message</label>
    <textarea name="message" />
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
