<template>
  <Slider
    v-if="sortedProject"
    :blok="sortedProject"
    :parent="$route.path"
  />
</template>
<script>
export default {
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
