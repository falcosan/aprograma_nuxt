<template>
  <section>
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </section>
</template>
<script>
export default {
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.route.path}`)
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        context.$errorMessage(res.response, `Sorry, but this content: "${res.response.config.url.substring(
          res.response.config.url.lastIndexOf('/') + 1)}" doesn't exist`, `Sorry, but the content: "${res.response.config.url.substring(
          res.response.config.url.lastIndexOf('/') + 1)}" has a problem or doesn't exist`)
      })
  },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  fetch () {
    this.$store.dispatch('data/updateData', this.$route.path)
  },
  head () {
    return {
      title: `${this.story.name} - aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About the aprograma project'
        }
      ]
    }
  },
  watch: {
    '$store.state.data.language': '$fetch'
  }
}
</script>
