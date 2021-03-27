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
export default {
  asyncData (context) {
    return context.app.$storyapi
      .get('cdn/stories/home', {
        version: 'published'
      })
      .then((res) => {
        return res.data
      })
      .catch(() => {
        context.$errorMessage('404')
      })
  },
  head () {
    return {
      title: `${this.story.name} - aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page of aprograma website'
        }
      ]
    }
  }
}
</script>
