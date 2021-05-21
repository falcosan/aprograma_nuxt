<template>
  <component
    :is="story.content.component"
    v-if="story.content.component && !$fetchState.pending"
    :key="story.content._uid"
    :blok="story.content"
  />
  <div v-else class="loading h-screen" />
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
export default {
  components: { Project },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories${context.route.path}`, {
        language: context.store.state.language.language
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          `Sorry but this project: ${context.route.name} doesn't extist`, `Sorry, but this project: "${context.route.name}" has a problem or doesn't exist`
        )
      })
  },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  async fetch () {
    this.$store.dispatch('list/projects/addProjects', this.$route.name)
    this.$pageState(this.$route.path)
    const { data } = await this.$storyapi.get(`cdn/stories${this.$route.path}`, {
      language: this.$store.state.language.language
    })
    this.story = data.story
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
    '$store.state.language.language': '$fetch'
  }
}
</script>
