<template>
  <component
    :is="imageType() === 'svg+xml' ? 'img' : 'NuxtImg'"
    loading="lazy"
    class="image"
    :src="file.filename"
    :alt="alt"
    :type="`image/${imageType()}`"
    draggable="false"
    :modifiers="imageType() === 'svg+xml' ? false : { filters: { focal: file.focus ? file.focus : 0 } }"
    :fit="imageType() === 'svg+xml' ? false : fit"
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
    fit: {
      type: String,
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
    alt: {
      type: String,
      required: true
    }
  },
  methods: {
    imageType () {
      switch (this.file.filename.toLowerCase().split('.').pop()) {
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
