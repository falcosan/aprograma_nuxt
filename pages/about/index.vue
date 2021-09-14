<template>
  <component
    :is="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
</template>
<script>
export default {
  async asyncData (context) {
    return await context.app.$storyapi
      .get(`cdn/stories${context.route.path}`, {
        language: context.store.state.language.language
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          'Sorry but this content doesn\'t extist', `Sorry, but this content "${context.route.name}" has a problem or doesn't exist`
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
          content: 'About the Aprograma project'
        }
      ]
    }
  },
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
