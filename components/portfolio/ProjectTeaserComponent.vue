<template>
  <li
    v-if="projectContent"
    class="project-teaser rounded-md overflow-hidden transform transition-all duration-200 hover:shadow hover:scale-105"
  >
    <NuxtLink :key="projectContent._uid" :to="projectLink" class="teaser-link">
      <div class="teaser-content h-full flex flex-col p-px" :style="`background-color: ${projectContent.teaser_background_color.color}; color: ${projectContent.teaser_text_color.color};`">
        <img :class="`project-image w-full object-cover object-center select-none rounded-t ${rowContainer && !sliderContainer && !containerContainer ? 'h-60 sm:h-72 md:h-60 lg:h-80 xl:h-96 2xl:h-sm' : 'h-full'}`" width="100%" height="100%" :src="projectContent.image.filename" :alt="projectContent.image.alt">
        <div
          :style="`background-color: ${projectContent.teaser_background_color.color};`"
          :class="`title-container flex flex-row flex-wrap items-center p-5 ${rowContainer || containerContainer || sliderContainer? '' : 'h-16'}`"
        >
          <span
            class="teaser-title min-w-0 overflow-hidden"
            :style="`-webkit-line-clamp: 1`"
          > {{ projectContent.title }}</span>
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: {
    projectContent: {
      type: Object,
      required: true
    },
    projectLink: {
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
    containerContainer: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      expanded: false
    }
  }
}
</script>
<style scoped>

.teaser-title{
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
