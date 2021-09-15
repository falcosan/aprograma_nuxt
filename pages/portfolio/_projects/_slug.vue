<template>
  <Project :blok="story.content" />
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
      })
  },
  head () {
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
          content: this.story.content.image.filename
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${this.$config.projectPath}${this.$route.path}`
        },
        { name: 'twitter:site', content: '@danielefalche' },
        { name: 'twitter:card', content: 'summary_large_image' },
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
          content: this.story.content.image.filename
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
