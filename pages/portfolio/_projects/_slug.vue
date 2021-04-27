<template>
  <Project :blok="story.content" />
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
export default {
  components: { Project },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/portfolio/${context.params.projects}`)
      .then((res) => {
        return res.data
      })
  }
}
</script>
