<template>
  <li
    v-if="postContent"
    :class="`post-teaser overflow-hidden rounded ${sliderContainer || carouselContainer ? '' : 'transform transition-all duration-200 hover:shadow hover:scale-105'}`"
  >
    <NuxtLink :to="postLink" class="teaser-link">
      <div
        :class="`teaser-content h-full flex flex-col ${rowContainer || sliderContainer || containerContainer || carouselContainer ? '' : 'lg:flex-row lg:h-64 2xl:h-56'}`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <div v-show="!wait" :class="`teaser-file w-full min-h-40 ${rowContainer && !carouselContainer && !sliderContainer && !containerContainer ? 'h-44 xs:h-56 sm:h-72 lg:h-64 xl:h-80' : sliderContainer || containerContainer || carouselContainer ? 'h-full' : 'h-44 xs:h-56 sm:h-72 md:h-80 lg:h-full lg:w-1/2'} ${postContent.file.filename ? '' : 'bg-black'}`">
          <component
            :is="postContent.file.filename ? lookFile() : 'img'"
            :class="`w-full h-full object-center select-none ${postContent.file.filename ? 'object-cover' : 'pl-2.5 object-contain'}`"
            :alt="postContent.file.alt"
            :src="setFile"
            :width="lookImage || !postContent.file.filename ? '100%' : ''"
            :height="lookImage || !postContent.file.filename ? '100%' : ''"
            @load="wait = false"
          />
        </div>
        <Skeleton :class="`w-full min-h-40 ${rowContainer && !carouselContainer && !sliderContainer && !containerContainer ? 'h-44 xs:h-56 sm:h-72 lg:h-64 xl:h-80' : sliderContainer || containerContainer || carouselContainer ? 'h-full' : 'h-44 xs:h-56 sm:h-72 md:h-80 lg:h-full lg:w-1/2'}`" :wait="wait" />
        <div :class="`teaser-text w-full flex flex-col p-5 ${rowContainer && !carouselContainer && !sliderContainer && !containerContainer ? 'lg:p-10' : sliderContainer || carouselContainer || containerContainer ? 'h-32 md:h-36' : 'h-max lg:h-full lg:w-1/2 sm:p-10'} ${$route.name === 'blog' ? 'justify-between' : 'justify-center'}`" :style="`background-color: ${postContent.teaser_background_color.color}; color: ${postContent.teaser_text_color.color};`">
          <div class="text-description">
            <span
              :class="`teaser-title mb-2 font-semibold overflow-hidden ${$route.name === 'blog' ? 'text-xl sm:text-2xl' : 'text-xl'}`"
              :style="`-webkit-line-clamp: ${rowContainer || sliderContainer || containerContainer || carouselContainer ? '1' : '2'};`"
            >
              {{ postContent.title }}
            </span>
            <span
              class="teaser-intro overflow-hidden"
              :style="`-webkit-line-clamp: ${rowContainer || sliderContainer || containerContainer || carouselContainer ? '2' : '3'};`"
            >
              {{ postContent.intro }}
            </span>
          </div>
          <span
            v-if="$route.name === 'blog'"
            class="text-date w-full mt-3 text-right text-sm font-semibold italic"
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
    }
  },
  data () {
    return {
      expanded: false,
      wait: true
    }
  },
  computed: {
    lookImage () {
      return this.postContent.file.filename ? !!(/(gif|jpe?g|tiff?|png|webp|bmp)/gi).test(this.postContent.file.filename.toLowerCase().split('.').pop()) : true
    },
    setFile () {
      return this.postContent.file.filename ? this.postContent.file.filename : 'https://a.storyblok.com/f/106240/4065x1468/5c83c3e7de/noimeageteaser.png'
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
        case 'jpg':
        case 'png':
        case 'gif':
        case 'svg':
          return 'img'
        case 'pdf':
          return 'embed'
      }
    }
  }
}
</script>
<style scoped>

.teaser-title, .teaser-intro{
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
