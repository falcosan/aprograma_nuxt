<template>
  <header class="header top-0 z-10 fixed h-20 w-auto justify-between mt-0">
    <nav class="navbar">
      <ul class="menu_wrapper">
        <li
          v-for="item in $contentByName(blok.body, 'ItemNavbar')"
          :key="item._uid"
          class="link_menu"
        >
          <ItemNavbar :blok="item" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import ItemNavbar from '@/components/layout/ItemNavbarComponent'
export default {
  components: { ItemNavbar },
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
