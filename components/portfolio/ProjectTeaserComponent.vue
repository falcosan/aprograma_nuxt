<template>
  <li
    v-if="projectContent"
    class="project-teaser"
  >
    <NuxtLink :key="projectContent._uid" :to="projectLink" class="teaser-link md:grid">
      <div class="teaser-content w-full h-full flex flex-col justify-center relative p-px" :style="`background-color: ${projectContent.teaser_background_color.color}; color: ${projectContent.teaser_text_color.color};`">
        <img :class="`project-image w-full${projectContent.relevant ? ' h-60 sm:h-80' : ' h-40 sm:h-48' } object-cover`" :src="projectContent.image.filename" :alt="projectContent.image.alt">
        <span
          :style="`background-color: ${projectContent.teaser_background_color.color};`"
          class="teaser-title w-full flex items-center justify-center p-3 text-base sm:text-lg"
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
