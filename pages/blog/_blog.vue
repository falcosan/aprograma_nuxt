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
import Post from '@/components/PostComponent'
export default {
  components: { Post },
  data() {
    return {
      story: {},
    }
  },
  async fetch(context) {
    if (context.store.state.posts.loaded !== '1') {
      let postsRefRes = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with: 'blog',
        version: 'published',
      })
      context.store.commit('posts/setPosts', postsRefRes.data.stories)
      context.store.commit('posts/setLoaded', '1')
    }
  },
  asyncData(context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.route.path}`, {
        version: 'published',
      })
      .then((res) => {
        return res.data
      })
  },
}
</script>