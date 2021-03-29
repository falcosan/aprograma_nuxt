<template>
  <span class="w-full h-10 cursor-pointer rounded-r-full">
    {{ blok.language }}
  </span>
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
