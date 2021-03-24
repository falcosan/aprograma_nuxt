<template>
  <header class="header top-0 z-10 fixed h-20 w-auto justify-between mt-0">
    <nav class="navbar">
      <ul class="menu_wrapper">
        <li class="link_menu" v-for="item in blok.body" :key="item._uid">
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
      required: true,
    },
  },
}
</script>

