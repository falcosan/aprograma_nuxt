<template>
  <Post :blok="story.content" />
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  transition: {
    beforeEnter (el) {
      el.style.opacity = '0'
      el.style.transition = '0.4s opacity ease'
    },
    enter (el, done) {
      el.style.opacity = '1'
      done()
    },
    beforeLeave (el) {
      el.style.opacity = '0'
      el.style.transition = '0.4s opacity ease'
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
      })
  },
  head () {
    return {
      title: `${this.story.name} - Aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.story.name} post`
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
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
