<template>
  <div class="field-item relative flex flex-col mb-5">
    <label :class="`field-label mb-5 ${fieldError() ? 'text-red-600' : 'text-black'}`">{{ blok.label }} *</label>
    <component
      :is="blok.tag"
      :name="blok.label.toLowerCase().replace(/ /g,'')"
      :type="blok.type"
      :class="`field-input w-full relative z-10 resize-none p-2 mb-10
      ${isMessage ? 'h-40' : 'h-9'}
      ${fieldError() ? 'border-dotted border-2 border-red-600' : 'border border-black'}`"
      :value="fieldValue !== '' ? fieldValue : false"
      @keyup="updateFields(); showIndication()"
      @focus="showIndication()"
      @blur="indication = false"
      @input="$emit('update:fieldValue', $event.target.value); updateFields()"
    />
    <transition v-if="blok.indication" enter-active-class="duration-100 in-out" leave-active-class="duration-100 out-in" enter-class="-translate-y-full" leave-to-class="-translate-y-full">
      <span v-if="indication" class="field-indication w-full absolute -bottom-0 p-2 transform bg-red-400 text-white text-xs text-center">
        {{ blok.indication }}
      </span>
    </transition>
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
