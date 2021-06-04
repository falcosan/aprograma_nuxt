<template>
  <footer
    v-if="$store.state.data.windowWidth >= 768 && $device.isDesktop"
    :style="`background-color: ${blok.background_color.color};`"
    :class="`footer ${expanded} w-full fixed z-40 bottom-0 transition-height duration-200 ease-in-out`"
    @mouseleave="expandOut"
    @mouseover="expandIn"
  >
    <div class="input-container flex justify-between px-5 text-center text-xl transform -translate-y-7">
      <span :class="`input-footer animate-bounce transition-colors duration-700 ${$themeColor($store.state.data.themeColor) ? 'text-white' : 'text-black'}`">
        <span v-for="(input, index) in 3" :key="index" class="input-dots">•</span>
      </span>
      <span :class="`input-footer animate-bounce transition-colors duration-700 ${$themeColor($store.state.data.themeColor) ? 'text-white' : 'text-black'}`">
        <span v-for="(input, index) in 3" :key="index" class="input-dots">•</span>
      </span>
    </div>
    <div class="footer-content h-1/2 flex items-center">
      <div
        class="messages-container flex-1 row-start-1 row-end-1 col-start-1 col-end-1 ml-4"
      >
        <span :class="`footer-messages text-sm ${$themeColor(blok.background_color.color) ? 'text-white' : 'text-black'}`">
          Aprograma {{ typewriter }}
        </span>
      </div>
      <span
        :class="`footer-copyright text-sm text-center flex-1 row-start-1 row-end-1 col-start-1 col-end-3 ${$themeColor(blok.background_color.color) ? 'text-white' : 'text-black'}`"
      >
        © 2020 - {{ currentYear }}, <strong>Aprograma</strong>
      </span>
      <ul
        class="social-links grid grid-flow-col gap-3 mr-3 flex-1 row-start-1 row-end-1 col-start-2 col-end-2 justify-end"
      >
        <li v-for="iconLink in $contentByName(blok.body, 'Link')" :key="iconLink._uid">
          <component
            :is="iconLink.component"
            :blok="iconLink"
            :class="`social-icon ${$themeColor(blok.background_color.color) ? 'filter invert' : ''}`"
          />
        </li>
      </ul>
    </div>
  </footer>
  <footer
    v-else
    class="footer h-48 my-12 mx-auto px-2"
  >
    <div class="footer-content h-full flex flex-col items-center text-center">
      <span :class="`input-footer relative bottom-10 animate-bounce text-center text-xl transition-colors duration-700 ${$themeColor($store.state.data.themeColor) ? 'text-white' : 'text-black'}`">
        <span v-for="(input, index) in 3" :key="index" class="input-dots">•</span>
      </span>
      <div
        class="messages-container flex-1"
      >
        <span :class="`footer-messages text-sm transition-colors duration-700 ${$themeColor($store.state.data.themeColor) ? 'text-white' : 'text-black'}`">
          Aprograma {{ typewriter }}
        </span>
      </div>
      <span
        :class="`footer-copyright flex-1 text-sm text-center transition-colors duration-700 ${$themeColor($store.state.data.themeColor) ? 'text-white' : 'text-black'}`"
      >
        © 2020 - {{ currentYear }}, <strong>Aprograma</strong>
      </span>
      <ul
        class="social-links grid grid-flow-col gap-3 flex-1"
      >
        <li v-for="iconLink in $contentByName(blok.body, 'Link')" :key="iconLink._uid">
          <component
            :is="iconLink.component"
            :blok="iconLink"
            :class="`social-icon transition duration-700 ${$themeColor($store.state.data.themeColor) ? 'filter invert' : ''}`"
          />
        </li>
      </ul>
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
    '$store.state.language.language' () { this.restartTypewriter() }
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
        this.playTypeText = 0
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
        this.playEraseText = 0
        if (this.typewriterIndex >= this.blok.message.length) { this.typewriterIndex = 0 }
        this.playTypeText = setTimeout(this.typeText, 50)
      }
    },
    restartTypewriter () {
      clearTimeout(this.playTypeText)
      clearTimeout(this.playEraseText)
      this.playTypeText = 0
      this.playEraseText = 0
      this.typewriter = ''
      this.charIndex = 0
      this.typewriterIndex = 0
      setTimeout(this.typeText, 400)
    }
  }
}
</script>
