<template>
  <section>
    <Post :blok="story.content"></Post>
  </section>
</template>
<script>
import Post from '@/components/PostComponent'
export default {
  components: { Post },
  asyncData(context) {
    return context.app.$storyapi
      .get(`cdn/stories/blog/${context.route.slug}`, {
        version: 'published',
      })
      .then((res) => {
        return res.data
      })
  },
}
</script>