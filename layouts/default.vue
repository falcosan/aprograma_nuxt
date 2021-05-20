<template>
  <div class="font-sans">
    <component
      :is="layout.component"
      v-for="layout in story.content.body"
      :key="layout._uid"
      :blok="layout"
    />
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
    '$store.state.language.language': { handler () { this.getLayout() } }
  },
  beforeMount () {
    this.$store.commit('data/responsiveMutation', window.innerWidth)
  },
  mounted () {
    this.getLayout()
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
