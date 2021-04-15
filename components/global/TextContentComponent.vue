<template>
  <div
    :class="`text-container
    ${$customClass('index', 'items-center flex my-0')}
    ${$customClass('about', 'items-center flex my-0')}
    ${$customClass('contact', 'col-start-2 col-end-2 bg-blue-400')}`"
  >
    <span
      key="text-content"
      :class="`text-content mx-auto
      ${$customClass('index', 'flex text-7xl')}
      ${$customClass('about', 'py-6 px-10 bg-yellow-300')}
      ${$customClass('contact', 'w-full h-full py-6 px-10 grid text-white')}`"
      v-html="!blok.typewriter ? blok.text.content : value"
    />
  </div>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      value: '',
      index: 0,
      charIndex: 0
    }
  },
  created () {
    setTimeout(this.typeText, this.blok.delay / 0)
  },
  methods: {
    typeText () {
      if (this.charIndex < this.blok.phrases[this.index].length) {
        this.value += this.blok.phrases[this.index].charAt(this.charIndex)
        this.charIndex++
        setTimeout(this.typeText, this.blok.speed)
      } else {
        setTimeout(this.eraseText, this.blok.delay)
      }
    },
    eraseText () {
      if (this.charIndex > 0) {
        this.value = this.blok.phrases[this.index].substring(0, this.charIndex - 1)
        this.charIndex--
        setTimeout(this.eraseText, this.blok.speed)
      } else {
        this.index++
        if (this.index >= this.blok.phrases.length) { this.index = 0 }
        setTimeout(this.typeText, this.blok.speed)
      }
    }
  }
}
</script>
