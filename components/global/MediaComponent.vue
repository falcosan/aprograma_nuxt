<template>
  <span class="media-container grid gap-5 w-full">
    <img
      v-if="blok && blok.media.filename && lookFile === 'image'"
      :width="blok && blok.width ? `${blok.width}${blok.unit}`: blok && blok.width && blok.full_space ? 100 : width"
      :height="blok && blok.height ? `${blok.height}${blok.unit}` : blok && blok.width && blok.full_space ? 100 : height"
      :class="`media ${blok.media.filename
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, '')}-media media-image my-0 mx-auto object-contain object-center pointer-events-none select-none`"
      :src="blok.media.filename"
      :alt="blok.media.alt"
      :type="`image/${imageType()}`"
    >
    <video
      v-else-if="blok && blok.media.filename"
      :class="`${blok.media.filename
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, '')}-media media-video my-0 mx-auto object-contain object-center pointer-events-none select-none`"
      playsinline
      autoplay
      muted
      loop
    >
      <source :src="blok.media.filename" :type="`video/${blok.media.filename.toLowerCase().split('.').pop()}`">
    </video>
    <p v-if="blok && blok.title && blok.show_title" class="media-title text-center">{{ blok.title }}</p>
  </span>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  computed: {
    lookFile () {
      return (/(gif|jpe?g|tiff?|png|webp|bmp)/gi).test(this.blok.media.filename.toLowerCase().split('.').pop()) ? 'image' : 'video'
    }
  },
  methods: {
    imageType () {
      if (this.blok && this.lookFile === 'image') {
        switch (this.blok.media.filename.toLowerCase().split('.').pop()) {
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
}
</script>
