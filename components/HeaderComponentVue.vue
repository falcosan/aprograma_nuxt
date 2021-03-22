<template>
  <header class="header top-0 z-10 fixed h-20 w-auto justify-between mt-0">
    <nav class="navbar">
      <div class="navbar_menu">
        <ul class="menu_wrapper">
          <template
            v-for="(link, index) in contentByName('ItemNavbarComponentVue')"
          >
            <ItemNavbarComponentVue
              :key="link._uid"
              :content="contentByName('ItemNavbarComponentVue')[index]"
            />
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import ItemNavbarComponentVue from "./ItemNavbarComponentVue";
import setContentByName from "@/plugins/setContentByName";
export default {
  components: { ItemNavbarComponentVue },
  mixins: [setContentByName],
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>

