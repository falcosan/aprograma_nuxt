<template>
  <header
    v-if="!$store.state.data.mobile"
    class="header flex-col flex fixed justify-between mt-0"
  >
    <nav class="navbar">
      <ul class="menu-wrapper flex flex-col">
        <li class="logo-home">
          <NuxtLink class="home-link flex items-center" to="/" :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)" @click.native="play()">
            <Logo
              :transition-a="moved.a"
              :transition-p="moved.p"
              style-logo-container="w-24"
            />
            <transition
              appear
              enter-active-class="transition-opacity duration-300"
              leave-active-class="transition-opacity duration-300"
              enter-class="opacity-0"
              leave-to-class="opacity-0"
            >
              <span v-if="$route.name !== 'home'" class="project-name fixed right-6 text-xl p-2 bg-black text-white" v-text="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)" />
            </transition>
          </NuxtLink>
        </li>
        <li
          v-for="item in $contentByName(blok.body, 'ItemNavbar')"
          :key="item._uid"
          class="link-menu flex-1 text-left no-underline py-2 px-4 text-gray-600 hover:text-gray-300"
        >
          <ItemNavbar :icon-item="false" :blok="item" />
        </li>
      </ul>
    </nav>
    <nav class="language-navbar">
      <Translate
        translate-transition
        class="translate-header w-16"
        :style-current-language="`py-3 px-4 transition-all ${expanded ? 'border-t border-b border-r border-black text-gray-600' : 'bg-black text-white'}`"
        :style-translate-list="`transform transition-transform duration-200 esase-out ${moved.translateList} bg-black text-white`"
        style-translate-item="py-3 px-4"
        :blok="$contentByName(blok.body, 'Translate')"
        @mouseover.native="expandStill()"
        @mouseleave.native="expandOut()"
        @click.native="expandIn()"
      />
    </nav>
  </header>
  <header
    v-else
    class="header"
  >
    <nav class="navbar-up w-full h-20 flex justify-between items-center fixed top-0 z-30">
      <NuxtLink class="home-link w-2/12 flex justify-center items-center" to="/" :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)">
        <Logo
          :transition-a="moved.a"
          :transition-p="moved.p"
          style-logo-container="w-20"
          @click.native="play()"
        />
        <transition
          appear
          enter-active-class="transition-opacity duration-300"
          leave-active-class="transition-opacity duration-300"
          enter-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <span v-if="$route.name !== 'home'" class="project-name absolute right-1/2 transform translate-x-1/2 p-2 bg-black text-white" v-text="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)" />
        </transition>
      </NuxtLink>
      <Translate
        class="translate-header w-2/12 justify-center"
        :translate-transition="false"
        style-translate-list="text-center"
        style-translate-item="text-sm md:text-base"
        :blok="$contentByName(blok.body, 'Translate')"
      />
    </nav>
    <nav class="navbar-down w-full h-16 flex items-center fixed bottom-0 z-30 bg-gray-300">
      <ul class="menu-wrapper w-full flex">
        <li
          v-for="item in $contentByName(blok.body, 'ItemNavbar')"
          :key="item._uid"
          class="link-menu flex-1 text-center py-2 px-4 text-gray-600 no-underline hover:text-gray-300"
        >
          <ItemNavbar icon-item icon-style="p-3" icon-size="w-7" :blok="item" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Translate from './TranslateComponent'
import Logo from './../global/LogoComponent'
import ItemNavbar from './ItemNavbarComponent'
export default {
  components: { Logo, ItemNavbar, Translate },
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
        translateList: 'not_expanded -translate-x-full'
      }
    }
  },
  created () {
    this.$store.commit('data/mobileMutation')
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
        this.moved.translateList = 'not_expanded -translate-x-full'
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
