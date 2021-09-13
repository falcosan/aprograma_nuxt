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
    await this.$store.dispatch('list/posts/addPosts')
    const { data } = await this.$storyapi.get(`cdn/stories${this.$route.path}`, {
      language: this.$store.state.language.language
    })
    this.story = data.story
  },
  head () {
    return {
      title: `Aprograma - ${this.story.name}`,
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
    '$store.state.language.language': '$fetch'
  }
}
</script>
