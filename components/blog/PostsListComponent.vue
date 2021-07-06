<template>
  <div class="posts">
    <div v-if="blok.search_action" class="post-search border-b-4 border-dotted mb-2.5 pb-2.5 md:pb-5 md:mb-5">
      <label class="search-label">{{ $languageCase('Search the post', 'Busca el post', 'Cerca il post') }}</label>
      <input v-model="searchTerm" class="search-bar w-full h-10 p-2 mt-2.5 md:mt-5 border border-black" type="text">
    </div>

    <transition-group
      tag="ul"
      :class="`post-list w-full grid gap-5 auto-cols-fr ${blok.row_container && parentRow ? 'md:auto-rows-max' : 'lg:grid-flow-row lg:auto-rows-fr'}`"
      appear
      enter-active-class="duration-200"
      leave-active-class="duration-200"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <PostTeaser
        v-for="post in searchTerm && blok.search_action ? filterByTerm : sortedPosts"
        :key="post.uuid"
        class="transition-all duration-200"
        :post-link="`blog/${post.slug}`"
        :post-content="post.content"
        :row-container="parentRow && blok.row_container"
      />
    </transition-group>
  </div>
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
  data () {
    return {
      searchTerm: ''
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
    },
    filterByTerm () {
      return this.sortedPosts.filter((post) => {
        const textContent = post.content.title.toLowerCase() + post.content.intro.toLowerCase()
        return textContent.includes(this.searchTerm)
      })
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
