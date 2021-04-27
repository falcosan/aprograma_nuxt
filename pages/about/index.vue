<template>
  <component
    :is="story.content.component"
    v-if="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
</template>
<script>
export default {
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.store.state.data.language}/${context.route.path}`)
      .then((res) => {
        context.store.commit('data/pageMutation', context.route.path)
        return res.data
      })
      .catch((res) => {
        context.$errorMessage(res.response, `Sorry, but this content: "${res.response.config.url.substring(
          res.response.config.url.lastIndexOf('/') + 1)}" doesn't exist`, `Sorry, but the content: "${res.response.config.url.substring(
          res.response.config.url.lastIndexOf('/') + 1)}" has a problem or doesn't exist`)
      })
  },
  head () {
    return {
      title: `${this.story.name} - Aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About the Aprograma project'
        }
      ]
    }
  },
  watch: {
    '$store.state.data.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
