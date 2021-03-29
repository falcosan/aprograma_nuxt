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
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.route.path}`)
      .then((res) => {
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
    const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}/${this.$route.path}`)
    this.story = data.story
    const lang = this.$store.state.language.language === '' ? '[default]/blog' : `${this.$store.state.language.language}/blog`
    const listPosts = await this.$storyapi.get('cdn/stories', {
      starts_with: lang
    })
    this.$store.commit('blog/setPosts', listPosts.data.stories)
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
