<template>
  <header class="header top-0 z-10 fixed h-20 w-auto justify-between mt-0">
    <nav class="navbar">
      <ul class="menu_wrapper">
        <ItemNavbar
          v-for="item in content.body"
          :key="item._uid"
          :content="item"
        />
      </ul>
    </nav>
  </header>
</template>

<script>
import ItemNavbar from '@/components/layout/ItemNavbarComponent'
export default {
  components: { ItemNavbar },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
}
</script>

