<template>
  <div
    :key="blok._uid"
    :style="`background-color: ${blok.background_color.color};`"
    :class="`text-container
    ${$customClass('home', 'all', 'flex items-center my-0 p-10')}
    ${$customClass('about', 'all', 'flex items-center my-0')}
    ${$customClass('contact', 'all', 'col-start-2 col-end-2')}`"
  >
    <span
      :style="`color: ${blok.text_color.color};`"
      :class="`text-content mx-auto
      ${$customClass('home', 'all', 'flex items-center my-0 whitespace-nowrap')}
      ${$customClass('about', 'all', 'py-6 px-10')}
      ${$customClass('contact', 'all', 'w-full h-full py-6 px-10 grid')}`"
      v-html="blok.text.content"
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
  }
}
</script>
