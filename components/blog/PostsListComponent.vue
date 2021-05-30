<template>
  <ul :class="`post-list w-full grid gap-5 auto-cols-fr ${blok.row_container && parentRow ? 'md:auto-rows-max' : 'lg:grid-flow-row lg:auto-rows-fr'}`">
    <PostTeaser
      v-for="post in sortedPosts"
      :key="post._uid"
      :post-link="`blog/${post.slug}`"
      :post-content="post.content"
      :row-container="parentRow && blok.row_container"
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
    },
    containerMode: {
      type: Boolean,
      default: false
    },
    sliderMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    parentRow () {
      return !!(this.containerMode || this.sliderMode)
    },
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
