<template>
  <div v-if="story.content.body && story.content.view" class="aprograma-theme font-sans bg-white">
    <component
      :is="layout.component"
      v-for="layout in story.content.body"
      :key="layout._uid"
      :blok="layout"
    />
  </div>
  <div v-else-if="story.content.body" class="aprograma-maintenance h-screen flex flex-col justify-center p-10 sm:p-20">
    <Logo
      transition
      class="max-w-lg my-0 mx-auto shadow-lg rounded-md"
      size="w-full"
    />
    <h1 class="maintenance-text mt-10 sm:mt-20 text-center text-xs xs:text-base sm:text-lg xs:whitespace-nowrap font-bold uppercase italic">
      under maintenance
    </h1>
  </div>
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
