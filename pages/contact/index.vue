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
        language: context.$storage.get('lang') ? context.$storage.get('lang') : ''
      }).then((res) => {
        return res.data
      }).catch((res) => {
        if (!res) {
          context.error({
            statusCode: 404,
            message: 'Sorry but this content doesn\'t exist'
          })
        } else {
          context.error({
            statusCode: 500,
            message: `Sorry, but the content called: "${context.route.name}" has a problem or doesn't exist`
          })
        }
      })
  },
  head () {
    return {
      title: `${this.story.name} - Aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Contact the Aprograma'
        }
      ]
    }
  },
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
