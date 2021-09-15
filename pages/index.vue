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
    const slug = (context.route.path === '/' || context.route.path === '') ? '/home' : context.route.path
    return context.app.$storyapi
      .get(`cdn/stories${slug}`, {
        language: context.store.state.language.language
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          'Sorry but this content doesn\'t extist', `Sorry, but the content called: "${context.route.name}" has a problem or doesn't exist`
        )
      })
  },
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
