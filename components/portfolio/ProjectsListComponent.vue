<template>
  <ProjectSlider
    v-if="sortedProject && $store.state.data.windowWidth >= 1024 && blok.show_slider && !blok.row_container"
    :blok="sortedProject"
  />
  <ul v-else-if="sortedProject" :class="`project-list grid gap-5 auto-cols-fr ${blok.row_container ? 'lg:grid-cols-container md:auto-rows-fr' : 'md:grid-cols-2 lg:grid-cols-3 auto-rows-fr'}`">
    <ProjectTeaser
      v-for="project in sortedProject"
      :key="project._uid"
      :project-link="`portfolio/${project.slug}`"
      :project-content="project.content"
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
    }
  },
  computed: {
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
