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
    const slug = (context.route.path === '/' || context.route.path === '') ? '/home' : context.route.path
    return context.app.$storyapi
      .get(`cdn/stories${context.store.state.language.language ? `/${context.store.state.language.language}` : context.store.state.language.language}${slug}`)
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
    const slug = (this.$route.path === '/' || this.$route.path === '') ? '/home' : this.$route.path
    const { data } = await this.$storyapi.get(`cdn/stories${this.$store.state.language.language ? `/${this.$store.state.language.language}` : this.$store.state.language.language}${slug}`)
    this.story = data.story
  },
  watch: {
    '$store.state.language.language': '$fetch'
  }
}
</script>
