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
      ${$customClass('index', 'text-7xl')}
      ${$customClass('about', 'py-6 px-10 bg-yellow-300')}
      ${$customClass('contact', 'w-full h-full py-6 px-10 grid text-white')}`"
      v-html="!blok.typewriter ? blok.text.content : typewriter"
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
      typewriter: '',
      index: 0,
      charIndex: 0,
      container: document.createElement('div')
    }
  },
  watch: {
    '$store.state.data.language': { handler () { this.restartTypewriter() } }

  },
  created () {
    if (this.blok.typewriter) {
      setTimeout(this.typeText, 0)
    }
  },
  destroyed () {
    this.restartTypewriter()
  },
  methods: {
    typeText () {
      if (this.blok.typewriter) {
        if (this.charIndex < this.getTypewriter()[this.index].innerHTML.replace(/( |<([^>]+)>)/igm, ' ').length) {
          this.typewriter += this.getTypewriter()[this.index].innerHTML.replace(/( |<([^>]+)>)/igm, ' ').charAt(this.charIndex)
          this.charIndex++
          setTimeout(this.typeText, this.blok.speed)
        } else {
          setTimeout(this.eraseText, this.blok.delay)
        }
      }
    },
    eraseText () {
      if (this.blok.typewriter) {
        if (this.charIndex > 0) {
          this.typewriter = this.getTypewriter()[this.index].innerHTML.replace(/( |<([^>]+)>)/igm, ' ').substring(0, this.charIndex - 1)
          this.charIndex--
          setTimeout(this.eraseText, this.blok.speed)
        } else {
          this.index++
          if (this.index >= this.getTypewriter().length) { this.index = 0 }
          setTimeout(this.typeText, this.blok.speed)
        }
      }
    },
    getTypewriter () {
      this.container.innerHTML = this.blok.text.content
      return this.container.querySelectorAll('ul li')
    },
    restartTypewriter () {
      if (this.blok.typewriter) {
        this.typewriter = ''
        clearTimeout(this.typeText)
        clearTimeout(this.eraseText)
        this.index = 0
        this.charIndex = 0
      }
    }
  }
}
</script>
