<template>
  <div :class="`project-description grid${blok.text ? ' lg:grid-cols-2' : ' '} gap-5 col-start-1 col-end-4`">
    <ul :class="`image-container description-container grid${blok.image.length > 1 ? ' grid-cols-2' : ' grid-cols-1'} items-center gap-5`" :style="inlineImageStyle">
      <li v-for="(image, index) in blok.image" :key="index" class="image-item">
        <img
          class="description-image w-full h-auto max-h-96 object-contain"
          :src="image.filename"
          :alt="image.alt"
        >
      </li>
    </ul>
    <span v-if="blok.text" class="description-text p-5" :style="inlineTextStyle" v-text="blok.text" />
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
    inlineTextStyle: {
      type: String,
      default: ''
    }
  }
}
</script>
