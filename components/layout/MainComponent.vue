<template>
  <main>
    <Nuxt v-if="blok.view" />
  </main>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
