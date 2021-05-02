<template>
  <footer
    v-if="$store.state.data.windowWidth >= 768 && $device.isDesktop"
    :style="`background-color: ${blok.background_color.color};`"
    :class="`footer ${expanded} w-full fixed z-10 bottom-0 transition-height duration-200 ease-in-out`"
    @mouseleave="expandOut"
    @mouseover="expandIn"
  >
    <div class="input-footer flex justify-center transform -translate-y-7">
      <span class="input-dot text-center animate-bounce text-xl" :style="`color: ${blok.text_color.color};`">•</span>
    </div>
    <div class="footer-content h-1/2 flex items-center">
      <div
        class="messages-container flex-1 row-start-1 row-end-1 col-start-1 col-end-1 ml-4"
      >
        <span class="footer-messages text-sm">
          Aprograma {{ typewriter }}
        </span>
      </div>
      <h4
        class="footer-copyright text-sm text-center flex-1 row-start-1 row-end-1 col-start-1 col-end-3"
      >
        © 2020 - {{ currentYear }}, Aprograma
      </h4>
      <div
        class="social-links flex flex-1 row-start-1 row-end-1 col-start-2 col-end-2 w-max justify-end"
      >
        <Icon
          v-for="iconLink in $contentByName(blok.body, 'Icon')"
          :key="iconLink._uid"
          size="w-6"
          :blok="iconLink"
          class="social-icon w-6 mr-4"
        />
      </div>
    </div>
  </footer>
  <footer
    v-else
    class="footer h-48 my-12 mx-auto"
  >
    <div class="footer-content h-full flex flex-col items-center text-center">
      <span class="input-dot relative bottom-10 text-center animate-bounce text-xl" :style="`color: ${blok.text_color.color};`">•</span>
      <div
        class="messages-container flex-1"
      >
        <span class="footer-messages text-sm" :style="`color: ${blok.text_color.color};`">
          Aprograma {{ typewriter }}
        </span>
      </div>
      <h4
        class="footer-copyright flex-1 text-sm text-center"
        :style="`color: ${blok.text_color.color};`"
      >
        © 2020 - {{ currentYear }}, Aprograma
      </h4>
      <div
        class="social-links flex flex-1"
      >
        <Icon
          v-for="iconLink in $contentByName(blok.body, 'Icon')"
          :key="iconLink._uid"
          size="w-6"
          :blok="iconLink"
          class="social-icon mr-4"
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
      playTypeText: undefined,
      playEraseText: undefined,
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
    '$store.state.language.language': { handler () { this.restartTypewriter() } }
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
        this.playTypeText = setTimeout(this.typeText, 50)
      } else {
        if (this.typewriterIndex >= this.blok.message.length) { this.typewriterIndex = 0 }
        this.playEraseText = setTimeout(this.eraseText, 1500)
      }
    },
    eraseText () {
      if (this.charIndex > 0) {
        this.typewriter = this.words.substring(0, this.charIndex - 1)
        this.charIndex--
        this.playEraseText = setTimeout(this.eraseText, 50)
      } else {
        this.typewriterIndex++
        if (this.typewriterIndex >= this.blok.message.length) { this.typewriterIndex = 0 }
        this.playTypeText = setTimeout(this.typeText, 50)
      }
    },
    restartTypewriter () {
      clearInterval(this.playTypeText)
      clearInterval(this.playEraseText)
      this.typewriter = ''
      this.charIndex = 0
      this.typewriterIndex = 0
      setTimeout(this.typeText, 400)
    }
  }
}
</script>
