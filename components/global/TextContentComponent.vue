<template>
  <div
    :key="blok._uid"
    :class="`text-container
    ${$customClass('home', 'all', 'flex items-center my-0')}
    ${$customClass('home', blok.name === 'text_home_2', 'p-10 bg-red-500')}
    ${$customClass('about', 'all', 'flex items-center my-0')}
    ${$customClass('contact', 'all', 'col-start-2 col-end-2 bg-blue-400')}`"
  >
    <span
      :style="`color: ${blok.color.color}`"
      :class="`text-content mx-auto
      ${$customClass('home', 'all', 'flex items-center my-0 whitespace-nowrap')}
      ${$customClass('about', 'all', 'py-6 px-10 bg-yellow-300')}
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
