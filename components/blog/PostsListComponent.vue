<template>
  <ul ref="container" :class="`post-list w-full ${blok.row_container ? 'grid gap-5 auto-cols-fr md:grid-cols-container' : 'grid gap-5 auto-cols-fr'}`">
    <PostTeaser
      v-for="(post, index) in sortedPosts"
      :key="post._uid"
      :class="`${index === 0 ? '' : ''}`"
      :post-link="`blog/${post.slug}`"
      :post-content="post.content"
    />
  </ul>
</template>

<script>
import PostTeaser from './PostTeaserComponent'
export default {
  components: { PostTeaser },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dims: {
        width: null,
        height: null
      }
    }
  },
  computed: {
    sortedPosts () {
      const featuredPosts = this.$store.state.list.posts.items.filter((post) => {
        return this.blok.posts.includes(post.uuid)
      })
      featuredPosts.sort((a, b) => {
        return this.blok.posts.indexOf(a.uuid) - this.blok.posts.indexOf(b.uuid)
      })
      return featuredPosts
    }
  },
  created () {
    if (this.$route.name !== 'blog') {
      this.getPosts()
    }
  },
  beforeDestroy () {
    this.$store.dispatch('list/posts/deletePosts')
  },
  methods: {
    async getPosts () {
      await this.$store.dispatch('list/posts/addPosts')
    }

  }
}
</script>
