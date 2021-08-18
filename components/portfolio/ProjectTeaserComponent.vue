<template>
  <li
    v-if="projectContent"
    class="project-teaser w-full h-full max-h-sd overflow-hidden rounded"
  >
    <NuxtLink :key="projectContent._uid" :to="projectLink" class="teaser-link">
      <div class="teaser-content h-full flex flex-col p-px" :style="`background-color: ${projectContent.teaser_background_color.color}; color: ${projectContent.teaser_text_color.color};`">
        <NuxtImg
          :modifiers="{ filters: { focal: projectContent.image.focus ? projectContent.image.focus : 0 } }"
          class="project-image w-full h-5/6 object-cover object-center select-none rounded-t"
          :src="projectContent.image.filename"
          :alt="projectContent.image.alt"
          sizes="xs:299 sm:380 md:514 lg:619 xl:711 2xl:804 3xl:883"
        />
        <div
          :style="`background-color: ${projectContent.teaser_background_color.color};`"
          class="title-container h-1/6 flex flex-row flex-wrap items-center px-5"
        >
          <span
            class="teaser-title min-w-0 overflow-hidden font-extralight"
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
