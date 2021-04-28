<template>
  <header
    v-if="$store.state.data.windowWidth >= 768 && $device.isDesktop"
    class="header flex-col flex fixed justify-between mt-0"
  >
    <nav class="navbar">
      <ul class="menu-wrapper flex flex-col">
        <li class="logo-home">
          <NuxtLink class="home-link flex items-center" to="/" :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)">
            <Logo
              :transition-a="moved.a"
              :transition-p="moved.p"
              style-logo-container="w-24"
              :blok="$contentByName(blok.body, 'Logo')[0]"
              @click.native="play"
            />
          </NuxtLink>
        </li>
        <li
          v-for="item in $contentByName(blok.body, 'ItemNavbar')"
          :key="item._uid"
          class="link-menu flex-1 text-left no-underline py-2 px-3 opacity-90"
        >
          <ItemNavbar :icon-item="false" :blok="item" />
        </li>
      </ul>
    </nav>
    <nav class="language-navbar">
      <Translate
        translate-transition
        class="translate-header w-16"
        :style-current-language="`py-3 px-4 transition-all ${expanded ? 'bg-gray-300 text-gray-600' : 'bg-gray-800 text-white'} filter grayscale`"
        :style-translate-list="`transform transition-transform duration-200 esase-out  ${expanded ? 'translate-x-0' : '-translate-x-full'} bg-gray-800 filter grayscale text-white`"
        style-translate-item="py-3 px-4"
        :blok="$contentByName(blok.body, 'Translate')"
        @mouseleave.native="expandOut"
        @mouseover.native="expandStill"
        @currentLangAction="expanded = !expanded"
        @translateListAction="expanded = false"
      />
    </nav>
  </header>
  <header
    v-else
    class="header flex justify-center"
  >
    <nav class="navbar-up w-full h-10 fixed flex justify-center top-0 z-20 shadow-sm" :style="`background-color: ${blok.background_color.color};`">
      <div class="menu-wrapper wrapper-up w-full h-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl flex justify-between">
        <NuxtLink class="home-link w-2/12" to="/" :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)">
          <Icon
            home
            tag="button"
            size="w-5"
            class="home-link h-full w-full flex items-center justify-center"
          />
        </NuxtLink>
        <Logo
          class="absolute top-0 right-1/2 p-1 transform translate-x-1/2 rounded-b-full shadow-sm bg-white"
          :transition-a="moved.a"
          :transition-p="moved.p"
          style-logo-container="w-14"
          @click.native="play"
        />

        <Translate
          translate-transition
          class="translate-header text-sm lg:text-base w-2/12 filter grayscale"
          :style-current-language="`h-full flex items-center justify-center relative z-10 bg-gray-800 text-gray-300 ${expanded ? 'shadow-xl' : ''}`"
          :style-translate-list="`transform transition-transform duration-200 esase-out ${expanded ? 'translate-y-0' : '-translate-y-full'} bg-gray-800`"
          style-translate-item="p-3 text-center"
          :blok="$contentByName(blok.body, 'Translate')"
          @translateListAction.passive="expanded = false"
          @currentLangAction.passive="expanded = !expanded"
          @mouseleave.native.passive="expanded = false"
        />
      </div>
    </nav>
    <nav class="navbar-down w-full h-12 flex items-center justify-center fixed bottom-0 z-10 border-t border-gray-300" :style="`background-color: ${blok.background_color.color};`">
      <ul class="menu-wrapper wrapper-down w-full h-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl grid grid-cols-4">
        <li
          v-for="item in $contentByName(blok.body, 'ItemNavbar')"
          :key="item._uid"
          class="link-menu no-underline"
        >
          <ItemNavbar icon-item icon-style="w-full h-full flex justify-center items-center" icon-size="w-5" :blok="item" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Translate from './TranslateComponent'
import ItemNavbar from './ItemNavbarComponent'
export default {
  components: { Translate, ItemNavbar },
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
  methods: {
    expandStill () {
      clearTimeout(this.timer)
      this.timer = 0
    },
    expandOut () {
      this.timer = setTimeout(() => {
        this.expanded = false
      }, 700)
    },
    play () {
      this.moved.a = 'transform origin-center-left translate rotate-360 transition duration-700 ease-out'
      this.moved.p = 'transform origin-center translate rotate-360 transition duration-700 ease-out'
      this.$store.commit('data/moveMutation', true)
      document.getElementById('logo').ontransitionend = () => {
        this.moved.p = ''
        this.moved.a = ''
        this.$store.commit('data/moveMutation', false)
      }
    }
  }
}

</script>
