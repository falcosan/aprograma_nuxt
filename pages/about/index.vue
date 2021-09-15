<template>
  <component
    :is="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
</template>
<script>
export default {
  transition: {
    beforeEnter (el) {
      el.style.opacity = '0'
      el.style.transition = '0.5s opacity ease'
    },
    enter (el, done) {
      el.style.opacity = '1'
      done()
    },
    beforeLeave (el) {
      el.style.opacity = '0'
      el.style.transition = '0.5s opacity ease'
    },
    leave (el, done) {
      el.style.opacity = '1'
      done()
    }
  },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories${context.route.path}`, {
        language: context.store.state.language.language
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          'Sorry but this content doesn\'t extist', `Sorry, but this content "${context.route.name}" has a problem or doesn't exist`
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
          content: 'About the Aprograma project'
        }
      ]
    }
  },
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
