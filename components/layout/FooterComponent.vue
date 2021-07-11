<template>
  <footer
    v-if="$store.state.data.windowWidth >= 768 && $device.isDesktop"
    :style="`background-color: ${blok.background_color.color};`"
    :class="`footer w-full fixed z-40 bottom-0 transition-height duration-200 ease-in-out ${expanded ? 'h-28' : 'h-0'}`"
  >
    <div
      :style="`background-color: ${expanded ? blok.background_color.color : '#fff'};`"
      class="top-kick absolute w-20 h-20 flex right-0 -top-20 items-center justify-center z-10 rounded-tl-md cursor-pointer transition-all duration-200"
      @click="scrollTop();"
    >
      <Icon arrow tag="button" size="w-auto" :class="`justify-center transform rotate-90 ${expanded ? $themeColor(blok.background_color.color) ? 'filter invert' : '' : ''}`" />
    </div>
    <div
      class="content-container h-full overflow-hidden"
      @mouseleave="expandOut"
      @mouseover="expandIn"
    >
      <div
        :class="`open-footer absolute left-0 -top-20 ${expanded ? 'w-full' : 'w-20'}`"
      >
        <div
          class="icon-open w-20 h-20 flex justify-center items-center rounded-tr-md transition-all duration-200"
          :style="`background-color: ${expanded ? blok.background_color.color : '#fff'};`"
        >
          <Icon
            eye
            tag="span"
            size="w-auto"
            :class="`${expanded ? $themeColor(blok.background_color.color) ? 'filter invert' : '' : ''}`"
          />
        </div>
      </div>
      <div
        :class="`footer-content h-full w-full grid grid-flow-col auto-cols-fr gap-5 items-center transition-opacity duration-200 ${expanded ? '' : 'opacity-0'}`"
      >
        <div
          class="messages-container ml-4"
        >
          <span :class="`footer-messages text-xs ${$themeColor(blok.background_color.color) ? 'filter invert' : ''}`">
            Aprograma {{ typewriter }}
          </span>
        </div>
        <div
          :class="`footer-info justify-self-center leading-relaxed text-center ${$themeColor(blok.background_color.color) ? 'text-white' : ''}`"
        >
          <span class="footer-copyright text-sm">
            © 2020 - {{ currentYear }}, <strong>Aprograma</strong></span><br><span class="footer-powered text-xs whitespace-nowrap">{ {{ $languageCase('powered by', 'creado con', 'creato con') }} <a class="nuxtjs-link" href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer"><span class="nuxtjs underline">Nuxt.js</span><span class="nuxtjs-hearth"> 💚</span></a> - &nbsp;{{ $languageCase('hosted by', 'alojado con', 'distribuito da') }} <a class="nuxtjs underline" href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a> }</span>
        </div>
        <ul
          :class="`social-links grid grid-flow-col gap-3 justify-end mr-3 ${$themeColor(blok.background_color.color) ? 'filter invert' : ''}`"
        >
          <li v-for="iconLink in $contentByName(blok.body, 'Link')" :key="iconLink._uid">
            <component
              :is="iconLink.component"
              :blok="iconLink"
              class="social-icon"
            />
          </li>
        </ul>
      </div>
    </div>
  </footer>
  <footer
    v-else
    class="footer max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl mx-auto px-10 py-20 mb-12 rounded-t-md backdrop-filter backdrop-blur bg-opacity-70 bg-white"
  >
    <div class="footer-content h-52 grid gap-5 text-center">
      <span class="input-footer relative grid gap-5 grid-flow-col-dense items-end justify-center bottom-6 text-md font-thin">
        <span class="footer-dash"> - </span> <Icon eye tag="span" size="w-6" class="eye-footer animate-pulse" /><span class="footer-dash"> - </span>
      </span>
      <div
        class="messages-container"
      >
        <span class="footer-messages text-xs">
          Aprograma {{ typewriter }}
        </span>
      </div>
      <div
        class="footer-info flex flex-col"
      >
        <span class="footer-copyright text-sm">
          © 2020 - {{ currentYear }}, <strong>Aprograma</strong></span><br><span class="footer-powered text-xs">{ {{ $languageCase('powered by', 'creado con', 'creato con') }} <a class="nuxtjs-link" href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer"><span class="nuxtjs underline">Nuxt.js</span><span class="nuxtjs-hearth"> 💚</span></a> - &nbsp;{{ $languageCase('hosted by', 'alojado con', 'distribuito da') }} <a class="nuxtjs underline" href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a> }</span>
      </div>

      <ul
        class="social-links grid grid-flow-col auto-cols-max gap-3 justify-center"
      >
        <li v-for="iconLink in $contentByName(blok.body, 'Link')" :key="iconLink._uid">
          <component
            :is="iconLink.component"
            :blok="iconLink"
            class="social-icon transition-all duration-700"
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
      expanded: false,
      showChat: false,
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
      this.expanded = true
    },
    expandOut () {
      this.expanded = false
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
    },
    scrollTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
