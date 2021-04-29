<template>
  <Project :blok="story.content" />
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
export default {
  components: { Project },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.store.state.language.language}${context.route.path}`)
      .then((res) => {
        return res.data
      })
  },
  watch: {
    '$store.state.language.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
