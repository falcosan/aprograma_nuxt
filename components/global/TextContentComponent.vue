<template>
  <div
    :class="`text-container
    ${$customClass('index', 'flex items-center my-0')}
    ${$customClass('about', 'flex items-center my-0')}
    ${$customClass('contact', 'col-start-2 col-end-2 bg-blue-400')}`"
  >
    <span
      :class="`text-content mx-auto
      ${typewriterStyle('index', 'text-yellow-300')}
      ${$customClass('index', 'flex items-center my-0')}
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
  computed: {
    queryTags () {
      return [...new Set(this.blok.text.content.match(/(?<=<)([^\W].*?)(?=>)/gm))].join(' ')
    }
  },
  watch: {
    '$store.state.data.language': { handler () { this.restartTypewriter() } }
  },
  created () {
    if (this.blok.typewriter) {
      this.typeText()
    }
  },
  destroyed () {
    this.restartTypewriter()
  },
  methods: {
    typeText () {
      if (this.blok.typewriter) {
        if (this.charIndex < this.getTypewriter()[this.index].innerHTML.length) {
          this.typewriter += this.getTypewriter()[this.index].innerHTML.charAt(this.charIndex)
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
          this.typewriter = this.getTypewriter()[this.index].innerHTML.substring(0, this.charIndex - 1)
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
      return this.container.querySelectorAll(this.queryTags)
    },
    textSize () {
      if (this.blok.typewriter) {
        switch (this.blok.typewriter_size) {
          case 'small':
            return 'text-sm'
          case 'normal':
            return ''
          case 'large':
            return 'text-2xl'
          case 'huge':
            return 'text-5xl'
        }
      }
    },
    typewriterStyle (page, style) {
      if (this.blok.typewriter) {
        return this.$customClass(page, `${style.trim()} ${this.textSize()}`)
      } else {
        return ''
      }
    },
    restartTypewriter () {
      if (this.blok.typewriter) {
        clearTimeout(this.typeText)
        clearTimeout(this.eraseText)
        this.typewriter = ''
        this.index = 0
        this.charIndex = 0
      }
    }
  }
}
</script>
