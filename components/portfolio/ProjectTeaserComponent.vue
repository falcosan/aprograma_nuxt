<template>
  <NuxtLink :to="projectLink" class="block w-9/12 mx-auto">
    {{ projectContent.title }}
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
