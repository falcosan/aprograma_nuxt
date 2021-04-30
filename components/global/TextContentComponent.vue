<template>
  <div
    :key="blok._uid"
    :style="`background-color: ${randomBackgroundColor}; color: ${randomTextColor};`"
    :class="`text-container max-w-full
    ${customClass('index', 'all', 'md:w-max transition-colors duration-700 ease-in-out')}
    ${customClass('index', blok.name === 'text_home_1', 'mb-5')}
    ${customClass('about', 'all', 'max-h-full overflow-y-auto')}`"
  >
    <component
      :is="blok.article ? 'article' : 'span'"
      :class="`text-content block p-5 md:p-10 prose-sm md:prose-lg xl:prose-xl break-words`"
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
      if (this.$route.name === page && component) {
        return style
      } else {
        return ''
      }
    }
  }
}
</script>
