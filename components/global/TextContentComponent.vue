<template>
  <div
    :class="`text-section
    ${$customClass('home', 'items-center flex my-0')}
    ${$customClass('about', 'items-center flex my-0')}
    ${$customClass('contact', 'h-full flex flex-1 m-0 items-center justify-center row-start-2 row- col-start-2 col-end-2 bg-blue-400')}`"
  >
    <span
      key="text-content"
      :class="`text-content mx-auto py-6 px-10
      ${$customClass('home', 'text-7xl')}
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
