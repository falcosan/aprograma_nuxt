<template>
  <div id="app" class="font-body">
    <Nuxt />
  </div>
</template>


<script>
import HeaderComponentVue from '@/components/HeaderComponentVue.vue'
import MainComponentVue from '@/components/MainComponentVue.vue'
import FooterComponentVue from '@/components/FooterComponentVue.vue'
export default {
  components: {
    HeaderComponentVue,
    MainComponentVue,
    FooterComponentVue,
  },
    computed: {
      currentData() {
        return this.$store.getters.currentData
      },
    },
  created() {
    window.storyblok.init({
      accessToken: process.env.VUE_APP_TOKEN,
    })
    this.$store.dispatch('updateData')
  },
}
</script>
