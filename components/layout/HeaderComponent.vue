<template>
  <transition-group
    tag="header"
    appear
    enter-active-class="transition-all duration-200 out-in"
    enter-class="opacity-0"
    class="header top-0 z-10 fixed h-20 w-auto justify-between mt-0"
  >
    <nav key="navbar" class="navbar">
      <ul class="menu-wrapper">
        <li class="logo-home">
          <NuxtLink to="/">
            <Logo style-logo-container=" w-20 pt-5 pb-7" />
          </NuxtLink>
        </li>
        <li
          v-for="item in $contentByName(blok.body, 'ItemNavbar')"
          :key="item._uid"
          class="link-menu"
        >
          <ItemNavbar :blok="item" />
        </li>
      </ul>
    </nav>
    <nav key="language-navbar" class="language-navbar flex relative">
      <Translate :class="`bg-black absolute text-white ${expanded}`" style-translate-item="py-3 px-4" :blok="$contentByName(blok.body, 'Translate')" @mouseleave.native="expandOut()" />
      <CurrentLanguage class="bg-black h-10 px-4 flex items-center justify-center text-white" @click.native="expandIn()" />
    </nav>
  </transition-group>
</template>

<script>
import Translate from './TranslateComponent'
import Logo from './../global/LogoComponent'
import CurrentLanguage from './CurrentLanguageComponent'
import ItemNavbar from './ItemNavbarComponent'
export default {
  components: { Logo, ItemNavbar, Translate, CurrentLanguage },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      timer: undefined,
      expanded: 'not-expanded -left-full'
    }
  },
  methods: {
    expandIn () {
      this.expanded = 'expandend left-0 py-4 w-28'
      clearTimeout(this.timer)
      this.timer = undefined
    },
    expandOut () {
      this.timer = setTimeout(() => {
        this.expanded = 'not-expanded -left-full'
      }, 1000)
      this.timer = undefined
    }
  }
}

</script>
