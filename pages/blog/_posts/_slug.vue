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
      }).catch((res) => {
        context.$errorMessage(res.response,
          'Sorry but this content doesn\'t exist', `Sorry, but the content called: "${context.route.name}" has a problem or doesn't exist`
        )
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
          content: this.story.content.intro
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.story.content.file.filename
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
