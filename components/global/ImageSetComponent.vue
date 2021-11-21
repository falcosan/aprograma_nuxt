<template>
  <component
    :is="imageType() === 'svg+xml' ? 'img' : 'NuxtImg'"
    :loading="lazy ? 'lazy' : false"
    class="image"
    :alt="alt"
    :type="`image/${imageType()}`"
    draggable="false"
    :src="src"
    :width="width"
    :height="height"
    :modifiers="imageType() === 'svg+xml' ? false : { filters: { focal: file.focus ? file.focus : 0 } }"
    :fit="imageType() === 'svg+xml' || file.focus ? null : 'in'"
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
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
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
