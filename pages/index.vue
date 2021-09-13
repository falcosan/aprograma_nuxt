<template>
  <component
    :is="story.content.component"
    v-if="!$fetchState.pending"
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
        language: context.store.state.language.language
      }).then((res) => {
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
    const { data } = await this.$storyapi.get(`cdn/stories${slug}`, {
      language: this.$store.state.language.language
    })
    this.story = data.story
  },
  watch: {
    '$store.state.language.language': '$fetch'
  }
}
</script>
