<template>
  <div
    :class="`text-container
    ${$customClass('index', 'items-center flex my-0')}
    ${$customClass('about', 'items-center flex my-0')}
    ${$customClass('contact', 'h-full row-start-2 row-end-2 col-start-2 col-end-2 bg-blue-400')}`"
  >
    <span
      key="text-content"
      :class="`text-content mx-auto py-6 px-10
      ${$customClass('index', 'text-7xl')}
      ${$customClass('about', 'bg-yellow-300')}
      ${$customClass('contact', 'w-full h-full grid text-white')}`"
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
