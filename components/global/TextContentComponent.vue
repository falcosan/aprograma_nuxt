<template>
  <div
    :class="`text-section text-${customTextSection}`"
  >
    <span :class="`text-content ${customTextContent} h-min-content mx-auto py-6 px-10`" v-html="getText" />
  </div>
</template>
<script>
import marked from 'marked'
import DOMPurify from 'dompurify'
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    getText () {
      return DOMPurify.sanitize(marked(this.blok.text))
    },
    customTextSection  () {
      return this.$customClass(
        'about',
        'about h-full-adapted items-center flex my-0'
      )
    },
    customTextContent  () {
      return this.$customClass(
        'about',
        'bg-yellow-300'
      )
    }
  }
}
</script>
