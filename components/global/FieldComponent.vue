<template>
  <div class="field-item">
    <label v-if="blok.type !== 'submit'" class="field-label">{{ blok.name }}</label>
    <component
      :is="blok.tag"
      :name="blok.name"
      :type="blok.tag === 'textarea' ? false : blok.type"
      :placeholder="blok.value_placeholder"
      :class="`field${isEmail ? emailFail : isMessage ? messageFail : ''} ${$store.state.validator.check && fieldValue < 1 ? 'bg-red-500' : ''}`"
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
      isMessage: this.blok.tag === 'textarea'
    }
  },
  computed: {
    emailFail () {
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.fieldValue) && this.$store.state.validator.email.passed === 'no' ? ' bg-red-500' : ''
    },
    messageFail () {
      return this.fieldValue.length < 5 && this.$store.state.validator.message.passed === 'no' ? ' bg-red-500' : ''
    }
  },

  methods: {
    updateFields () {
      if (this.isEmail) {
        this.$store.commit('validator/checkEmail', this.fieldValue)
      } else if (this.isMessage) {
        this.$store.commit('validator/checkMessage', this.fieldValue)
      }
    }
  }
}
</script>
