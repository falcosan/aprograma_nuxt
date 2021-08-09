<template>
  <input
    v-if="blok"
    :id="`${blok.type}-input`"
    :class="`input cursor-pointer rounded py-3 px-4 font-extralight ${!$device.isDesktop ? '' : 'hover:opacity-80 transition-opacity duration-100'} ${$themeColor(blok.background_color.color) ? 'text-white' : ''}`"
    :style="`background-color: ${blok.background_color.color};`"
    :type="blok.type"
    :value="blok.text"
    @click="blok.type === 'reset' ? $emit('resetInput') : ''"
  >
  <input v-else :id="`${text}-input`" class="input cursor-pointer font-extralight" :type="type" :value="text">
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
