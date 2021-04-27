<template>
  <div class="project-description">
    <img :class="`image-description ${imageStyle}`" :src="blok.image.filename" :style="imageStyle" :alt="blok.image.alt">
    <div :class="`text-description ${textStyle}`" :style="inlineTextStyle" v-text="blok.text" />
  </div>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    },
    inlineImageStyle: {
      type: String,
      default: ''
    },
    imageStyle: {
      type: String,
      default: ''
    },
    inlineTextStyle: {
      type: String,
      default: ''
    },
    textStyle: {
      type: String,
      default: ''
    }
  }
}
</script>
