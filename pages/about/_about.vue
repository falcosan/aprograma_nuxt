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
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  async fetch () {
    try {
      const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}/${this.$route.path}`, {
        version: 'published'
      })
      this.story = data.story
    } catch (error) {
      this.$errorMessage(`404 ${error}`)
    }
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
    '$store.state.language.language': '$fetch'
  }
}
</script>
