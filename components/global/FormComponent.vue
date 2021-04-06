
<template>
  <transition-group
    tag="div"
    appear
    appear-active-class="transition-opacity duration-200 out-in"
    appear-class="opacity-0"
    class="form-container w-full block mx-auto"
  >
    <form key="form" novalidate class="form flex" @submit.prevent="sendEmail">
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
  </transition-group>
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
      if (this.name !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) && this.message !== '') {
        emailjs.sendForm(this.$config.emailJSservice, 'contact_form', e.target,
          this.$config.emailJSuser)
          .then((result) => {
            console.log('SUCCESS!', result.status, result.text)
          }, (error) => {
            console.log('FAILED...', error)
          })
      } else {
        alert('compila il form con tutte le informazioni')
      }
    }
  }
}
</script>
