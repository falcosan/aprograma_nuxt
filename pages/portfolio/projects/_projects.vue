<template>
  <section>
    <Project :blok="story.content" />
  </section>
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
export default {
  components: { Project },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/portfolio/${context.route.slug}`)
      .then((res) => {
        return res.data
      })
  }
}
</script>
