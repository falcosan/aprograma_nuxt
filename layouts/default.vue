<template>
  <transition appear enter-active-class="duration-1000" enter-class="opacity-0">
    <div v-if="story.content.body && story.content.view" class="aprograma-theme">
      <component
        :is="layout.component"
        v-for="layout in story.content.body"
        :key="layout._uid"
        :blok="layout"
      />
    </div>
    <div v-else-if="story.content.body" class="aprograma-maintenance h-full flex flex-col justify-center p-10 sm:p-20">
      <Logo
        transition
        class="max-w-lg fixed left-0 top-1/2 my-0 mx-auto transform -translate-y-1/2 rounded"
        size="w-screen h-screen"
      />
      <h1 class="maintenance-text fixed bottom-0 mb-10 sm:mb-20 text-center text-xs xs:text-base sm:text-lg xs:whitespace-nowrap pointer-events-none font-medium uppercase italic">
        under maintenance
      </h1>
      <div class="maintenance-line fixed w-56 h-px bottom-0 mb-10 sm:mb-20 -z-10 pointer-events-none bg-black" />
    </div>
  </transition>
</template>

<script>
import Header from '@/components/layout/HeaderComponent'
import Main from '@/components/layout/MainComponent'
import Footer from '@/components/layout/FooterComponent'
export default {
  components: { Header, Main, Footer },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  watch: {
    '$store.state.language.language' () { this.getLayout() }
  },
  created () {
    this.getLayout()
  },
  beforeMount () {
    this.$store.commit('data/responsiveMutation', window.innerWidth)
  },
  mounted () {
    this.$store.dispatch('data/responsiveAction')
  },
  methods: {
    async getLayout () {
      const { data } = await this.$storyapi.get('cdn/stories/layout', {
        language: this.$store.state.language.language
      })
      this.story = data.story
    }
  }
}
</script>
<style scoped>
.aprograma-maintenance{
  min-height: unset;
  height: calc(100vh - 4.5rem);
}
@media screen and (min-width:768px){
  .aprograma-maintenance{
    min-height: unset;
    height: calc(100vh - 9rem);
  }
}
</style>
