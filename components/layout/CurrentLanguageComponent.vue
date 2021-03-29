<template>
  <span class="w-full h-10 cursor-pointer">
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
