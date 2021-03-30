<template>
  <ul class="flex flex-row flex-wrap">
    <li v-for="project in sortedProject" :key="project._uid" class="flex-1 max-w-sm">
      <ProjectTeaser
        v-if="project.content"
        :project-link="`portfolio/${project.slug}`"
        :project-content="project.content"
      />
    </li>
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
