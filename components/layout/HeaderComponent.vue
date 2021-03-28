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
    <nav class="language-bar">
      <Translate :blok="$contentByName(blok.body, 'Translate')" />
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
  created () {
    this.$store.dispatch('values/setElementsName', this.blok.component)
  }
}
</script>
