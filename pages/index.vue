<template>
  <component
    :is="story.content.component"
    v-if="!$fetchState.pending"
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
  fetchDelay: 0,
  watch: {
    '$store.state.language.language': '$fetch'
  }
}
</script>
