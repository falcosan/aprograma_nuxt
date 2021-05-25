<template>
  <header
    v-if="$store.state.data.windowWidth >= 768 && $device.isDesktop"
    class="header fixed z-40"
  >
    <nav class="navbar">
      <div class="menu-wrapper">
        <div :class="`logo-home relative z-20`">
          <NuxtLink :class="`home-link flex bg-white transition-shadow duration-300 ${expanded ? '' : 'shadow-md'}`" to="/" :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)">
            <Logo
              :transition-a="moved.a"
              :transition-p="moved.p"
              size="w-24"
              :blok="blok.body[blok.body.component === 'Logo']"
              @click.native="play"
            />
          </NuxtLink>
        </div>
        <Icon animate-menu :class="`open-menu relative w-full z-10 p-3 cursor-pointer transition-shadow duration-300 bg-white ${expanded ? 'shadow-md' : ''}`" size="w-6" @click.native="expanded = !expanded" />
        <transition enter-active-class="duration-300 transform" leave-active-class="duration-300 transform" enter-class="-translate-y-full" leave-to-class="-translate-y-full">
          <div v-if="expanded" class="menu-expanded">
            <ul class="link-list" :style="`background-color: ${blok.background_color.color};`">
              <li v-for="item in $contentByName(blok.body, 'Link')" :key="item._uid" class="link-menu hover:bg-gray-300" @click="goUp">
                <Link scroll-top class="py-2 px-3 font-light" :blok="item" />
              </li>
            </ul>
            <div class="language-navbar">
              <Translate
                class="translate-header font-light filter grayscale text-white"
                style-translate-item="w-full p-3 bg-gray-800"
                :blok="$contentByName(blok.body, 'Translate')"
              />
            </div>
          </div>
        </transition>
      </div>
    </nav>
  </header>
  <header
    v-else
    class="header flex justify-center"
  >
    <nav class="navbar-up w-full h-10 fixed flex justify-center top-0 z-40 shadow-sm" :style="`background-color: ${blok.background_color.color};`">
      <div class="menu-wrapper wrapper-up w-full h-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl flex justify-between">
        <NuxtLink exact-active-class="filter invert grayscale bg-gray-300" class="home-link w-2/12" to="/" :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)">
          <Icon
            home
            tag="button"
            size="w-5"
            class="home-link h-full w-full"
          />
        </NuxtLink>
        <Logo
          class="absolute top-0 right-1/2 p-1 transform translate-x-1/2 rounded-b-full filter drop-shadow-md bg-white"
          size="w-12"
          :transition-a="moved.a"
          :transition-p="moved.p"
          style-logo-container="w-14"
          @click.native="play"
        />

        <Translate
          translate-transition
          class="translate-header w-2/12 bg-gray-800 text-white filter grayscale"
          :style-current-language="`h-full flex items-center justify-center relative z-10 bg-gray-800 text-white ${expanded ? 'filter drop-shadow-md' : ''}`"
          :style-translate-list="`transform transition-transform duration-200 esase-out ${expanded ? 'translate-y-0' : '-translate-y-full'} bg-gray-800`"
          style-translate-item="p-3 text-center"
          :blok="$contentByName(blok.body, 'Translate')"
          @translateListAction.passive="expanded = false"
          @currentLangAction.passive="expanded = !expanded"
          @mouseenter.native="$device.isDesktop ? expandStill() : false "
          @mouseleave.native.passive="$device.isDesktop ? expandOut() : expanded = false"
        />
      </div>
    </nav>
    <nav class="navbar-down w-full h-10 flex items-center justify-center fixed bottom-0 z-40 filter drop-shadow-2xl" :style="`background-color: ${blok.background_color.color};`">
      <ul class="menu-wrapper wrapper-down w-full h-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl grid grid-cols-4">
        <li
          v-for="item in $contentByName(blok.body, 'Link')"
          :key="item._uid"
          class="link-menu no-underline"
          @click="goUp"
        >
          <Link scroll-top icon-item icon-style="w-full h-full" :blok="item" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Translate from './TranslateComponent'
export default {
  components: { Translate },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      expanded: false,
      timer: 0,
      moved: {
        a: '',
        p: ''
      }
    }
  },
  watch: {
    '$device.isDesktop' () { this.expanded = false },
    '$store.state.data.windowWidth' () { if (this.$store.state.data.windowWidth < 768) { this.expanded = false } }
  },
  methods: {
    expandOut () {
      if (this.expanded) {
        this.timer = setTimeout(() => {
          this.expanded = false
        }, 700)
      }
    },
    expandStill () {
      if (this.expanded) {
        clearTimeout(this.timer)
        this.timer = 0
      }
    },
    play () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.moved.a = 'transform origin-center-left translate rotate-360 transition duration-700 ease-out'
      this.moved.p = 'transform origin-center translate rotate-360 transition duration-700 ease-out'
      this.$store.commit('data/moveMutation', true)
      document.querySelector('.logo').ontransitionend = () => {
        this.moved.p = ''
        this.moved.a = ''
        this.$store.commit('data/moveMutation', false)
      }
    },
    goUp () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

</script>
