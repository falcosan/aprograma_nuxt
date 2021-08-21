<template>
  <li
    v-if="projectContent"
    :class="`project-teaser w-full h-screen overflow-hidden rounded ${maxSize}`"
  >
    <NuxtLink :key="projectContent._uid" :to="projectLink" class="teaser-link">
      <div class="teaser-content h-full flex flex-col p-px" :style="`background-color: ${projectContent.teaser_background_color.color ? projectContent.teaser_background_color.color : '#e0e0e0'}; color: ${projectContent.teaser_text_color.color};`">
        <NuxtImg
          class="project-image w-full h-4/5 object-cover object-center select-none rounded-t"
          format="webp"
          :modifiers="{ filters: { focal: projectContent.image.focus ? projectContent.image.focus : 0 } }"
          :src="projectContent.image.filename"
          :alt="projectContent.image.alt"
          sizes="xs:299px sm:380px md:514px lg:619px xl:820"
        />
        <div
          :style="`background-color: ${projectContent.teaser_background_color.color ? projectContent.teaser_background_color.color : '#e0e0e0'};`"
          class="title-container h-1/5 flex flex-row flex-wrap items-center px-5 py-1.5"
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
    maxSize () {
      if (this.sliderContainer) {
        if (this.containerWidth <= 240) {
          return 'max-h-56'
        } else if (this.containerWidth <= 280) {
          return 'max-h-64'
        } else if (this.containerWidth <= 320) {
          return 'max-h-72'
        } else if (this.containerWidth <= 375) {
          return 'max-h-80'
        } else {
          return 'max-h-96'
        }
      } else {
        return 'max-h-60 xx:max-h-72 xs:max-h-80 sm:max-h-96 md:max-h-72 lg:max-h-80 xl:max-h-96'
      }
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
