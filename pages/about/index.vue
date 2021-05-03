<template>
  <component
    :is="story.content.component"
    v-if="story.content.component && !$fetchState.pending"
    :key="story.content._uid"
    :blok="story.content"
  />
  <div v-else class="h-screen" />
</template>
<script>
export default {
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  async fetch () {
    try {
      const { data } = await this.$storyapi.get(`cdn/stories${this.$store.state.language.language ? `/${this.$store.state.language.language}` : this.$store.state.language.language}${this.$route.path}`)
      this.story = data.story
    } catch (err) {
      this.$errorMessage(err, `Sorry, but this content: "${this.$route.name}" doesn 't exist`, `Sorry, but this content: "${this.$route.name}" has a problem or doesn 't exist`)
    }
  },
  head () {
    return {
      title: this.$fetchState.pending ? 'Aprograma' : `${this.story.name} - Aprograma`,
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
