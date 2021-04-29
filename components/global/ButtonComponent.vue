<template>
  <input v-if="blok" class="button cursor-pointer" :style="`background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`" :type="blok.type" :value="blok.text">
  <input v-else class="button cursor-pointer" :type="type" :value="text">
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    type: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
