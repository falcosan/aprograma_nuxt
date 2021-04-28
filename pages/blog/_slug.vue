<template>
  <Post :blok="story.content" />
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.store.state.data.language}/blog/${context.params.slug}`)
      .then((res) => {
        return res.data
      })
  },
  watch: {
    '$store.state.data.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
