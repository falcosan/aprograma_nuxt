<template>
  <div v-if="sortedPosts.length > 0" class="posts w-full">
    <div v-if="blok.search_action" class="post-search grid self-start mb-5">
      <input v-model="searchTerm" :placeholder="$languageCase('Search the post', 'Busca el post', 'Cerca il post')" class="search-bar w-full h-10 p-2 rounded border border-gray-500 text-black bg-gray-50" type="text">
    </div>
    <div v-if="blok.categories_action" class="post-categories grid relative overflow-hidden">
      <div class="show-categories w-max flex justify-self-end row-start-2 row-end-1 cursor-pointer mb-5" @click="showCategories">
        <Input class="input-show mr-2 bg-transparent" type="button" :text="$languageCase('Categories' , 'Categorías' , 'Categorie')" />
        <Icon next class="pointer-events-none rounded bg-gray-200" tag="span" :size="`w-6 px-2 py-1 transition ${showFilters ? 'transform -rotate-90' : 'transform rotate-90'}`" />
      </div>
      <transition
        enter-active-class="duration-150"
        leave-active-class="duration-150"
        enter-class="opacity-0 transform translate-y-full"
        leave-to-class="absolute"
      >
        <ul v-if="showFilters" class="categories-list grid grid-cols-fit-tiny row-start-2 row-end-auto auto-cols-fr gap-5 mb-5">
          <li
            v-for="(filter, index) in sortedCategories"
            :key="index"
            :class="`category-container h-full flex justify-between overflow-hidden rounded cursor-pointer select-none transition-all filter grayscale bg-gray-600 text-white ${searchCategory.includes(filter) ? 'bg-opacity-70' : !$device.isDesktop ? '' : 'hover:bg-gray-700'}`"
            @click="filterSearch(filter)"
          >
            <Input :class="`category-input w-full py-3 px-4 text-sm text-left rounded truncate transition-all ${searchCategory.includes(filter) ? 'filter grayscale bg-gray-500' : 'bg-transparent'}`" type="button" :text="filter" />
            <Icon close tag="span" size="w-2" :class="`px-3.5 xs:px-5 pointer-events-none transition ${searchCategory.includes(filter) ? '' : 'transform rotate-45'}`" />
          </li>
          <li class="reset-container h-full overflow-hidden rounded cursor-pointer select-none" @click="searchCategory = []">
            <Input :class="`reset-input w-full py-3 px-4 text-sm transition bg-gray-200 ${!$device.isDesktop ? '' : 'hover:bg-gray-300'}`" type="button" :text="$languageCase('Clear filters', 'Borrar filtros', 'Rimuovi filtri')" />
          </li>
        </ul>
      </transition>
    </div>
    <transition-group
      tag="ul"
      :class="`post-list w-full grid gap-5 auto-cols-fr ${blok.row_container || sliderContainer || carouselContainer || containerContainer ? `${maxPosts}` : 'lg:grid-flow-row lg:auto-rows-fr'}`"
      appear
      enter-active-class="duration-150"
      leave-active-class="duration-150"
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
      searchCategory: [],
      showFilters: false
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
    sortedCategories () {
      return this.blok.categories.map(category => category.toLowerCase().split(', ')[this.$languageCase(0, 1, 2)]).sort()
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
      return this.sortedPosts.filter(post => post.content.categories.some(postCategory => this.searchCategory.includes(this.setLanguageCase(postCategory))))
    },
    filterBoth () {
      return this.filterByTerm.filter(post => post.content.categories.some(postCategory => this.searchCategory.includes(this.setLanguageCase(postCategory))))
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
      if (!this.searchCategory.includes(filter)) {
        this.searchCategory.push(filter)
      } else {
        this.searchCategory.splice(this.searchCategory.indexOf(filter), 1)
      }
    },
    setLanguageCase (filter) {
      const hash = filter.toLowerCase().split(', ').filter(subFilter => subFilter)
      return this.$languageCase(hash[0], hash[1], hash[2])
    },
    showCategories () {
      this.searchCategory = []
      this.showFilters = !this.showFilters
    }
  }
}
</script>
