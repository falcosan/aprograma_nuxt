<template>
  <transition-group
    tag="div"
    appear
    appear-active-class="transition-opacity duration-200 out-in"
    appear-class="opacity-0"
    :class="`text-section ${$customClass('about', 'h-full-adapted items-center flex my-0')} ${$customClass('home', 'h-full-adapted items-center flex my-0')}`"
  >
    <span
      key="text-content"
      :class="`text-content ${$customClass('about', 'bg-yellow-300')} ${$customClass('home', 'text-7xl')} h-min-content mx-auto py-6 px-10`"
      v-html="getText"
    />
  </transition-group>
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
