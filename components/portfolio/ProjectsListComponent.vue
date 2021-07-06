<template>
  <ProjectSlider
    v-if="sortedProject && $store.state.data.windowWidth >= 1024 && blok.show_slider && !blok.row_container"
    :blok="sortedProject"
  />
  <ul v-else-if="sortedProject" :class="`project-list grid gap-5 auto-cols-fr ${blok.row_container && parentRow ? 'md:auto-rows-max' : 'md:grid-cols-big auto-rows-fr'}`">
    <ProjectTeaser
      v-for="project in sortedProject"
      :key="project.uuid"
      :project-link="`portfolio/${project.slug}`"
      :project-content="project.content"
      :row-container="parentRow && blok.row_container"
    />
  </ul>
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
    containerMode: {
      type: Boolean,
      default: false
    },
    sliderMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    parentRow () {
      return !!(this.containerMode || this.sliderMode)
    },
    sortedProject () {
      const featuredProjects = this.$store.state.list.projects.items.filter((project) => {
        return this.blok.projects.includes(project.uuid)
      })
      featuredProjects.sort((a, b) => {
        return this.blok.projects.indexOf(a.uuid) - this.blok.projects.indexOf(b.uuid)
      })
      return featuredProjects
    }
  },
  created () {
    if (this.$route.name !== 'portfolio') {
      this.getProjects()
    }
  },
  beforeDestroy () {
    this.$store.dispatch('list/projects/deleteProjects')
  },
  methods: {
    async getProjects () {
      await this.$store.dispatch('list/projects/addProjects')
    }
  }
}
</script>
