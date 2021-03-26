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
  asyncData(context) {
    return context.app.$storyapi
      .get(`cdn/stories/home`, {
        version: 'published',
      })
      .then((res) => {
        return res.data
      })
      .catch(() => {
        context.$errorMessage(context)
      })
  },
}
</script>