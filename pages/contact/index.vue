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
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  async fetch () {
    const { data } = await this.$storyapi.get(`cdn/stories${this.$route.path}`, {
      language: this.$store.state.language.language
    })
    this.story = data.story
  },
  fetchDelay: 0,
  fetchOnServer: false,
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
    '$store.state.language.language': '$fetch'
  }
}
</script>
