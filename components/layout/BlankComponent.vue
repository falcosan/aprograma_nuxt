<template>
  <div class="blank-space rounded" :style="`height: ${blok.height}`" />
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
