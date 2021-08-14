<template>
  <div v-if="sortedProject.length > 0" class="projects w-full">
    <h1
      v-if="blok.title"
      :class="`projects-title break-words ${sliderMode || carouselMode || containerMode ? 'm-5 text-xl' : 'mb-5 text-xl xs:text-2xl'}`"
      :style="`color: ${blok.title_color.color};`"
    >
      {{ blok.title }}
    </h1>
    <ProjectSlider
      v-if="$store.state.data.windowWidth > 1024 && blok.show_slider && !blok.row_container && sortedProject.length > 2 && !sliderMode"
      :blok="sortedProject"
    />
    <ul v-else :class="`project-list w-full grid gap-5 auto-cols-fr auto-rows-fr ${maxProjects}`">
      <ProjectTeaser
        v-for="project in sortedProject"
        :key="project.uuid"
        :project-link="`portfolio/${project.slug}`"
        :project-content="project.content"
        :row-container="blok.row_container"
        :slider-container="sliderMode"
        :carousel-container="carouselMode"
        :container-container="containerMode"
      />
    </ul>
  </div>
</template>
<script>
import ProjectSlider from './ProjectSliderComponent'
import ProjectTeaser from './ProjectTeaserComponent'
export default {
  components: { ProjectSlider, ProjectTeaser },
  props: {
    blok: {
      type: Object,
      required: true
    },
    containerWidth: {
      type: Number,
      default: 0
    },
    containerMode: {
      type: Boolean,
      default: false
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maxProjects () {
      if (this.containerWidth >= 536) {
        return 'md:grid-cols-fit-medium lg:grid-cols-fit-big'
      } return this.containerWidth >= 354 ? 'md:grid-cols-fit-medium' : this.sliderMode ? 'sm:grid-cols-fit-small' : 'sm:grid-cols-fit-small md:grid-cols-fit-medium'
    },
    sortedProject () {
      const featuredProjects = this.$store.state.list.projects.items.filter((project) => {
        return this.blok.projects.includes(project.uuid)
      })
      featuredProjects.sort((a, b) => {
        return this.blok.projects.indexOf(a.uuid) - this.blok.projects.indexOf(b.uuid)
      })
      return this.$route.name === 'portfolio' ? featuredProjects.reverse() : featuredProjects
    }
  },
  created () {
    if (this.$route.name !== 'portfolio') {
      this.getProjects()
    }
  },

  methods: {
    async getProjects () {
      await this.$store.dispatch('list/projects/addProjects')
    }
  }
}
</script>
