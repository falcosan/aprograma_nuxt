<template>
  <div v-if="show" class="home_page">
    <LogoComponentVue :content="contentByName('LogoComponentVue')" />
  </div>
</template>

<script>
import LogoComponentVue from "../components/LogoComponentVue";
import setContentByName from "@/plugins/setContentByName";
export default {
  components: { LogoComponentVue },
  mixins: [setContentByName],
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  computed: {
    show() {
      return this.$route.name === "home";
    },
  },
};
</script>


