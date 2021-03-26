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
  async fetch(context) {
    if (context.store.state.blog.loaded !== '1') {
      let postsRefRes = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with: 'blog',
        version: 'published',
      })
      context.store.commit('blog/setPosts', postsRefRes.data.stories)
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
        context.$errorMessage(context)
      })
  },
}
</script>