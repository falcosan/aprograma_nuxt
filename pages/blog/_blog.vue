<template>
  <section>
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </section>
</template>
<script>
import Post from '@/components/blog/PostComponent'
export default {
  components: { Post },
  asyncData (context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.route.path}`)
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        context.$errorMessage(res.response,
          `Sorry but the post called ${context.route.path.substring(
            context.route.path.lastIndexOf('/') + 1
          )} doesn't extist`, `Sorry, but the post called: "${context.route.path.substring(
          context.route.path.lastIndexOf('/') + 1)}" has a problem or doesn't exist`
        )
      })
  },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },
  fetch () {
    this.$store.dispatch('data/updateData', this.$route.path)
    this.$store.dispatch('list/addItems', 'blog')
  },
  head () {
    return {
      title: `${this.story.name} - aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Blog with last news of aprograma'
        }
      ]
    }
  },
  watch: {
    '$store.state.data.language': '$fetch'
  }
}
</script>
