<template>
  <component
    :is="story.content.component"
    v-if="story.content.component && !$fetchState.pending"
    :key="story.content._uid"
    :blok="story.content"
  />
  <div v-else class="loading h-screen w-screen" />
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
import Post from '@/components/blog/PostComponent'
export default {
  components: { Project, Post },
  asyncData (context) {
    const slug = (context.route.path === '/' || context.route.path === '') ? '/home' : context.route.path
    return context.app.$storyapi
      .get(`cdn/stories${slug}`, {
        language: context.store.state.language.language
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          'Sorry but this content doesn\'t extist', `Sorry, but the content called: "${context.route.name}" has a problem or doesn't exist`
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
    const slug = (this.$route.path === '/' || this.$route.path === '') ? '/home' : this.$route.path
    const { data } = await this.$storyapi.get(`cdn/stories${slug}`, {
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
          content () {
            switch (this.$route.name) {
              case 'about':
                return 'About the Aprograma project'
              case 'portfolio':
                return 'Blog with last news of Aprograma'
              case 'contact':
                return 'Contact the Aprograma'
              case 'blog':
                return 'Blog with last news of Aprograma'
            }
          }
        }
      ]
    }
  },
  watch: {
    '$store.state.language.language': '$fetch'
  }
}
</script>
