<template>
  <li
    v-if="projectContent"
    class="project-teaser w-full h-full overflow-hidden rounded"
  >
    <NuxtLink :key="projectContent._uid" :to="projectLink" class="teaser-link">
      <div class="teaser-content h-full flex flex-col justify-end pt-0.5" :style="`background-color: ${$binaryControl(projectContent.background_color, 'color', '#e0e0e0')}; color: ${$binaryControl(projectContent.text_color, 'color')};`">
        <NuxtImg
          class="project-image h-full w-full object-cover object-center select-none rounded-t"
          format="webp"
          :modifiers="{ filters: { focal: projectContent.image.focus ? projectContent.image.focus : 0 } }"
          :src="projectContent.image.filename"
          :alt="projectContent.image.alt"
          :fit="projectContent.image.focus ? null : 'in'"
          width="340"
          height="306"
          sizes="xs:299px sm:380px md:514px lg:711px xl:804px"
        />
        <div
          :style="`background-color: ${$binaryControl(projectContent.background_color, 'color', '#e0e0e0')};`"
          class="title-container w-full flex flex-row items-center p-5"
        >
          <span
            class="teaser-title block overflow-hidden whitespace-nowrap text-ellipsis"
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
  }
}
</script>
<style scoped>
.project-image{
    transform: scaleX(1.001);
}
</style>
