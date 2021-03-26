<template>
  <span :class="`text text-${customClass}`" v-html="getText" />
</template>
<script>
import marked from "marked";
import DOMPurify from "dompurify";
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    customClass() {
      return this.$customClass(
        'about',
        'about absolute w-1/2 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-300 py-6 px-10'
      )
    },
    getText() {
      return DOMPurify.sanitize(marked(this.blok.text))
    },
  },
}
</script>
