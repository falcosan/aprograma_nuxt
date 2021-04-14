<template>
  <main
    class="w-9/12 h-screen my-0 mx-auto flex"
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
