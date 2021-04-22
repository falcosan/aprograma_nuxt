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
    return context.app.$storyapi
      .get(`cdn/stories/${context.store.state.data.language}/${context.route.path}`)
      .then((res) => {
        context.store.commit('data/pageMutation', context.route.path)
        return res.data
      })
      .catch((res) => {
        context.$errorMessage(res.response,
          `Sorry but the post called ${context.route.path.substring(
            context.route.path.lastIndexOf('/') + 1
          )} doesn't extist`, `Sorry, but the post called: "${context.route.path.substring(
          context.route.path.lastIndexOf('/') + 1)}" has a problem or doesn't exist`
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
    const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.data.language}/${this.$route.path}`)
    this.story = data.story
    this.$store.dispatch('list/addItems', 'blog')
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
    '$store.state.data.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
