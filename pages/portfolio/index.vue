<template>
  <component
    :is="story.content.component"
    v-if="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
export default {
  components: { Project },
  asyncData (context) {
    context.store.dispatch('list/addItems', context.route.name)
    return context.app.$storyapi
      .get(`cdn/stories/${context.store.state.language.language}${context.route.path}`)
      .then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          `Sorry but the project called ${context.route.name} doesn't extist`, `Sorry, but the project called: "${context.route.name}" has a problem or doesn't exist`
        )
      })
  },
  head () {
    return {
      title: `${this.story.name} - Aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Projects make experience'
        }
      ]
    }
  },
  watch: {
    '$store.state.language.language': { handler () { this.$nuxt.refresh() } }
  }
}
</script>
