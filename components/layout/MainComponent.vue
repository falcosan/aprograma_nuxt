<template>
  <main
    class="p-6 w-9/12 my-0 mx-auto"
  >
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
