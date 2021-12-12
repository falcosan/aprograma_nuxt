<template>
  <li
    v-if="postContent"
    class="post-teaser w-full overflow-hidden rounded lg:aspect-[14/4] xl:aspect-[14/3] 2xl:aspect-[11/2]"
  >
    <NuxtLink :to="postLink" class="teaser-link">
      <div
        :class="`teaser-content h-full flex flex-col ${rowContainer || sliderContainer || containerContainer || carouselContainer ? '' : 'lg:flex-row'}`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <div
          :class="`teaser-file w-full ${rowContainer || sliderContainer || containerContainer || carouselContainer ? '' : 'lg:w-1/2'} ${postContent.file.filename ? '' : 'bg-black'}`"
        >
          <component
            :is="postContent.file.filename ? lookFile() : 'NuxtImg'"
            :loading="checkFile ? 'lazy' : false"
            :format="checkFile ? 'webp' : false"
            :modifiers="lookFile() === 'NuxtImg' && postContent.file.filename ? { filters: { focal: postContent.file.focus ? postContent.file.focus : 0 } } : null"
            :class="`w-full h-full object-center select-none aspect-video ${rowContainer || sliderContainer || containerContainer || carouselContainer ? '' : 'md:aspect-[16/10] lg:aspect-[14/4] xl:aspect-[14/3] 2xl:aspect-[11/2]'} ${postContent.file.filename ? 'object-cover' : 'object-contain'}`"
            :alt="postContent.file.filename ? lookFile() === 'NuxtImg' ? postContent.file.alt : false : $languageCase('quantum vacuum', 'vacío cuántico', 'vuoto quantistico')"
            :src="setFile"
            :fit="checkFile && !postContent.file.focus ? 'in' : null"
            :width="checkFile ? '1200' : false"
            :height="checkFile ? '434' : false"
            :sizes="checkFile ? 'xs:299px sm:380px md:514px lg:620px xl:984px 2xl:1200px' : false"
          />
        </div>
        <div :class="`teaser-text w-full flex flex-col flex-auto justify-between space-y-2.5 lg:space-y-px 2xl:space-y-0 p-5 ${rowContainer || sliderContainer || carouselContainer || containerContainer ? '' : 'lg:w-1/2'}`" :style="`background-color: ${postContent.background_color.color ? postContent.background_color.color : '#e0e0e0'}; color: ${postContent.text_color.color};`">
          <div class="text-description">
            <span
              class="teaser-title mb-2.5 overflow-hidden text-lg sm:text-xl"
            >
              {{ postContent.title }}
            </span>
            <span
              class="teaser-intro h-12 overflow-hidden leading-relaxed text-sm"
            >
              {{ postContent.intro }}
            </span>
          </div>
          <ul class="teaser-categories w-full flex flex-wrap lg:flex-nowrap -mx-1 overflow-x-auto">
            <li v-for="(category, index) in sortedCategories" :key="index" class="teaser-category text-xs p-2 m-1 rounded shadow italic filter brightness-90" :style="`background-color: ${postContent.background_color.color ? postContent.background_color.color : '#e0e0e0'};`">
              {{ category }}
            </li>
          </ul>
          <span
            class="teaser-date flex-none self-end text-xs text-right"
            v-text="changeDate(postContent.date)"
          />
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: {
    postContent: {
      type: Object,
      required: true
    },
    postLink: {
      type: String,
      required: true
    },
    rowContainer: {
      type: Boolean,
      required: true
    },
    sliderContainer: {
      type: Boolean,
      required: true
    },
    carouselContainer: {
      type: Boolean,
      required: true
    },
    containerContainer: {
      type: Boolean,
      required: true
    },
    fullWidth: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    setFile () {
      return this.postContent.file.filename ? this.postContent.file.filename : 'https://a.storyblok.com/f/106240/4065x1468/5c83c3e7de/noimeageteaser.png'
    },
    sortedCategories () {
      return this.postContent.categories.map(category => category.toLowerCase().split('; ')[this.$languageCase(0, 1, 2)]).sort()
    },
    checkFile () {
      return this.lookFile() === 'NuxtImg' || !this.postContent.file.filename
    }
  },
  methods: {
    changeDate (date) {
      const currentDateTime = new Date(date.replace(' ', 'T'))
      const formattedDate = `${currentDateTime.getDate()} / ${
        currentDateTime.getMonth() + 1
      } / ${currentDateTime.getFullYear()}`
      return formattedDate.toString()
    },
    lookFile () {
      switch (this.postContent.file.filename.toLowerCase().split('.').pop()) {
        case 'pdf':
          return 'embed'
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
        case 'webp':
        case 'bmp':
        case 'tiff':
          return 'NuxtImg'
      }
    }
  }
}
</script>
<style scoped>
 .teaser-title{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:  2;
  }
.teaser-intro{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:  2;
}
</style>
