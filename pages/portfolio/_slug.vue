<template>
  <Project :blok="story.content" />
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
export default {
  components: { Project },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.store.state.data.language}/portfolio/${context.params.slug}`)
      .then((res) => {
        return res.data
      })
  },
  watch: {
    '$store.state.data.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
