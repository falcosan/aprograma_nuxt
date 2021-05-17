<template>
  <ProjectSlider
    v-if="sortedProject && ($store.state.data.windowWidth >= 1024 && $device.isDesktop) && blok.show_slider"
    :blok="sortedProject"
  />
  <ul v-else-if="sortedProject" :class="`project-list w-full grid ${projectGrid} gap-5`">
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
  data () {
    return {
      width: Number
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
    },
    projectGrid () {
      if (this.width >= 1536) {
        return 'grid-cols-5'
      } else if (this.width >= 1280) {
        return 'grid-cols-4'
      } else if (this.width >= 1024) {
        return 'grid-cols-3'
      } else if (this.width >= 640) {
        return 'grid-cols-2'
      }
      return 'grid-cols-1'
    }
  },
  watch: {
    '$store.state.data.windowWidth': { handler () { this.projectWidth() } }
  },
  created () {
    if (this.$route.name !== 'portfolio') {
      this.getProjects()
    }
  },
  beforeDestroy () {
    this.$store.dispatch('list/projects/deleteProjects')
  },
  mounted () {
    this.projectWidth()
  },
  methods: {
    async getProjects () {
      await this.$store.dispatch('list/projects/addProjects')
    },
    projectWidth () {
      this.$nextTick(function () {
        this.width = this.$el.clientWidth
      })
    }
  }
}
</script>
