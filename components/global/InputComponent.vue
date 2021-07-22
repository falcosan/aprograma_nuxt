<template>
  <input
    v-if="blok"
    :id="`${blok.type}-input`"
    :class="`input cursor-pointer rounded hover:shadow transition-shadow duration-100 ${$themeColor(blok.background_color.color) ? 'text-white' : ''}`"
    :style="`background-color: ${blok.background_color.color};`"
    :type="blok.type"
    :value="blok.text"
    @click="blok.type === 'reset' ? $emit('resetInput') : false"
  >
  <input v-else :id="`${text}-input`" class="input cursor-pointer" :type="type" :value="text">
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
