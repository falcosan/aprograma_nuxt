<template>
  <header
    class="header h-auto sm:h-auto w-full sm:w-auto flex-col flex fixed justify-between mt-0"
  >
    <nav key="navbar" class="navbar">
      <ul class="menu-wrapper flex flex-row items-center sm:items-baseline sm:flex-col">
        <li class="logo-home">
          <NuxtLink to="/" aria-label="Aprograma">
            <Logo
              :transition-a="moved.a"
              :transition-p="moved.p"
              style-logo-container="w-24 m-0"
              @click.native="play()"
            />
          </NuxtLink>
        </li>
        <li
          v-for="item in $contentByName(blok.body, 'ItemNavbar')"
          :key="item._uid"
          class="link-menu flex-1 text-left text-gray-600 no-underline hover:text-gray-300 md:py-2 md:px-4"
        >
          <ItemNavbar :blok="item" />
        </li>
      </ul>
    </nav>
    <nav key="language-navbar" class="language-navbar">
      <Translate
        class="w-16"
        :style-current-language="`py-3 px-4 text-black transition-all ${expanded ? 'border-t border-b border-r border-black text-gray-600' : 'bg-black text-white'}`"
        :style-translate-list="`transform transition-transform duration-200 esase-out ${moved.translateList} bg-black text-white`"
        style-translate-item="py-3 px-4"
        :show-translate="expanded"
        :blok="$contentByName(blok.body, 'Translate')"
        @mouseover.native="expandStill()"
        @mouseleave.native="expandOut()"
        @click.native="expandIn()"
      />
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
