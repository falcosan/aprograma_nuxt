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
    const slug = (context.route.path === '/' || context.route.path === '') ? 'home' : context.route.path
    return context.app.$storyapi
      .get(`cdn/stories/${slug}`)
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
    const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}/home`)
    this.story = data.story
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
