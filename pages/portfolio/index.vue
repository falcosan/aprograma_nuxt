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
        language: context.$storage.get('lang')
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          `Sorry but this project: ${context.route.name} doesn't exist`, `Sorry, but this project: "${context.route.name}" has a problem or doesn't exist`
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
          content: 'Projects make experience'
        }
      ]
    }
  },
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
