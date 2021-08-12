<template>
  <li
    v-if="projectContent"
    :class="`project-teaser w-full h-full overflow-hidden rounded ${sliderContainer || carouselContainer || containerContainer ? '' : !$device.isDesktop ? '' : 'transform transition-all duration-200 hover:shadow hover:scale-105'}`"
  >
    <NuxtLink :key="projectContent._uid" :to="projectLink" class="teaser-link">
      <div class="teaser-content h-full flex flex-col p-px" :style="`background-color: ${projectContent.teaser_background_color.color}; color: ${projectContent.teaser_text_color.color};`">
        <nuxt-img
          :modifiers="{ smart: true }"
          class="project-image w-full h-5/6 max-h-sm object-cover object-center select-none rounded-t"
          width="auto"
          height="auto"
          :src="projectContent.image.filename"
          :alt="projectContent.image.alt"
        />
        <div
          :style="`background-color: ${projectContent.teaser_background_color.color};`"
          class="title-container h-1/6 flex flex-row flex-wrap items-center px-5"
        >
          <span
            class="teaser-title min-w-0 overflow-hidden"
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
    carouselContainer: {
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
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
