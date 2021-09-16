<template>
  <component
    :is="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
</template>
<script>
export default {
  asyncData (context) {
    const slug = (context.route.path === '/' || context.route.path === '') ? '/home' : context.route.path
    return context.app.$storyapi
      .get(`cdn/stories${slug}`, {
        language: context.$storage.get('lang') || context.$storage.get('lang') || context.store.state.language.language
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          'Sorry but this content doesn\'t exist', `Sorry, but the content called: "${context.route.name}" has a problem or doesn't exist`
        )
      })
  },
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
