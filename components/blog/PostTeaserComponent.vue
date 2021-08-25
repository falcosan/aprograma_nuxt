<template>
  <li
    v-if="postContent"
    class="post-teaser w-full overflow-hidden rounded"
  >
    <NuxtLink :to="postLink" class="teaser-link">
      <div
        :class="`teaser-content h-full flex flex-col ${rowContainer || sliderContainer || containerContainer || carouselContainer ? '' : 'lg:max-h-72 xl:max-h-56 lg:flex-row'}`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <div :class="`teaser-file w-full h-screen ${rowContainer || sliderContainer || containerContainer || carouselContainer ? maxSize : 'max-h-44 xx:max-h-48 xs:max-h-56 sm:max-h-64 md:max-h-52 lg:max-h-56 lg:w-1/2'} ${postContent.file.filename ? '' : 'bg-black'}`">
          <component
            :is="postContent.file.filename ? lookFile() : 'NuxtImg'"
            :loading="lookFile() === 'NuxtImg' || !postContent.file.filename ? 'lazy' : false"
            :format="lookFile() === 'NuxtImg' || !postContent.file.filename ? 'webp' : false"
            :modifiers="lookFile() === 'NuxtImg' && postContent.file.filename ? { filters: { focal: postContent.file.focus ? postContent.file.focus : 0 } } : null"
            :class="`w-full h-full object-center select-none ${rowContainer || sliderContainer || containerContainer || carouselContainer ? maxSize : 'max-h-44 xx:max-h-48 xs:max-h-56 sm:max-h-64 md:max-h-52 lg:max-h-56'}  ${postContent.file.filename ? 'object-cover' : 'pl-2.5 object-contain'}`"
            :alt="postContent.file.filename ? lookFile() === 'NuxtImg' ? postContent.file.alt : false : $languageCase('quantum vacuum', 'vacío cuántico', 'vuoto quantistico')"
            :src="setFile"
            :fit="lookFile() === 'NuxtImg' || !postContent.file.filename ? 'in' : false"
            :width="lookFile() === 'NuxtImg' || !postContent.file.filename ? '1366' : false"
            :height="lookFile() === 'NuxtImg' || !postContent.file.filename ? '494' : false"
            :sizes="lookFile() === 'NuxtImg' || !postContent.file.filename ? 'xs:299px sm:380px md:514px lg:620px xl:984px 2xl:1366px' : false"
          />
        </div>
        <div :class="`teaser-text w-full flex flex-col flex-auto justify-between p-5 ${rowContainer || sliderContainer || carouselContainer || containerContainer ? '' : 'lg:h-screen lg:max-h-56 lg:w-1/2'}`" :style="`background-color: ${postContent.background_color.color ? postContent.background_color.color : '#e0e0e0'}; color: ${postContent.text_color.color};`">
          <div class="text-description">
            <span
              class="teaser-title mb-2.5 overflow-hidden text-lg sm:text-xl"
            >
              {{ postContent.title }}
            </span>
            <span
              class="teaser-intro overflow-hidden text-sm font-light"
            >
              {{ postContent.intro }}
            </span>
          </div>
          <div class="teaser-info w-full flex flex-col mt-2.5 items-end">
            <ul :class="`teaser-categories w-full flex flex-wrap ${rowContainer || sliderContainer || containerContainer || carouselContainer ? 'justify-end' : 'mx-1 mb-2.5'}`">
              <li v-for="(category, index) in sortedCategories" :key="index" class="teaser-category text-xs p-2.5 m-1 rounded shadow-sm italic font-light filter brightness-95 transition-shadow" :style="`background-color: ${postContent.background_color.color ? postContent.background_color.color : '#e0e0e0'};`">
                {{ category }}
              </li>
            </ul>
            <span
              v-if="$route.name === 'blog'"
              class="teaser-date flex-none self-end text-xs text-right"
              v-text="changeDate(postContent.date)"
            />
          </div>
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
    containerWidth: {
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
    maxSize () {
      if (this.sliderContainer) {
        if (this.containerWidth <= 240) {
          return 'max-h-40'
        } else if (this.containerWidth <= 280) {
          return 'max-h-44'
        } else if (this.containerWidth <= 320) {
          return 'max-h-48'
        } else if (this.containerWidth <= 375) {
          return 'max-h-56'
        } else {
          return 'max-h-64'
        }
      } else {
        return 'max-h-44 xx:max-h-48 xs:max-h-56 sm:max-h-64 md:max-h-52 lg:max-h-56 xl:max-h-64'
      }
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
