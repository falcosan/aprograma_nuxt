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
    const slug = (context.route.path === '/' || context.route.path === '') ? 'home' : context.route.path
    return context.app.$storyapi
      .get(`cdn/stories/${context.store.state.data.language}/${slug}?version=published&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        context.$errorMessage(res.response, `Sorry, but this content: "${res.response.config.url.substring(
          res.response.config.url.lastIndexOf('/') + 1)}" doesn't exist`, `Sorry, but the content: "${res.response.config.url.substring(
          res.response.config.url.lastIndexOf('/') + 1)}" has a problem or doesn't exist`)
      })
  },
  watch: {
    '$store.state.data.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
