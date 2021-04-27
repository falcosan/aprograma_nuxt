<template>
  <Post :blok="story.content" />
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/blog/${context.params.posts}`)
      .then((res) => {
        return res.data
      })
  }
}
</script>
