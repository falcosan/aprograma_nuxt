<template>
  <NuxtLink :to="projectLink" class="block w-9/12 mx-auto">
    <div> {{ projectContent.title }}</div>
    <img :src="projectContent.image.filename" :alt="projectContent.image.alt">
    <div> {{ projectContent.start_date }} {{ projectContent.end_date }}</div>
    <a :href="projectContent.project_url" />
  </NuxtLink>
</template>

<script>
export default {
  props: {
    projectContent: {
      type: Object,
      required: true
    },
    projectLink: {
      type: String,
      required: true
    }
  }
}
</script>
