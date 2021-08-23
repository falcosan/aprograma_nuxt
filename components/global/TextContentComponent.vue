<template>
  <div
    v-if="blok.text"
    :key="blok._uid"
    :style="`background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`"
    class="text-container w-full max-w-full h-full flex flex-col rounded"
  >
    <div
      :class="`text-content markdown block max-w-none rounded ${!blok.remove_space ? 'p-5' : ''}`"
      v-html="$md.render(blok.text)"
    />
  </div>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.$markdownRules()
  }
}
</script>
