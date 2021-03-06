<template>
  <div v-if="sortedPosts.length > 0" class="posts w-full">
    <div v-if="blok.search_action" class="post-search grid self-start mb-5">
      <input v-model="searchTerm" :placeholder="$languageCase('Search the post', 'Busca el post', 'Cerca il post')" class="search-bar w-full h-10 p-2 rounded border border-gray-500 text-black bg-gray-50" type="text">
    </div>
    <div v-if="blok.categories_action && sortedCategories.length > 0" class="post-categories grid relative overflow-hidden">
      <div :class="`show-categories flex justify-self-end row-start-2 row-end-1 mb-5 cursor-pointer rounded transition bg-gray-200 ${!$device.isDesktop ? '' : 'hover:opacity-80'}`" @click="showCategories">
        <Input class="input-show w-full pr-0 bg-transparent" type="button" :text="$languageCase('Categories' , 'Categorías' , 'Categorie')" />
        <Icon next class="px-4 rounded bg-gray-200" tag="span" :size="`w-3 h-3 transition ${showFilters ? 'transform -rotate-90' : 'transform rotate-90'}`" />
      </div>
      <transition
        enter-active-class="duration-150"
        leave-active-class="duration-150"
        enter-class="opacity-0 transform translate-y-full"
        leave-to-class="absolute"
      >
        <ul v-if="showFilters" class="categories-list grid grid-cols-fit-small row-start-2 row-end-auto auto-cols-fr gap-5 mb-5">
          <li
            v-for="(filter, index) in sortedCategories"
            :key="index"
            :class="`category-container h-full flex justify-between overflow-hidden rounded cursor-pointer select-none transition-all bg-neutral-600 text-white ${comparedCategories.includes(filter.value) ? 'bg-opacity-70' : !$device.isDesktop ? '' : 'hover:bg-gray-700'}`"
            @click="filterSearch(filter)"
          >
            <Input :class="`category-input w-full text-left rounded pointer-events-none italic truncate transition-all ${comparedCategories.includes(filter.value) ? 'bg-neutral-500' : 'bg-transparent'}`" type="button" :text="filter.render" />
            <Icon close tag="span" size="w-2.5 h-2.5" :class="`px-4 pointer-events-none transition ${comparedCategories.includes(filter.value) ? '' : 'transform rotate-45'}`" />
          </li>
          <li class="reset-container h-full overflow-hidden col-start-1 col-end-1 row-start-1 row-end-1 rounded cursor-pointer select-none" @click="searchCategory = []">
            <Input class="reset-input w-full bg-gray-200" type="button" :text="$languageCase('Clear filters', 'Borrar filtros', 'Rimuovi filtri')" />
          </li>
        </ul>
      </transition>
    </div>
    <transition-group
      tag="ul"
      :class="`post-list w-full grid gap-5 auto-cols-fr auto-rows-fr ${blok.row_container || sliderMode || carouselMode || containerMode ? maxPosts : 'md:grid-cols-fill-medium lg:grid-cols-none lg:grid-flow-row'}`"
      appear
      enter-active-class="duration-150"
      leave-active-class="duration-150"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <PostTeaser
        v-for="post in searchQuery"
        :key="post.uuid"
        :post-link="`${post.slug}/`"
        :post-content="post.content"
        :row-container="blok.row_container"
        :slider-container="sliderMode"
        :carousel-container="carouselMode"
        :container-container="containerMode"
        :container-width="containerWidth"
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
  fetch () {
    if (this.$route.name !== 'blog') { this.$store.dispatch('list/posts/addPosts') }
  },
  computed: {
    maxPosts () {
      if (this.sliderMode || this.carouselMode || this.containerMode) {
        if (this.containerWidth >= 536) {
          return 'md:grid-cols-fill-medium lg:grid-cols-fill-big'
        } return this.containerWidth >= 354 ? 'md:grid-cols-fill-medium' : this.sliderMode ? 'sm:grid-cols-fill-small' : 'sm:grid-cols-fill-small md:grid-cols-fill-medium'
      } else {
        return 'md:grid-cols-fill-medium lg:grid-cols-fill-big'
      }
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
      return this.blok.categories.map((category) => {
        const mapCategory = category.toLowerCase().split('; ')
        return mapCategory.map(render => ({ render, value: mapCategory[0] }))[this.$languageCase(0, 1, 2)]
      }).sort((a, b) => a.render.localeCompare(b.render))
    },
    comparedCategories () {
      return this.searchCategory.map(({ value }) => value)
    },
    searchQuery () {
      if (this.searchTerm && this.blok.search_action && (!this.blok.categories_action || this.comparedCategories.length === 0)) {
        return this.filterByTerm
      } else if ((!this.searchTerm || !this.blok.search_action) && this.blok.categories_action && this.comparedCategories.length > 0) {
        return this.filterByCategory
      } else if (this.searchTerm && this.blok.search_action && this.blok.categories_action && this.comparedCategories.length > 0) {
        return this.filterBoth
      } else {
        return this.sortedPosts
      }
    },
    filterByTerm () {
      return this.sortedPosts.filter(post => `${post.content.title} ${post.content.intro}`.toLowerCase().includes(this.searchTerm.toLowerCase()))
    },
    filterByCategory () {
      return this.sortedPosts.filter(post => post.content.categories.some(postCategory => this.comparedCategories.includes(postCategory.toLowerCase().split('; ')[0])))
    },
    filterBoth () {
      return this.filterByTerm.filter(post => post.content.categories.some(postCategory => this.comparedCategories.includes(postCategory.toLowerCase().split('; ')[0])))
    }
  },
  watch: {
    '$store.state.language.language': {
      handler () {
        if (this.$route.name !== 'blog') { this.$fetch() }
      }
    }
  },
  methods: {
    filterSearch (filter) {
      if (!this.comparedCategories.includes(filter.value)) {
        this.searchCategory.push(filter)
      } else {
        this.searchCategory.splice(this.comparedCategories.indexOf(filter.value), 1)
      }
    },
    showCategories () {
      this.searchCategory = []
      this.showFilters = !this.showFilters
    }
  }
}
</script>
