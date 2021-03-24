<template>
  <Nuxt v-if="blok.view"/>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
}
</script>