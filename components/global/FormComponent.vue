
<template>
  <transition-group
    tag="div"
    appear
    appear-active-class="transition-opacity duration-200 out-in"
    appear-class="opacity-0"
    class="form-container"
  >
    <form key="form" class="form flex" novalidate="true" @submit.prevent="test">
      <InputForm
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
      fields: []
    }
  },
  computed: {
    count () {
      return this.fields.map(x => x)
    }
  },
  methods: {
    sendEmail (e) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.$store.state.data.email)) {
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
    },
    test () {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.$store.state.data.email) && this.count) {
        alert('ies')
      } else {
        alert('compila il form con tutte le informazioni')
      }
    }
  }
}
</script>
