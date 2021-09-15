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
    return context.app.$storyapi
      .get(`cdn/stories${context.route.path}`, {
        language: context.store.state.language.language
      }).then((res) => {
        context.store.dispatch('list/posts/addPosts')
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          `Sorry but this post: ${context.route.name} doesn't extist`, `Sorry, but this post: "${context.route.name}" has a problem or doesn't exist`
        )
      })
  },
  head () {
    return {
      title: `${this.story.name} - Aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Blog with last news of Aprograma'
        }
      ]
    }
  },
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
