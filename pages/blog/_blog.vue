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
      .get(`cdn/stories/${context.route.path}`, {
        version: 'published'
      })
      .then((data) => {
        return data.data
      })
      .catch(() => {
        context.$errorMessage(
          `Sorry but the post called ${context.route.path.substring(
            context.route.path.lastIndexOf('/') + 1
          )} doesn't extist`
        )
      })
  },
  async fetch (context) {
    if (context.store.state.blog.loaded !== '1') {
      const listPosts = await context.app.$storyapi.get('cdn/stories/', {
        starts_with: 'blog',
        version: 'published'
      })
      context.store.commit('blog/setPosts', listPosts.data.stories)
      context.store.commit('blog/setLoaded', '1')
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
  }
}
</script>
