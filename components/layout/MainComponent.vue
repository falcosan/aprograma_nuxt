<template>
  <Nuxt v-if="content.view"/>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
}
</script>