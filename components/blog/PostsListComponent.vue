<template>
  <ul class="">
    <li v-for="post in sortedPosts" :key="post._uid">
      <PostTeaser
        v-if="post.content"
        :postLink="post.full_slug"
        :postContent="post.content"
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
      required: true,
    },
  },
  computed: {
    sortedPosts() {
      const featuredPosts = this.$store.state.blog.posts.filter((post) => {
        return this.blok.posts.includes(post.uuid)
      })
      featuredPosts.sort((a, b) => {
        return this.blok.posts.indexOf(a.uuid) - this.blok.posts.indexOf(b.uuid)
      })
      return featuredPosts
    },
  },
}
</script>