<template>
  <input v-if="blok" :class="`input cursor-pointer ${$themeColor(blok.background_color.color) ? 'text-white' : ''}`" :style="`background-color: ${blok.background_color.color};`" :type="blok.type" :value="blok.text">
  <input v-else class="input cursor-pointer" :type="type" :value="text">
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
