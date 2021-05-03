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
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  async fetch () {
    try {
      this.$store.dispatch('list/addItems', this.$route.name)
      const { data } = await this.$storyapi.get(`cdn/stories${this.$store.state.language.language ? `/${this.$store.state.language.language}` : this.$store.state.language.language}${this.$route.path}`)
      this.story = data.story
    } catch (err) {
      this.$errorMessage(err, `Sorry, but this post: "${this.$route.name}" doesn 't exist`, `Sorry, but this post: "${this.$route.name}" has a problem or doesn 't exist`)
    }
  },
  head () {
    return {
      title: this.$fetchState.pending ? 'Aprograma' : `${this.story.name} - Aprograma`,
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
