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
      const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}/${this.$route.path}`, {
        version: 'published'
      })
      this.story = data.story
    } catch (error) {
      this.$errorMessage(this.story.content.component,
          `Sorry but the post called ${this.$route.path.substring(
            this.$route.path.lastIndexOf('/') + 1
          )} doesn't extist anymore`, '500'
      )
    }

    if (this.$store.state.blog.loaded !== '1') {
      const listPosts = await this.$storyapi.get('cdn/stories/', {
        starts_with: 'blog',
        version: 'published'
      })
      this.$store.commit('blog/setPosts', listPosts.data.stories)
      this.$store.commit('blog/setLoaded', '1')
    }
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
    '$store.state.language.language': '$fetch'
  }
}
</script>
