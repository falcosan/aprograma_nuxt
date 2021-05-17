<template>
  <ProjectSlider
    v-if="sortedProject && ($store.state.data.windowWidth >= 1024 && $device.isDesktop)"
    :blok="sortedProject"
  />
  <ul v-else-if="sortedProject" class="project-list w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
