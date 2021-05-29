<template>
  <li
    v-if="projectContent"
    class="project-teaser relative z-10"
  >
    <NuxtLink :key="projectContent._uid" :to="projectLink" class="teaser-link">
      <div class="teaser-content h-full flex flex-col p-px" :style="`background-color: ${projectContent.teaser_background_color.color}; color: ${projectContent.teaser_text_color.color};`">
        <img :class="`project-image w-full object-cover object-center select-none ${$parent.blok.row_container && rowContainer.every(item => item.row_container) ? 'h-60 sm:h-72 md:h-60 lg:h-80 xl:h-96 2xl:h-sm' : 'h-full'}`" width="100%" height="100%" :src="projectContent.image.filename" :alt="projectContent.image.alt">
        <div
          :style="`background-color: ${projectContent.teaser_background_color.color};`"
          class="title-container flex flex-row flex-wrap p-5 text-lg"
        >
          <span :class="`title-teaser ${$route.name === 'portfolio' ? 'md:min-w-0 md:truncate' : 'min-w-0 truncate'}`"> {{ projectContent.title }}</span>
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
      type: Array,
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
