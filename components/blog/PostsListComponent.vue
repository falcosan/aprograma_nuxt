<template>
  <ul class="grid gap-y-5">
    <li v-for="post in sortedPosts" :key="post._uid">
      <PostTeaser
        v-if="post.content"
        :post-link="`${post.full_slug}`"
        :post-content="post.content"
      />
    </li>
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
      const featuredPosts = this.$store.state.blog.posts.filter((post) => {
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
