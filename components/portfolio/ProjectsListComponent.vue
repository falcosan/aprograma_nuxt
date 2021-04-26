<template>
  <Slider
    v-if="sortedProject && (!$store.state.data.mobile || $store.state.data.windowWidth > 768)"
    :blok="sortedProject"
    :parent="$route.path"
  />
  <ul v-else class="project-list w-full grid gap-y-5">
    <ProjectTeaser
      v-for="project in sortedProject"
      :key="project._uid"
      :project-link="`portfolio/${project.slug}`"
      :project-content="project.content"
    />
  </ul>
</template>
<script>
import ProjectTeaser from './ProjectTeaserComponent'
export default {
  components: { ProjectTeaser },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    sortedProject () {
      const featuredProjects = this.$store.state.list.items.filter((project) => {
        return this.blok.projects.includes(project.uuid)
      })
      featuredProjects.sort((a, b) => {
        return this.blok.projects.indexOf(a.uuid) - this.blok.projects.indexOf(b.uuid)
      })
      return featuredProjects
    }
  }
}
</script>
