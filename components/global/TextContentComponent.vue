<template>
  <div
    :key="blok._uid"
    :style="`background-color: ${randomBackgroundColor};`"
    :class="`text-container w-auto
    ${customClass('home', 'all', 'my-0 p-5 sm:p-10')}
    ${customClass('home', blok.name === 'text_home_1', 'md:w-min mb-5')}
    ${customClass('home', blok.name === 'text_home_2', 'xl:w-max transition-all duration-700 ease-in-out')}
    ${customClass('about', 'all', 'flex items-center p-5 sm:p-10')}
    ${customClass('contact', 'all', 'lg:col-start-2 lg:col-end-2 py-5 px-5 mt-10 lg:mt-0 lg:py-6 lg:px-10')}`"
  >
    <component
      :is="blok.article ? 'article' : 'span'"
      :style="`color: ${randomTextColor};`"
      :class="`text-content mx-auto text-xs prose-sm lg:prose-lg break-words w-full
      ${customClass('contact', 'all', 'lg:w-full lg:h-full')}`"
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
  watch: {
    '$store.state.data.moved' () { if (this.$store.state.data.moved) { this.randomIndex() } }
  },
  mounted () {
    this.randomIndex()
  },
  methods: {
    randomIndex () {
      this.index = ~~(Math.random() * (this.colors.length - 0)) + 0
    },
    customClass (page, component, style) {
      if (this.$store.state.data.page === page && component) {
        return style
      } else {
        return ''
      }
    }
  }
}
</script>
