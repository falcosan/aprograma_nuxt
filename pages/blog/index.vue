<template>
  <component
    :is="story.content.component"
    v-if="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  asyncData (context) {
    context.store.dispatch('list/addItems', context.route.name)
    return context.app.$storyapi
      .get(`cdn/stories/${context.store.state.language.language}${context.route.path}`)
      .then((res) => {
        return res.data
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
    try {
      const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}${this.$route.path}`)
      this.story = data.story
    } catch (err) {
      this.$errorMessage(err, `Sorry but the post called ${this.$route.name} doesn't extist`, `Sorry, but the post called: "${this.$route.name}" has a problem or doesn't exist`
      )
    }
  },
  head () {
    return {
      title: `${this.story.name} - Aprograma`,
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
    '$store.state.language.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
