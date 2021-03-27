<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    />
  </section>
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  head() {
    return {
      title: `${this.story.name} - aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Blog with last news of aprograma',
        },
      ],
    }
  },
  async fetch(context) {
    if (context.store.state.blog.loaded !== '1') {
      let listPosts = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with: 'blog',
        version: 'published',
      })
      context.store.commit('blog/setPosts', listPosts.data.stories)
      context.store.commit('blog/setLoaded', '1')
    }
  },
  asyncData(context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.route.path}`, {
        version: 'published',
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
}
</script>