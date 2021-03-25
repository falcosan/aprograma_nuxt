<template>
  <p
    class="about_text absolute w-1/2 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-300 py-6 px-10 text-5xl"
  >
    {{ blok.text }}
  </p>
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
