<template>
  <li
    v-if="projectContent"
    :class="`project-teaser w-full md:w-1/2 xl:w-1/3 p-2`"
  >
    <NuxtLink :key="projectContent._uid" :to="projectLink" class="teaser-link">
      <div class="teaser-content grid p-px" :style="`background-color: ${projectContent.teaser_background_color.color}; color: ${projectContent.teaser_text_color.color};`">
        <img class="project-image w-full h-60 sm:h-72 object-cover" :src="projectContent.image.filename" :alt="projectContent.image.alt">
        <span
          :style="`background-color: ${projectContent.teaser_background_color.color};`"
          class="teaser-title w-full p-5 truncate text-base sm:text-lg"
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
  },
  methods: {

  }
}
</script>
