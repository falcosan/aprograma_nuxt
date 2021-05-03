<template>
  <component
    :is="story.content.component"
    v-if="story.content.component && !$fetchState.pending"
    :key="story.content._uid"
    :blok="story.content"
  />
  <div v-else class="h-screen" />
</template>
<script>
export default {
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  async fetch () {
    const slug = (this.$route.path === '/' || this.$route.path === '') ? '/home' : this.$route.path
    try {
      const { data } = await this.$storyapi.get(`cdn/stories${this.$store.state.language.language ? `/${this.$store.state.language.language}` : this.$store.state.language.language}${slug}`)
      this.story = data.story
    } catch (err) {
      this.$errorMessage(err, 'Sorry, but this content doesn\'t exist', 'Sorry, but this content has a problem or doesn\'t exist')
    }
  },
  watch: {
    '$store.state.language.language': '$fetch'
  }
}
</script>
