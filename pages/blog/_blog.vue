<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    />
  </section>
</template>
<script>

export default {
  mounted() {
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
  // async fetch(context) {
  //   // Loading reference data - Articles in our case
  //   if (context.store.state.articles.loaded !== '1') {
  //     let postsRefRes = await context.app.$storyapi.get(`cdn/stories/`, {
  //       starts_with: 'aprograma/blog',
  //       version: 'published',
  //     })
  //     context.store.commit('articles/setPosts', postsRefRes.data.stories)
  //     context.store.commit('articles/setLoaded', '1')
  //   }
  // },
  asyncData(context) {
    return context.app.$storyapi
      .get(`cdn/stories/aprograma/${context.route.path}`, {
        version: 'published',
      })
      .then((res) => {
        return res.data
      })
  },
}
</script>