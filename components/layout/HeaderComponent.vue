<template>
  <header
    v-if="!$store.state.data.mobile"
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
              @click.native="play"
            />
            <transition
              appear
              enter-active-class="duration-300"
              leave-active-class="duration-300"
              enter-class="opacity-0"
              leave-to-class="opacity-0"
            >
              <span v-if="$route.name !== 'home'" class="project-name fixed top-6 right-4 text-lg p-2 bg-gray-800 filter grayscale text-white" v-text="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)" />
            </transition>
          </NuxtLink>
        </li>
        <li
          v-for="item in $contentByName(blok.body, 'ItemNavbar')"
          :key="item._uid"
          class="link-menu flex-1 text-left no-underline py-2 px-3 text-gray-600 md:hover:text-gray-300"
        >
          <ItemNavbar :icon-item="false" :blok="item" />
        </li>
      </ul>
    </nav>
    <nav class="language-navbar">
      <Translate
        translate-transition
        class="translate-header w-16"
        :style-current-language="`py-3 px-4 transition-all ${expanded ? 'border-t border-b border-r border-black text-gray-600' : 'bg-gray-800 filter grayscale text-white'}`"
        :style-translate-list="`transform transition-transform duration-200 esase-out ${moved.translateList} bg-gray-800 filter grayscale text-white`"
        style-translate-item="py-3 px-4"
        :blok="$contentByName(blok.body, 'Translate')"
        @mouseover.native="expandStill"
        @mouseleave.native="expandOut"
        @click.native="expandIn"
      />
    </nav>
  </header>
  <header
    v-else
    class="header"
  >
    <nav class="navbar-up w-full h-10 flex justify-between fixed top-0 z-30 shadow-sm bg-gray-100">
      <NuxtLink class="home-link w-2/12" to="/" :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)">
        <Icon
          home
          tag="button"
          size="w-5"
          class="home-link h-full w-full flex items-center justify-center bg-gray-100"
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
        class="translate-header text-sm w-2/12"
        style-current-language="h-full flex items-center justify-center transition-all bg-gray-100"
        :style-translate-list="`transform transition-transform duration-200 esase-out ${moved.translateList} bg-gray-800 filter grayscale`"
        style-translate-item="p-3 text-center"
        :blok="$contentByName(blok.body, 'Translate')"
        @translateAction="expandOut"
        @click.native="expandIn"
        @mouseover.native="expandOut"
      />
    </nav>
    <nav class="navbar-down w-full h-10 flex items-center fixed bottom-0 z-30">
      <ul class="menu-wrapper w-full h-full grid grid-cols-4 bg-gray-100">
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
        p: '',
        translateList: 'not_expanded translate-x-full md:-translate-x-full'
      }
    }
  },
  methods: {
    expandIn () {
      this.expanded = true
      this.moved.translateList = 'expanded translate-x-0 opacity-100'
      this.timer = 0
    },
    expandStill () {
      clearTimeout(this.timer)
      this.timer = 0
    },
    expandOut () {
      this.timer = setTimeout(() => {
        this.expanded = false
        this.moved.translateList = 'not_expanded translate-x-full md:-translate-x-full'
      }, !this.$store.state.data.mobile ? 700 : 0)
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
