<template>
  <div class="blank-space" :style="`height: ${blok.height}`" />
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
