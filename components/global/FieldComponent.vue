<template>
  <div class="field-item flex flex-row flex-wrap justify-between overflow-hidden">
    <label :class="`field-label mb-5 ${fieldError() ? 'text-red-600' : 'text-black'}`">{{ blok.name }} *</label>
    <transition enter-active-class="duration-100 in-out" leave-active-class="duration-100 out-in" enter-class="translate-x-full" leave-to-class="translate-x-full">
      <span v-if="indication" class="field-indication text-xs h-min-content p-2 transform bg-red-400 text-white">
        {{ blok.indication }}
      </span>
    </transition>
    <component
      :is="blok.tag"
      :name="blok.name"
      :type="blok.type"
      :class="`field-input w-full resize-none p-2 focus:outline-none
      ${isMessage ? 'h-60' : 'h-10 leading-10'}
      ${fieldError() ? 'border-dotted border-2 border-red-600' : 'border border-black'}`"
      :value="fieldValue !== '' ? fieldValue : false"
      @keyup="updateFields(); showIndication()"
      @focus="showIndication()"
      @blur="indication = false"
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
      indication: false
    }
  },
  computed: {
    emailFail () {
      return this.isEmail && !this.$emailValidator(this.fieldValue)
    },
    messageFail () {
      return this.isMessage && this.fieldValue.length < 5
    }
  },

  methods: {
    showIndication () {
      if (this.blok.indication !== '') {
        if (this.emailFail) {
          this.indication = true
        } else if (this.messageFail) {
          this.indication = true
        } else {
          this.indication = false
        }
      }
    },
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
      } else if (this.fieldValue.length < 1 && this.$store.state.validator.check) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
