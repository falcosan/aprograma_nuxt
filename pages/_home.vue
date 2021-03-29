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
    const slug = (this.$route.path === '/' || this.$route.path === '') ? 'home' : this.$route.path
    try {
      const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}/${slug}`, {
        version: 'published'
      })
      this.story = data.story
    } catch (error) {
      this.$errorMessage(this.story.content.component, `404 ${error}`, '500')
    }
  },
  head () {
    return {
      title: `${this.story.name} - aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page of aprograma website'
        }
      ]
    }
  },
  watch: {
    '$store.state.language.language': '$fetch'
  }
}
</script>
