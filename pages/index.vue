<template>
  <component
    :is="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
</template>
<script>
import { createStorage } from 'unstorage'
import localStorageDriver from 'unstorage/drivers/localstorage'

const storage = createStorage({
  driver: localStorageDriver({ base: 'app:' })
})
export default {
  async asyncData (context) {
    console.log(await storage.getItem('foo:bar'))
    const slug = (context.route.path === '/' || context.route.path === '') ? '/home' : context.route.path
    return context.app.$storyapi
      .get(`cdn/stories${slug}`, {
        language: context.store.state.language.language
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.$errorMessage(res.response,
          'Sorry but this content doesn\'t exist', `Sorry, but the content called: "${context.route.name}" has a problem or doesn't exist`
        )
      })
  },
  watch: {
    '$store.state.language.language' () { this.$nuxt.refresh() }
  }
}
</script>
