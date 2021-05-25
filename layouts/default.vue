<template>
  <div v-if="story.content && !$fetchState.pending" class="font-sans">
    <client-only>
      <component
        :is="layout.component"
        v-for="layout in story.content.body"
        :key="layout._uid"
        :blok="layout"
      />
    </client-only>
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
  async fetch () {
    const { data } = await this.$storyapi.get('cdn/stories/layout', {
      language: this.$store.state.language.language
    })
    this.story = data.story
  },
  watch: {
    '$store.state.language.language': '$fetch'
  },
  beforeMount () {
    this.$store.commit('data/responsiveMutation', window.innerWidth)
    this.$store.dispatch('data/responsiveAction')
  }
}
</script>
