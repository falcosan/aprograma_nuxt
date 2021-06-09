<template>
  <div v-if="story.content && story.content.view" class="aprograma-theme font-sans">
    <component
      :is="layout.component"
      v-for="layout in story.content.body"
      :key="layout._uid"
      :blok="layout"
    />
  </div>
  <div class="aprograma-maintenance" v-else>
    <Logo
    class="max-w-lg my-0 mx-auto"
      size="w-full"
    />
    <h1 class="text-center text-base sm:text-lg font-bold uppercase italic">
   - site under maintenance -
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
  beforeMount () {
    this.$store.commit('data/responsiveMutation', window.innerWidth)
  },
  mounted () {
    this.getLayout()
    this.$store.dispatch('data/responsiveAction')
  },
  methods: {
    refresh () {
      this.$fetch()
    },
    async getLayout () {
      const { data } = await this.$storyapi.get('cdn/stories/layout', {
        language: this.$store.state.language.language
      })
      this.story = data.story
    }
  }
}
</script>
