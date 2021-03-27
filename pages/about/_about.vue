<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    />
  </section>
</template>
<script>
export default {
  head() {
    return {
      title: `${this.story.name} - aprograma`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About the aprograma project',
        },
      ],
    }
  },
  asyncData(context) {
    return context.app.$storyapi
      .get(`cdn/stories/${context.route.path}`, {
        version: 'published',
      })
      .then((res) => {
        return res.data
      })
      .catch(() => {
        context.$errorMessage('404')
      })
  },
}
</script>