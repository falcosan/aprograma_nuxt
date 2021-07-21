<template>
  <div class="posts">
    <div v-if="blok.search_action" class="post-search self-start mb-5 md:mb-10">
      <label class="search-label">{{ $languageCase('Search the post', 'Busca el post', 'Cerca il post') }}</label>
      <input v-model="searchTerm" class="search-bar w-full h-10 p-2 mt-2.5 md:mt-5 rounded-md border border-black" type="text">
    </div>
    <transition-group
      tag="ul"
      :class="`post-list w-full grid gap-5 auto-cols-fr ${blok.row_container || sliderContainer || carouselContainer || containerContainer ? `${maxPosts} md:auto-rows-fr` : 'lg:grid-flow-row lg:auto-rows-fr'}`"
      appear
      enter-active-class="duration-200"
      leave-active-class="duration-200"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <PostTeaser
        v-for="post in searchTerm && blok.search_action ? filterByTerm : sortedPosts"
        :key="post.uuid"
        :post-link="`blog/${post.slug}`"
        :post-content="post.content"
        :row-container="blok.row_container"
        :slider-container="sliderContainer"
        :carousel-container="carouselContainer"
        :container-container="containerContainer"
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
    containerWidth: {
      type: Number,
      default: 0
    },
    containerMode: {
      type: Boolean,
      default: false
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
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
    sliderContainer () {
      return !!(this.sliderMode || this.$parent.sliderMode)
    },
    carouselContainer () {
      return !!(this.carouselMode || this.$parent.carouselMode)
    },
    containerContainer () {
      return !!(this.containerMode || this.$parent.containerMode)
    },
    maxPosts () {
      if (this.containerWidth >= 536) {
        return 'sm:grid-cols-fill-medium'
      } return 'xs:grid-cols-fill-small'
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
        return `${post.content.title} ${post.content.intro}`.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
    }
  },
  created () {
    if (this.$route.name !== 'blog') {
      this.getPosts()
    }
  },
  methods: {
    async getPosts () {
      await this.$store.dispatch('list/posts/addPosts')
    }

  }
}
</script>
