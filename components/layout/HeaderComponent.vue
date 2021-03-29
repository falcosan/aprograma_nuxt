<template>
  <header class="header top-0 z-10 fixed h-20 w-auto justify-between mt-0">
    <nav class="navbar">
      <ul class="menu-wrapper">
        <li
          v-for="item in $contentByName(blok.body, 'ItemNavbar')"
          :key="item._uid"
          class="link-menu"
        >
          <ItemNavbar :blok="item" />
        </li>
      </ul>
    </nav>
    <nav class="language-bar flex relative top-10">
      <Translate :class="`bg-black absolute text-white ${expanded}`" :blok="$contentByName(blok.body, 'Translate')" @mouseleave.native="expandOut()" />
      <CurrentLanguage class="bg-black px-3 flex items-center rounded-r-full text-white" :blok="$contentByName(blok.body, 'CurrentLanguage')[0]" @click.native="expandIn()" />
    </nav>
  </header>
</template>

<script>
import Translate from './TranslateComponent'
import CurrentLanguage from './CurrentLanguageComponent'
import ItemNavbar from './ItemNavbarComponent'
export default {
  components: { ItemNavbar, Translate, CurrentLanguage },
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
  created () {
    this.$store.commit('classes/setName', this.blok.component)
  },
  methods: {
    expandIn () {
      this.expanded = 'expandend left-0 p-5'
      clearTimeout(this.timer)
      this.timer = undefined
    },
    expandOut () {
      this.timer = setTimeout(() => {
        this.expanded = 'not-expanded -left-full delay-100'
      }, 1000)
      this.timer = undefined
    }
  }
}

</script>
