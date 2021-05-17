<template>
  <component
    :is="story.content.component"
    v-if="story.content.component && !$fetchState.pending"
    :key="story.content._uid"
    :blok="story.content"
  />
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories${context.route.path}`, {
        language: context.store.state.language.language
      })
      .then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          `Sorry but this post: ${context.route.name} doesn't extist`, `Sorry, but this post: "${context.route.name}" has a problem or doesn't exist`
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
    const { data } = await this.$storyapi.get(`cdn/stories${this.$route.path}`, {
      language: this.$store.state.language.language
    })
    this.story = data.story
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
    '$store.state.language.language': '$fetch'
  }
}
</script>
