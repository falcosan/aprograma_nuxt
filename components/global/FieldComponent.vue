<template>
  <div class="field-item">
    <label v-if="blok.type !== 'submit'" class="field-label">{{ blok.name }}</label>
    <component
      :is="blok.tag"
      :name="blok.name"
      :type="blok.tag === 'textarea' ? false : blok.type"
      :class="`field-input w-full border resize-none p-2 focus:outline-none
      ${isMessage ? 'h-20' : 'h-7'}
      ${emailFail && $store.state.validator.email.passed === 'no' ? 'border-red-700' : 'border-black'}
      ${messageFail && $store.state.validator.message.passed === 'no' ? 'border-red-700' : 'border-black'}
      ${blok.tag !== 'textarea' && fieldFail ? 'border-red-700' : 'border-black'}`"
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
      isField: !this.isMessage
    }
  },
  computed: {
    emailFail () {
      return this.isEmail && !this.$emailValidator(this.$store.state.validator.email.text)
    },
    messageFail () {
      return this.isMessage && this.$store.state.validator.message.text.length < 5
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
    }
  }
}
</script>
