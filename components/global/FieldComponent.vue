<template>
  <div class="field-item">
    <label v-if="blok.type !== 'submit'" class="field-label">{{ blok.name }}</label>
    <component
      :is="blok.tag"
      :name="blok.name"
      :type="blok.tag === 'textarea' ? false : blok.type"
      :placeholder="blok.value_placeholder"
      :class="`field${isEmail && $store.state.validator.email.passed === 'no' ? emailFail : isMessage && $store.state.validator.message.passed === 'no' ? messageFail : ''}`"
      :value="fieldValue === '' ? false : fieldValue"
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
      isMessage: this.blok.tag === 'textarea'
    }
  },
  computed: {
    emailFail () {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.fieldValue) ? null : this.emailControl()
    },
    messageFail () {
      return this.fieldValue.length > 5 ? null : this.messageControl()
    }
  },
  methods: {
    updateFields () {
      if (this.blok.type === 'email') {
        this.$store.commit('validator/emailValidation', this.fieldValue)
      } else if (this.blok.tag === 'textarea') {
        this.$store.commit('validator/messageValidation', this.fieldValue)
      }
    },
    emailControl () {
      if (this.$store.state.validator.email.passed === 'no') {
        return ' bg-red-500'
      }
    },
    messageControl () {
      if (this.$store.state.validator.message.passed === 'no') {
        return ' bg-green-500'
      }
    }
  }
}
</script>
