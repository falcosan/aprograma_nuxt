<template>
  <li
    v-if="postContent"
    :class="`post-teaser overflow-hidden max-h-md rounded ${sliderContainer || carouselContainer || containerContainer ? 'max-w-2xl mx-auto my-0' : !$device.isDesktop ? '' : 'transform transition-all duration-200 hover:shadow hover:scale-105'}`"
  >
    <NuxtLink :to="postLink" class="teaser-link">
      <div
        :class="`teaser-content h-full flex flex-col ${rowContainer || sliderContainer || containerContainer || carouselContainer ? '' : 'lg:max-h-72 xl:max-h-56 lg:flex-row'}`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <div v-show="!wait" :class="`teaser-file w-full h-full max-h-full min-h-40 ${rowContainer || sliderContainer || containerContainer || carouselContainer ? '' : 'lg:w-1/2'} ${postContent.file.filename ? '' : 'bg-black'}`">
          <component
            :is="postContent.file.filename ? lookFile() : 'img'"
            :class="`w-full h-full object-center select-none ${postContent.file.filename ? 'object-cover' : 'pl-2.5 object-contain'}`"
            :alt="postContent.file.alt"
            :src="setFile"
            :width="lookImage || !postContent.file.filename ? '100%' : ''"
            :height="lookImage || !postContent.file.filename ? '100%' : ''"
            @load="wait = false"
            @loadeddata="wait = false"
          />
        </div>
        <Skeleton :class="`w-full h-full max-h-full min-h-40 ${rowContainer || sliderContainer || containerContainer || carouselContainer ? '' : 'lg:w-1/2'}`" :wait="wait" />
        <div :class="`teaser-text h-auto w-full flex flex-col p-5 ${rowContainer && !carouselContainer && !sliderContainer && !containerContainer ? '' : sliderContainer || carouselContainer || containerContainer ? '' : 'lg:w-1/2'} ${$route.name === 'blog' ? 'justify-between' : 'justify-center'}`" :style="`background-color: ${postContent.teaser_background_color.color}; color: ${postContent.teaser_text_color.color};`">
          <div class="text-description">
            <span
              :class="`teaser-title mb-2 overflow-hidden ${$route.name === 'blog' ? 'text-xl sm:text-2xl' : 'text-xl'}`"
              :style="`-webkit-line-clamp: ${rowContainer || sliderContainer || containerContainer || carouselContainer || $store.state.data.windowWidth < 1024 ? '1' : '2'};`"
            >
              {{ postContent.title }}
            </span>
            <span
              class="teaser-intro overflow-hidden"
            >
              {{ postContent.intro }}
            </span>
          </div>
          <div :class="`teaser-info w-full flex flex-col xx:flex-row mt-5 italic items-end ${$route.name === 'blog' ? 'justify-between' : 'justify-end'}`">
            <ul class="teaser-categories flex flex-wrap self-start -m-1.5">
              <li v-for="(category, index) in postContent.categories" :key="index" :class="`teaser-category text-xs p-2.5 m-1.5 font-extralight rounded shadow-sm filter brightness-95 transition-shadow ${!$device.isDesktop ? '' : ' hover:shadow'}`" :style="`background-color: ${postContent.teaser_background_color.color};`">
                {{ $languageCase(category.split(', ')[0],category.split(', ')[1],category.split(', ')[2] ) }}
              </li>
            </ul>
            <span
              v-if="$route.name === 'blog'"
              class="teaser-date flex-none self-end pt-2.5 pl-2.5 text-sm font-medium text-right"
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
.teaser-intro{
  display: -webkit-box;
  -webkit-line-clamp:  2;
  -webkit-box-orient: vertical;
}
.teaser-title{
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
