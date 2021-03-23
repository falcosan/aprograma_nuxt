<template>
  <div v-editable="blok">
    <h2 class="pt-2 pl-6 text-lg text-gray-700 italic">{{ blok.title }}</h2>
    <ul class="flex py-6 mb-6">
      <li
        v-for="post in sortedPosts"
        :key="post._uid"
        class="flex-auto px-6"
        style="min-width: 33%"
      >
        <PostTeaser
          v-if="post.content"
          :postLink="post.full_slug"
          :postContent="post.content"
        />
        <p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">
          This content loads on save.
        </p>
      </li>
    </ul>
  </div>
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
      const featuredPosts = this.$store.state.posts.posts.filter((post) => {
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