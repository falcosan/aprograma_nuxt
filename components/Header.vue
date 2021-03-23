<template>
  <header class="header top-0 z-10 fixed h-20 w-auto justify-between mt-0">
    <nav class="navbar">
      <ul class="menu_wrapper">
        <li>
          <nuxt-link class="text-teal-600 hover:underline" to="/">
            Home
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="text-teal-600 hover:underline" to="/about">
            About
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import ItemNavbarComponentVue from './ItemNavbarComponentVue'
import setContentByName from '@/plugins/setContentByName'
export default {
  components: { ItemNavbarComponentVue },
  mixins: [setContentByName],
  // props: {
  //   content: {
  //     type: Object,
  //     required: true,
  //   },
  // },
}
</script>

