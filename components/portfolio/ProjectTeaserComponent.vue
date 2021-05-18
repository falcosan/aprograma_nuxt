<template>
  <li
    v-if="projectContent"
    class="project-teaser"
  >
    <NuxtLink :key="projectContent._uid" :to="projectLink" class="teaser-link">
      <div class="teaser-content h-full flex flex-col p-px" :style="`background-color: ${projectContent.teaser_background_color.color}; color: ${projectContent.teaser_text_color.color};`">
        <img class="project-image w-full h-full ss:h-72 sm:h-80 md:h-56 lg:h-80 xl:h-64 2xl:h-96 object-cover select-none" :src="projectContent.image.filename" :alt="projectContent.image.alt">
        <span
          :style="`background-color: ${projectContent.teaser_background_color.color};`"
          class="teaser-title w-full p-5 md:truncate text-base sm:text-lg"
        >
          {{ projectContent.title }}
        </span>
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
    }
  },
  data () {
    return {
      expanded: false
    }
  }
}
</script>
