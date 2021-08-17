<template>
  <div
    v-if="blok.text"
    :key="blok._uid"
    :style="`background-color: ${randomBackgroundColor}; color: ${randomTextColor};`"
    :class="`text-container w-full max-w-full h-full flex flex-col rounded ${blok.color_effect && colors.length > 1 ? 'transition-colors duration-700 ease-in-out' : ''}`"
  >
    <div
      :class="`text-content block max-w-none font-extralight rounded prose-sm lg:prose-lg ${!blok.remove_space ? 'p-5' : ''}`"
      v-html="$md.render(blok.text)"
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
  created () {
    this.randomIndex()
  },
  mounted () {
    this.$setCodeLang()
  },
  methods: {
    randomIndex () {
      this.index = ~~(Math.random() * (this.colors.length - 0)) + 0
    }
  }
}
</script>
<style scoped>
.text-content{
  word-break: break-word;
  overflow-wrap: anywhere;
}
</style>
