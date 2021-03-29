<template>
  <section>
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </section>
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
export default {
  components: { Project },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.route.path}`)
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        context.$errorMessage(res.response,
          `Sorry but the project called ${context.route.path.substring(
            context.route.path.lastIndexOf('/') + 1
          )} doesn't extist`, `Sorry, but the project called: "${context.route.path.substring(
          context.route.path.lastIndexOf('/') + 1)}" has a problem or doesn't exist`
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
    this.$store.dispatch('data/updateData', this.$route.path)
    const languageProject = this.$store.state.data.language === '' ? '[default]/portfolio' : `${this.$store.state.data.language}/portfolio`
    const listProjects = await this.$storyapi.get('cdn/stories', {
      starts_with: languageProject
    })
    this.$store.commit('portfolio/setProjects', listProjects.data.stories)
  },
  head () {
    return {
      title: `${this.story.name} - aprograma`,
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
    '$store.state.data.language': '$fetch'
  }
}
</script>
