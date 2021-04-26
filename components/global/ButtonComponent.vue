<template>
  <input class="button cursor-pointer" :style="`background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`" :type="blok.type" :value="blok.text">
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
