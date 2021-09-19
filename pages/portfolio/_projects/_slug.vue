<template>
  <Project v-if="!$fetchState.pending" :blok="story.content" />
</template>
<script>
import Project from '@/components/portfolio/ProjectComponent'
export default {
  components: { Project },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  fetchDelay: 0,
  async fetch () {
    const { data } = await this.$storyapi.get(`cdn/stories${this.$route.path}`, {
      language: this.$store.state.language.language
    })
    this.story = data.story
  },

  async head () {
    return {
      title: `${this.story.content.title} - Aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.story.content.title
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.story.content.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Take a peek!'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: await this.story.content.image.filename
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${this.$config.projectPath}${this.$route.path}`
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: this.$config.projectPath
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.story.content.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Take a peek!'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: await this.story.content.image.filename
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.projectPath}${this.$route.path}`
        }
      ]
    }
  },
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
