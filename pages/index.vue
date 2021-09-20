<template>
  <component
    :is="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
</template>
<script>
export default {
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  fetch () {
    const slug = (this.$route.path === '/' || this.$route.path === '') ? '/home' : this.$route.path
    return this.$storyapi
      .get(`cdn/stories${slug}`, {
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
  fetchDelay: 0,
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
