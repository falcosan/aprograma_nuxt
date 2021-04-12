<template>
  <div class="field-item">
    <label v-if="blok.type !== 'submit'" :class="`field-label  ${fieldError() ? 'text-red-700' : 'text-black'}`">{{ blok.name }}</label>
    <component
      :is="blok.tag"
      :name="blok.name"
      :type="blok.tag === 'textarea' ? false : blok.type"
      :class="`field-input w-full resize-none p-2 focus:outline-none
      ${isMessage ? 'h-20' : 'h-10 leading-10'}
      ${fieldError() ? 'border-dotted border-2 border-red-700' : 'border border-black'}`"
      :value="fieldValue !== '' ? fieldValue : false"
      @keyup="updateFields()"
      @input="$emit('update:fieldValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    },
    fieldValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isEmail: this.blok.type === 'email',
      isMessage: this.blok.tag === 'textarea',
      isField: !this.isMessage && !this.isEmail
    }
  },
  computed: {
    emailFail () {
      return this.isEmail && !this.$emailValidator(this.fieldValue)
    },
    messageFail () {
      return this.isMessage && this.fieldValue.length < 5
    },
    fieldFail () {
      return this.fieldValue.length < 1 && this.$store.state.validator.check
    }
  },

  methods: {
    updateFields () {
      if (this.isEmail) {
        this.$store.commit('validator/checkEmail', this.fieldValue)
      } else if (this.isMessage) {
        this.$store.commit('validator/checkMessage', this.fieldValue)
      }
    },
    fieldError () {
      if (this.emailFail && this.$store.state.validator.email.passed === 'no') {
        return true
      } else if (this.messageFail && this.$store.state.validator.message.passed === 'no') {
        return true
      } else if (this.isField && this.fieldFail) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
