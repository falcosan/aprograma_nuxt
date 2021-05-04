<template>
  <Post :blok="story.content" />
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories${context.store.state.language.language ? `/${context.store.state.language.language}` : context.store.state.language.language}${context.route.path}`)
      .then((res) => {
        return res.data
      })
  },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  async fetch () {
    const { data } = await this.$storyapi.get(`cdn/stories${this.$store.state.language.language ? `/${this.$store.state.language.language}` : this.$store.state.language.language}${this.$route.path}`)
    this.story = data.story
  },
  watch: {
    '$store.state.language.language': '$fetch'
  }
}
</script>
