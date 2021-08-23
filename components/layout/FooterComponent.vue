<template>
  <footer
    v-if="$store.state.data.windowWidth >= 768 && $device.isDesktop"
    :style="`background-color: ${backgroundColors ? backgroundColors : '#e0e0e0'};`"
    :class="`footer w-full fixed z-40 bottom-0 transition-height duration-200 ease-in-out ${expanded ? 'h-28' : 'h-0'}`"
  >
    <div
      :style="`background-color: ${expanded ? backgroundColors : blok.background_color_menu.color};`"
      class="top-kick absolute h-16 w-16 lg:w-20 lg:h-20 flex right-0 -top-16 lg:-top-20 items-center justify-center z-10 rounded-tl cursor-pointer transition-all duration-200"
      @click="scrollTop();"
    >
      <Icon arrow tag="button" size="w-auto h-auto" :class="`justify-center transform rotate-90 ${expanded ? $themeColor(backgroundColors) ? 'filter invert' : '' : ''}`" />
    </div>
    <div
      class="content-container h-full overflow-hidden"
      @mouseleave="expandOut"
      @mouseover="expandIn"
    >
      <div
        :class="`open-footer absolute left-0 -top-16 lg:-top-20 ${expanded ? 'w-full' : 'w-20'}`"
      >
        <div
          class="icon-open h-16 w-16 lg:w-20 lg:h-20 flex justify-center items-center rounded-tr transition-all duration-200"
          :style="`background-color: ${expanded ? backgroundColors : blok.background_color_menu.color};`"
        >
          <Icon
            eye
            tooltip="Kiosco Antonio"
            tag="span"
            :class="`${expanded ? $themeColor(backgroundColors) ? 'filter invert' : '' : ''}`"
          />
        </div>
      </div>
      <div
        :class="`footer-content h-full w-full grid grid-flow-col auto-cols-fr gap-5 items-center px-5 transition-opacity duration-200 ${expanded ? '' : 'opacity-0'}`"
      >
        <div
          class="messages-container"
        >
          <span :class="`footer-messages whitespace-nowrap text-xs ${$themeColor(backgroundColors) ? 'text-white' : ''}`">
            Aprograma {{ typewriter }}
          </span>
        </div>
        <div
          :class="`footer-info grid gap-y-1.5 justify-self-center whitespace-nowrap text-center ${$themeColor(backgroundColors) ? 'text-white' : ''}`"
        >
          <span class="footer-copyright text-sm"> © 2020 - {{ currentYear }}, <strong>Aprograma</strong></span>
          <span class="footer-powered text-xs leading-relaxed">{{ $languageCase('Made with', 'Hecho con', 'Creato con') }} <a class="nuxtjs-link" href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer"><span class="nuxtjs underline">Nuxt.js</span></a>, <a class="netlify-link" href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer"><span class="netlify underline">Netlify</span></a> {{ $languageCase('and', 'y', 'e') }} <a class="storyblok-link" href="https://www.storyblok.com/" target="_blank" rel="noopener noreferrer"><span class="storyblok underline">Storyblok</span></a></span>
        </div>
        <ul
          :class="`social-links flex flex-wrap justify-end -m-1.5 ${$themeColor(backgroundColors) ? 'filter invert' : ''}`"
        >
          <li v-for="iconLink in $contentByName(blok.body, 'Link')" :key="iconLink._uid" class="link-item m-1.5">
            <component
              :is="iconLink.component"
              :blok="iconLink"
              class="social-icon opacity-80 hover:opacity-100"
            />
          </li>
        </ul>
      </div>
    </div>
  </footer>
  <footer
    v-else
    class="footer px-5 py-20 my-12 rounded-t"
    :style="`background-color: ${blok.transparency ? `${backgroundColors}B3` : backgroundColors};`"
  >
    <div class="footer-content h-52 grid gap-5 text-center">
      <span class="input-footer relative grid gap-5 grid-flow-col-dense items-end justify-center bottom-6 text-md font-thin">
        <span class="footer-dash"> - </span> <Icon eye tag="span" size="w-6" class="eye-footer" /><span class="footer-dash"> - </span>
      </span>
      <div
        class="messages-container"
      >
        <span class="footer-messages text-xs">
          Aprograma {{ typewriter }}
        </span>
      </div>
      <div class="footer-info grid gap-y-1.5">
        <span class="footer-copyright text-sm"> © 2020 - {{ currentYear }}, <strong>Aprograma</strong></span>
        <span class="footer-powered text-xs leading-relaxed">{{ $languageCase('Made with', 'Hecho con', 'Creato con') }} <a class="nuxtjs-link" href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer"><span class="nuxtjs underline">Nuxt.js</span></a>, <a class="netlify-link" href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer"><span class="netlify underline">Netlify</span></a> {{ $languageCase('and', 'y', 'e') }} <a class="storyblok-link" href="https://www.storyblok.com/" target="_blank" rel="noopener noreferrer"><span class="storyblok underline">Storyblok</span></a></span>
      </div>

      <ul
        class="social-links flex flex-wrap -m-1.5 justify-center"
      >
        <li v-for="iconLink in $contentByName(blok.body, 'Link')" :key="iconLink._uid" class="link-item m-1.5">
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
      if (this.blok.message.length > 0) {
        const texts = this.blok.message[this.typewriterIndex].split('; ').filter(text => text)
        return this.$languageCase(texts[0], texts[1], texts[2])
      } else {
        return ''
      }
    },
    backgroundColors () {
      const colors = this.blok.background_color.color.split('; ')
      if (colors.length > 1) {
        if (this.$store.state.data.windowWidth >= 768 && this.$device.isDesktop) {
          return colors[0]
        } else {
          return colors.length > 1 ? colors[1] : colors[0]
        }
      } else {
        return this.blok.background_color.color
      }
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
      if (this.words && this.charIndex < this.words.length) {
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
      if (this.words && this.charIndex > 0) {
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
      if (this.words) {
        clearTimeout(this.playTypeText)
        clearTimeout(this.playEraseText)
        this.playTypeText = 0
        this.playEraseText = 0
        this.typewriter = ''
        this.charIndex = 0
        this.typewriterIndex = 0
        setTimeout(this.typeText, 400)
      }
    },
    scrollTop () {
      return this.$scrollToSmoothly(0)
    }
  }
}
</script>
