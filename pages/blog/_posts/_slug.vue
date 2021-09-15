<template>
  <Post :blok="story.content" />
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
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
          hid: 'og:image',
          property: 'og:image',
          content: this.story.content.file.filename
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.story.content.intro
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${this.$config.projectPath}${this.$route.path}`
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
