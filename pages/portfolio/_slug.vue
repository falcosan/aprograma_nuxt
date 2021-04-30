<template>
  <Project :blok="story.content" />
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
export default {
  components: { Project },
  async fetch () {
    const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}${this.$route.path}`)
    this.story = data.story
  },
  watch: {
    '$store.state.language.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
