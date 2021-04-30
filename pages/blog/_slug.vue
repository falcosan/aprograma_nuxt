<template>
  <Post :blok="story.content" />
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  async fetch () {
    const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}${this.$route.path}`)
    this.story = data.story
  },
  watch: {
    '$store.state.language.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
