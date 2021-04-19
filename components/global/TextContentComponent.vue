<template>
  <div
    :key="blok._uid"
    :style="`background-color: ${randomBackgroundColor};`"
    :class="`text-container
    ${$customClass('home', 'all', 'flex items-center my-0 p-10')}
    ${$customClass('about', 'all', 'flex items-center my-0')}
    ${$customClass('contact', 'all', 'col-start-2 col-end-2')}`"
  >
    <span
      :style="`color: ${randomTextColor};`"
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
  },
  data () {
    return {
      index: 0
    }
  },
  computed: {
    colors () {
      return this.blok.text_color.color.split('; ').map((text, background) => ({ text, background: this.blok.background_color.color.split('; ')[background] }))
    },
    randomTextColor () {
      return this.colors.length > 1 ? this.colors[this.index].text : this.colors[0].text
    },
    randomBackgroundColor () {
      return this.colors.length > 1 ? this.colors[this.index].background : this.colors[0].background
    }
  },
  created () {
    this.index = ~~(Math.random() * (this.colors.length - 0)) + 0
  }
}
</script>
