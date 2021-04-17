<template>
  <footer
    :class="`footer ${expanded} w-full fixed z-20 bottom-0 bg-gray-200 transition-height duration-200 ease-in-out`"
    @mouseleave="expandOut()"
    @mouseover="expandIn()"
  >
    <div class="input-footer flex justify-center transform -translate-y-10">
      <span class="input-text text-center animate-bounce text-4xl">.</span>
    </div>
    <div class="footer-content grid items-center">
      <div
        class="h-full w-max row-start-1 row-end-1 col-start-1 col-end-1 ml-4"
      >
        <span class="footer-messages text-sm">
          Aprograma {{ typewriter }}
        </span>
      </div>
      <h4
        class="footer-copyright text-sm text-center w-full row-start-1 row-end-1 col-start-1 col-end-3"
      >
        © 2020 - {{ currentYear }}, Aprograma
      </h4>
      <div
        class="social-links flex row-start-1 row-end-1 col-start-2 col-end-2 w-max justify-self-end"
      >
        <Icon
          v-for="iconLink in $contentByName(blok.body, 'Icon')"
          :key="iconLink._uid"
          size="w-8"
          tag="a"
          :blok="iconLink"
          class="social-icon w-6 mr-4"
        />
      </div>
    </div>
  </footer>
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
      expanded: 'not-expanded h-0',
      currentYear: new Date().getFullYear(),
      typewriter: '',
      typewriterIndex: 0,
      charIndex: 0
    }
  },
  computed: {
    words () {
      return this.blok.message[this.typewriterIndex]
    }
  },
  watch: {
    '$store.state.data.language': { handler () { this.restartTypewriter() } }
  },
  created () {
    this.typeText()
  },
  methods: {
    expandIn () {
      this.expanded = 'expandend h-28'
    },
    expandOut () {
      this.expanded = 'not-expanded h-0'
    },
    typeText () {
      if (this.charIndex < this.words.length) {
        this.typewriter += this.words.charAt(this.charIndex)
        this.charIndex++
        setTimeout(this.typeText, 50)
      } else {
        if (this.typewriterIndex >= this.blok.message.length) { this.typewriterIndex = 0 }
        setTimeout(this.eraseText, 2000)
      }
    },
    eraseText () {
      if (this.charIndex > 0) {
        this.typewriter = this.words.substring(0, this.charIndex - 1)
        this.charIndex--
        setTimeout(this.eraseText, 50)
      } else {
        this.typewriterIndex++
        if (this.typewriterIndex >= this.blok.message.length) { this.typewriterIndex = 0 }
        setTimeout(this.typeText, 50)
      }
    },
    restartTypewriter () {
      clearTimeout(this.typeText)
      clearTimeout(this.eraseText)
      this.charIndex = -1
      this.typewriterIndex = 0
      this.typewriter = ''
    }

  }
}
</script>
