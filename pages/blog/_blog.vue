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
      const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.data.language}/${this.$route.path}`)
      this.story = data.story
    } catch {
      this.$errorMessage(this.story.content.component,
          `Sorry but the post called ${this.$route.path.substring(
            this.$route.path.lastIndexOf('/') + 1
          )} doesn't extist`, `Sorry, but the post called: "${this.$route.path.substring(
          this.$route.path.lastIndexOf('/') + 1)}" has a problem or doesn't exist`
      )
    }
    this.$store.dispatch('list/addItems', 'blog')
  },
  head () {
    return {
      title: `${this.story.name} - aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Blog with last news of aprograma'
        }
      ]
    }
  },
  watch: {
    '$store.state.data.language': '$fetch'
  }
}
</script>
