<template>
  <component
    :is="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
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
  fetch () {
    return this.$storyapi
      .get(`cdn/stories${this.$route.path}`, {
        language: this.$store.state.language.language
      }).then((res) => {
        this.story = res.data.story
      }).catch((res) => {
        if (!res) {
          this.error({
            statusCode: 404,
            message: 'Sorry but this content doesn\'t exist'
          })
        } else {
          this.error({
            statusCode: 500,
            message: `Sorry, but the content called: "${this.$route.name}" has a problem or doesn't exist`
          })
        }
      })
  },

  head () {
    return {
      title: this.story.content.title ? `${this.story.content.title} - Aprograma` : false,
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
          hid: 'og:url',
          property: 'og:url',
          content: `${this.$config.projectPath}${this.$route.path}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.story.content.file ? this.story.content.file.filename : false
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
          content: this.story.content.file ? this.story.content.file.filename : false
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
    '$store.state.language.language': '$fetch'
  }
}
</script>
