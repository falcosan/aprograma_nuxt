<template>
  <Project v-if="!$fetchState.pending" :blok="story.content" />
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
export default {
  components: { Project },
  asyncData (context) {
    console.log(context)
  },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  async fetch () {
    const { data } = await this.$storyapi.get(`cdn/stories${this.$route.path}`, {
      language: this.$store.state.language.language
    })
    this.story = data.story
  },
  head () {
    return {
      title: `Aprograma - ${this.story.name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.story.name} project`
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${location.protocol + '//' + location.host}${this.$route.path}`
        }
      ]
    }
  },
  watch: {
    '$store.state.language.language': '$fetch'
  }
}
</script>
