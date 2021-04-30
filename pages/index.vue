<template>
  <component
    :is="story.content.component"
    v-if="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
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
      const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}${slug}`)
      this.story = data.story
    } catch (err) {
      this.$errorMessage(err, `Sorry, but this content: "${this.$route.name}" doesn't exist`, `Sorry, but the content: "${this.$route.name}" has a problem or doesn't exist`)
    }
  },
  watch: {
    '$store.state.language.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
