<template>
  <div
    :key="blok._uid"
    :class="`text-container
    ${$customClass('home', 'all', 'flex items-center my-0')}
    ${$customClass('about', 'all', 'flex items-center my-0')}
    ${$customClass('contact', 'all', 'col-start-2 col-end-2 bg-blue-400')}`"
  >
    <span
      :class="`text-content bg-gray-700mx-auto
      ${$customClass('home', 'all', 'flex items-center my-0 whitespace-nowrap')}
      ${$customClass('about', 'all', 'py-6 px-10 bg-yellow-300')}
      ${$customClass('contact', 'all', 'w-full h-full py-6 px-10 grid text-white')}`"
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
  },
  data () {
    return {
      name: this.blok.name
    }
  }
}
</script>
