<template>
  <section>
    <Post :blok="story.content"></Post>
  </section>
</template>
<script>
import Post from '@/components/PostComponent'
export default {
  components: { Post },
    mounted () {
    // Use the input event for instant update of content
    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.story.id) {
        this.story.content = event.story.content
      }
    })
    // Use the bridge to listen the events
    this.$storybridge.on(['published', 'change'], (event) => {
      // window.location.reload()
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true,
      })
    })
  },
  asyncData(context) {
    return context.app.$storyapi
      .get(`cdn/stories/aprograma/blog/${context.route.slug}`, {
        version: 'published',
      })
      .then((res) => {
        return res.data
      })
  },
}
</script>