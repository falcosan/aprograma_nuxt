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
        context.$errorMessage(!res, `404 ${res.response.data}`, res.response.data)
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
    const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}/${this.$route.path}`)
    this.story = data.story
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
