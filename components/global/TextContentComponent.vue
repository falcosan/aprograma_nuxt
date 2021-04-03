<template>
  <div
    :class="`text-section text-${$customClass('about', 'h-full-adapted items-center flex my-0')}`"
  >
    <span
      :class="`text-content ${$customClass('about', 'bg-yellow-300')} h-min-content mx-auto py-6 px-10`"
      v-html="getText"
    />
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
    }
  }
}
</script>
