<template>
  <ul class="post-list w-full grid gap-y-5 md:gap-y-10">
    <PostTeaser
      v-for="post in sortedPosts"
      :key="post._uid"
      :post-link="`${$route.path}/${post.slug}`"
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
  computed: {
    sortedPosts () {
      const featuredPosts = this.$store.state.list.items.filter((post) => {
        return this.blok.posts.includes(post.uuid)
      })
      featuredPosts.sort((a, b) => {
        return this.blok.posts.indexOf(a.uuid) - this.blok.posts.indexOf(b.uuid)
      })
      return featuredPosts
    }
  }
}
</script>
