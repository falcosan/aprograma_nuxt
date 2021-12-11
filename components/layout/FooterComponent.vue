<template>
  <footer
    v-if="$store.state.data.windowWidth >= 768 && $device.isDesktop"
    :style="`background-color: ${backgroundColors};`"
    :class="`footer w-full fixed z-40 bottom-0 transition-height duration-200 ease-in-out ${expanded ? 'h-28' : 'h-0'}`"
  >
    <div
      :style="`background-color: ${expanded ? backgroundColors : blok.background_color_menu.color};`"
      class="top-kick absolute h-16 w-16 lg:w-20 lg:h-20 flex right-0 -top-16 lg:-top-20 items-center justify-center z-10 rounded-tl cursor-pointer transition-all duration-200"
      @click="$scrollToSmoothly(0);"
    >
      <Icon
        arrow
        tag="button"
        size="w-auto h-auto"
        :class="`justify-center transform rotate-90 ${expanded && $themeColor(blok.icon_color.color) ? 'text-white' : ''}`"
        :style="`color: ${blok.icon_color.color};`"
      />
    </div>
    <div
      class="content-container h-full overflow-hidden"
      @mouseleave="expandOut"
      @mouseover="expandIn"
    >
      <div
        :class="`open-footer absolute left-0 -top-16 lg:-top-20 ${expanded ? 'w-full' : 'w-20'}`"
      >
        <transition-group
          tag="div"
          enter-active-class="duration-300 in-out"
          leave-active-class="duration-300 out-in"
          enter-class="opacity-0 absolute"
          leave-to-class="opacity-0 absolute"
          class="icon-open h-16 w-16 lg:w-20 lg:h-20 flex justify-center items-center rounded-tr transition-all duration-200"
          :style="`background-color: ${expanded ? backgroundColors : blok.background_color_menu.color};`"
        >
          <Icon
            v-if="!currentEye"
            key="eye"
            eye
            tooltip="Kiosco Antonio"
            tag="span"
            :style="`color: ${blok.icon_color.color};`"
            :class="`${expanded && $themeColor(blok.icon_color.color) ? 'text-white' : ''} easter-egg`"
          />
          <Icon
            v-else
            key="eye-bold"
            eye-bold
            tooltip="Kiosco Antonio"
            tag="span"
            :style="`color: ${blok.icon_color.color};`"
            :class="`${expanded && $themeColor(blok.icon_color.color) ? 'text-white' : ''} easter-egg`"
          />
        </transition-group>
      </div>
      <div
        :class="`footer-content h-full w-full grid grid-flow-col auto-cols-fr gap-5 items-center px-5 transition-opacity duration-200 ${expanded ? '' : 'opacity-0'}`"
      >
        <div
          class="messages-container"
        >
          <span :class="`footer-messages text-xs ${backgroundColors && $themeColor(backgroundColors) ? '' : ''}`">
            {{ blok.text_static ? blok.text_static : 'ㅤ' }}{{ typewriter }}
          </span>
        </div>
        <div
          :class="`footer-info grid gap-y-1.5 justify-self-center whitespace-nowrap text-center ${backgroundColors && $themeColor(backgroundColors) ? 'text-white' : ''}`"
        >
          <span class="footer-copyright text-sm"> © 2020 - {{ currentYear }}, <strong>Aprograma</strong></span>
          <span class="footer-powered text-xs leading-relaxed">{{ $languageCase('Made with', 'Hecho con', 'Creato con') }} <a class="nuxtjs-link" href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer"><span class="nuxtjs underline">Nuxt.js</span></a>, <a class="netlify-link" href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer"><span class="netlify underline">Netlify</span></a> {{ $languageCase('and', 'y', 'e') }} <a class="storyblok-link" href="https://www.storyblok.com/" target="_blank" rel="noopener noreferrer"><span class="storyblok underline">Storyblok</span></a></span>
        </div>
        <ul
          :class="`social-links flex flex-wrap items-center justify-end -m-1.5 ${backgroundColors && $themeColor(backgroundColors) ? 'filter invert' : ''}`"
        >
          <template v-for="iconLink in $contentByName(blok.body, 'Link')">
            <li v-if="iconLink.title || (iconLink.icon_item && iconLink.body.length > 0)" :key="iconLink._uid" class="link-item m-1.5">
              <component
                :is="iconLink.component"
                :blok="iconLink"
                class="social-icon opacity-80 hover:opacity-100"
              />
            </li>
          </template>
        </ul>
      </div>
    </div>
  </footer>
  <footer
    v-else-if="!$nuxt.isFetching"
    class="footer px-5 pt-20 pb-40 rounded-t"
    :style="`background-color: ${blok.transparency ? `${backgroundColors}B3` : backgroundColors};`"
  >
    <div class="footer-content h-52 grid gap-5 text-center">
      <transition-group
        tag="span"
        enter-active-class="duration-300 in-out"
        leave-active-class="duration-300 out-in"
        enter-class="opacity-0"
        leave-to-class="opacity-0"
        :class="`input-footer relative grid gap-5 grid-flow-col-dense items-end justify-center bottom-6 text-md ${backgroundColors && $themeColor(backgroundColors) ? 'text-white' : ''}`"
      >
        <Icon
          v-if="!currentEye"
          key="eye"
          eye
          tag="span"
          class="col-start-1 col-end-1 row-start-1 row-end-1"
          size="w-6"
        />
        <Icon
          v-if="currentEye"
          key="eyeb-bold"
          eye-bold
          tag="span"
          class="col-start-1 col-end-1 row-start-1 row-end-1"
          size="w-6"
        />
      </transition-group>
      <div
        :class="`messages-container ${backgroundColors && $themeColor(backgroundColors) ? 'text-white' : ''}`"
      >
        <span class="footer-messages text-xs">
          {{ blok.text_static ? blok.text_static : 'ㅤ' }}{{ typewriter }}
        </span>
      </div>
      <div :class="`footer-info grid gap-y-1.5 ${backgroundColors && $themeColor(backgroundColors) ? 'text-white' : ''}`">
        <span class="footer-copyright text-sm"> © 2020 - {{ currentYear }}, <strong>Aprograma</strong></span>
        <span class="footer-powered text-xs leading-relaxed">{{ $languageCase('Made with', 'Hecho con', 'Creato con') }} <a class="nuxtjs-link" href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer"><span class="nuxtjs underline">Nuxt.js</span></a>, <a class="netlify-link" href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer"><span class="netlify underline">Netlify</span></a> {{ $languageCase('and', 'y', 'e') }} <a class="storyblok-link" href="https://www.storyblok.com/" target="_blank" rel="noopener noreferrer"><span class="storyblok underline">Storyblok</span></a></span>
      </div>

      <ul
        :class="`social-links flex flex-wrap -m-1.5 justify-center items-center ${backgroundColors && $themeColor(backgroundColors) ? 'filter invert' : ''}`"
      >
        <template v-for="iconLink in $contentByName(blok.body, 'Link')">
          <li v-if="iconLink.title || (iconLink.icon_item && iconLink.body.length > 0)" :key="iconLink._uid" class="link-item m-1.5">
            <component
              :is="iconLink.component"
              :blok="iconLink"
              class="social-icon transition-all duration-700"
            />
          </li>
        </template>
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
      currentYear: new Date().getFullYear(),
      typewriter: '',
      playTypeText: undefined,
      playEraseText: undefined,
      typewriterIndex: 0,
      charIndex: 0,
      currentEye: false,
      setEyes: undefined
    }
  },
  computed: {
    words () {
      if (this.blok.text_typewriter.length > 0) {
        const texts = this.blok.text_typewriter[this.typewriterIndex].split('; ').filter(text => text)
        return this.$languageCase(texts[0], texts[1], texts[2])
      } else {
        return ''
      }
    },
    backgroundColors () {
      if (this.blok.background_color.color) {
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
      } else {
        return ''
      }
    }
  },
  watch: {
    '$store.state.language.language' () { this.restartTypewriter() },
    currentEye () { this.showEyes() }
  },
  mounted () {
    this.typeText()
    this.showEyes()
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
        if (this.typewriterIndex >= this.blok.text_typewriter.length) { this.typewriterIndex = 0 }
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
        if (this.typewriterIndex >= this.blok.text_typewriter.length) { this.typewriterIndex = 0 }
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
    showEyes () {
      clearInterval(this.setEyes)
      this.setEyes = setInterval(() => { this.currentEye = !this.currentEye }, '1000')
    }
  }
}
</script>
