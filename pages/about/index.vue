<template>
  <component
    :is="story.content.component"
    v-if="story.content.component && !$fetchState.pending"
    :key="story.content._uid"
    :blok="story.content"
  />
</template>
<script>
export default {
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories${context.store.state.language.language ? `/${context.store.state.language.language}` : context.store.state.language.language}${context.route.path}`)
      .then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          'Sorry but this content doesn\'t extist', `Sorry, but the content called: "${context.route.name}" has a problem or doesn't exist`
        )
      })
  },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  async fetch () {
    const { data } = await this.$storyapi.get(`cdn/stories${this.$store.state.language.language ? `/${this.$store.state.language.language}` : this.$store.state.language.language}${this.$route.path}`)
    this.story = data.story
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
    '$store.state.language.language': '$fetch'
  }
}
</script>
