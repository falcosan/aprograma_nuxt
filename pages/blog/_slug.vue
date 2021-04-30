<template>
  <Post :blok="story.content" />
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.store.state.language.language}${context.route.path}`)
      .then((res) => {
        return res.data
      })
  },
  watch: {
    '$store.state.language.language': { handler () { this.$nuxt.refresh() } }
  },
  watchQuery: true
}
</script>
