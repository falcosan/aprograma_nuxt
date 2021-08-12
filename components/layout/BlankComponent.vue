<template>
  <div class="blank-space" :style="`height: ${blok.height}${blok.unit};`" />
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
