<template>
  <transition-group
    tag="header"
    appear
    appear-active-class="transition-opacity duration-200 out-in"
    appear-class="opacity-0"
    class="header h-auto w-24 top-0 z-10 fixed justify-between mt-0"
  >
    <nav key="navbar" class="navbar">
      <ul class="menu-wrapper">
        <li class="logo-home">
          <NuxtLink to="/">
            <Logo
              :transition-a="moved.a"
              :transition-p="moved.p"
              style-logo-container="w-24 m-0"
              @click.native="playOn()"
              @mouseout.native="playOff()"
            />
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
      <transition enter-active-class="in-out" leave-active-class="out-in" enter-class="opacity-0" leave-to-class="opacity-0">
        <Translate
          v-if="expanded"
          class="absolute py-4 transition-all duration-200 text-white bg-black "
          style-translate-item="py-3 px-4"
          :blok="$contentByName(blok.body, 'Translate')"
          @mouseover.native="expandStill()"
          @mouseleave.native="expandOut()"
        />
      </transition>
      <CurrentLanguage class="h-10 px-4 text-white bg-black" @click.native="expandIn()" />
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
      expanded: false,
      timer: 0,
      moved: {
        a: '',
        p: ''
      }
    }
  },
  methods: {
    expandIn () {
      this.expanded = true
      this.timer = 0
    },
    expandStill () {
      clearInterval(this.timer)
      this.timer = 0
    },
    expandOut () {
      this.timer = setTimeout(() => {
        this.expanded = false
      }, 700)
    },
    playOn () {
      this.moved.a = 'transform origin-center-left translate rotate-360 transition duration-700 ease-out'
      this.moved.p = 'transform origin-center translate rotate-360 transition duration-700 ease-out'
    },
    playOff () {
      document.getElementById('logo').ontransitionend = () => {
        this.moved.p = ''
        this.moved.a = ''
      }
    }
  }
}

</script>
