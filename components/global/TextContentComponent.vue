<template>
  <div
    :key="blok._uid"
    :style="`background-color: ${randomBackgroundColor};`"
    :class="`text-container
    ${$customClass('home', 'all', 'flex items-center my-0')}
    ${$customClass('home', blok.name === 'text_home_2', 'p-10')}
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
  computed: {
    randomTextColor () {
      return this.blok.text_color.color.split(' ').length > 1 ? this.blok.text_color.color.split(' ')[this.colorUpdate(this.blok.text_color.color.split(' ').length)] : this.blok.text_color.color.split(' ')[0]
    },
    randomBackgroundColor () {
      return this.blok.background_color.color.split(' ').length > 1 ? this.blok.background_color.color.split(' ')[this.colorUpdate(this.blok.background_color.color.split(' ').length)] : this.blok.background_color.color.split(' ')[0]
    }
  },
  methods: {
    colorUpdate (max) {
      return Math.floor(Math.random() * (max - 0)) + 0
    }
  }
}
</script>
