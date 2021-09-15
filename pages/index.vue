<template>
  <component
    :is="story.content.component"
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
    const { data } = await this.$storyapi.get(`cdn/stories${slug}`, {
      language: this.$store.state.language.language
    })
    this.story = data.story
  },
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
