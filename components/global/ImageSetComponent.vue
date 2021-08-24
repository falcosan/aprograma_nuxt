<template>
  <component
    :is="imageType() === 'svg+xml' ? 'img' : 'NuxtImg'"
    loading="lazy"
    class="image"
    :alt="alt"
    :type="`image/${imageType()}`"
    draggable="false"
    :src="src"
    :modifiers="imageType() === 'svg+xml' ? false : { filters: { focal: file.focus ? file.focus : 0 } }"
    :fit="imageType() === 'svg+xml' ? false : fit ? fit : 'in'"
    :format="imageType() === 'svg+xml' ? false : 'webp'"
    :sizes="imageType() === 'svg+xml' ? false : sizes"
  />
</template>
<script>
export default {
  props: {
    file: {
      type: Object,
      required: true
    },
    sizes: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    fit: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  },
  methods: {
    imageType () {
      switch (this.src.toLowerCase().split('.').pop()) {
        case 'jpg':
          return 'jpeg'
        case 'png':
          return 'png'
        case 'svg':
          return 'svg+xml'
        case 'gif':
          return 'gif'
      }
    }
  }
}
</script>
