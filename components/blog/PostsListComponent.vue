<template>
  <div v-if="sortedPosts.length > 0" class="posts">
    <div v-if="blok.search_action" class="post-search grid self-start mb-5">
      <label class="search-label pb-5 font-extralight">{{ $languageCase('Search the post', 'Busca el post', 'Cerca il post') }}</label>
      <input v-model="searchTerm" class="search-bar w-full h-10 p-2 rounded border border-gray-500 text-black bg-gray-50" type="text">
    </div>
    <div v-if="blok.categories_action">
      <ul class="flex flex-wrap -my-1.5 -mx-2.5 pb-5">
        <li
          v-for="(filter, index) in blok.categories"
          :key="index"
          :class="`input-container flex my-1.5 mx-2.5 overflow-hidden rounded cursor-pointer transition-shadow duration-100 filter hover:bg-opacity-80 grayscale text-white bg-gray-600 ${searchCategory.includes(setLanguageCase(filter)) ? 'bg-opacity-70' : ''}`"
          @click="filterSearch(filter)"
        >
          <button class="filter-input py-3 pl-4 font-extralight text-sm" v-text="setLanguageCase(filter)" />
          <Icon close tag="span" size="w-2" :class="`px-4 transition ${searchCategory.includes(setLanguageCase(filter)) ? '' : 'transform rotate-45'}`" />
        </li>
      </ul>
    </div>
    <transition-group
      tag="ul"
      :class="`post-list w-full grid gap-5 auto-cols-fr ${blok.row_container || sliderContainer || carouselContainer || containerContainer ? `${maxPosts} auto-rows-fr` : 'lg:grid-flow-row lg:auto-rows-fr'}`"
      appear
      enter-active-class="duration-200"
      leave-active-class="duration-200"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <PostTeaser
        v-for="post in searchQuery"
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
      searchTerm: '',
      searchCategory: []
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
        return 'md:grid-cols-fit-medium lg:grid-cols-fit-big'
      } return this.containerWidth >= 354 ? 'sm:grid-cols-fit-small md:grid-cols-fit-medium' : 'md:grid-cols-fit-small'
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
    searchQuery () {
      if (this.searchTerm && this.blok.search_action && (!this.blok.categories_action || this.searchCategory.length === 0)) {
        return this.filterByTerm
      } else if ((!this.searchTerm || !this.blok.search_action) && this.blok.categories_action && this.searchCategory.length > 0) {
        return this.filterByCategory
      } else if (this.searchTerm && this.blok.search_action && this.blok.categories_action && this.searchCategory.length > 0) {
        return this.filterBoth
      } else {
        return this.sortedPosts
      }
    },
    filterByTerm () {
      return this.sortedPosts.filter(post => `${post.content.title} ${post.content.intro}`.toLowerCase().includes(this.searchTerm.toLowerCase()))
    },
    filterByCategory () {
      return this.sortedPosts.filter(post => post.content.categories.some(postCategory => this.searchCategory.includes(this.$languageCase(postCategory.toLowerCase().split(', ').filter(subFilter => subFilter)[0], postCategory.toLowerCase().split(', ').filter(subFilter => subFilter)[1], postCategory.toLowerCase().split(', ').filter(subFilter => subFilter)[2]))))
    },
    filterBoth () {
      return this.filterByTerm.filter(post => post.content.categories.some(postCategory => this.searchCategory.includes(this.$languageCase(postCategory.toLowerCase().split(', ').filter(subFilter => subFilter)[0], postCategory.toLowerCase().split(', ').filter(subFilter => subFilter)[1], postCategory.toLowerCase().split(', ').filter(subFilter => subFilter)[2]))))
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
    },
    filterSearch (filter) {
      if (!this.searchCategory.includes(this.setLanguageCase(filter))) {
        this.searchCategory.push(this.setLanguageCase(filter))
      } else {
        this.searchCategory.splice(this.searchCategory.indexOf(this.setLanguageCase(filter)), 1)
      }
    },
    setLanguageCase (filter) {
      const hash = filter.toLowerCase().split(', ').filter(subFilter => subFilter)
      return this.$languageCase(hash[0], hash[1], hash[2])
    }
  }
}
</script>
