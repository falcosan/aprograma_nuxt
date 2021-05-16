<template>
  <span class="media-container relative grid gap-5 w-full">
    <img
      v-if="(blok && blok.media.filename && lookFile === 'image') || image"
      :width="blok && blok.width && blok && blok.unit ? `${blok.width}${blok.unit}`: width ? width : '100%'"
      :height="blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit}` : height ? height : '100%'"
      :class="`media ${blok && blok.media.filename ? blok.media.filename : src
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, '')}-media media-image h-xs xs:h-sm sm:h-md md:h-md lg:h-2xl xl:h-3xl 2xl:h-5xl my-0 mx-auto object-contain object-center pointer-events-none select-none`"
      :src="blok && blok.media.filename ? blok.media.filename : src"
      :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
      :type="`image/${imageType()}`"
    >
    <video
      v-else-if="(blok && blok.media.filename) || video"
      :class="`${blok && blok.media.filename ? blok.media.filename : src
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, '')}-media media-video h-xs xs:h-sm sm:h-md md:h-md lg:h-2xl xl:h-3xl 2xl:h-5xl my-0 mx-auto object-contain object-center pointer-events-none select-none`"
      :width="blok && blok.width && blok && blok.unit ? `${blok.width}${blok.unit}`: width ? width : '100%'"
      :height="blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit}` : height ? height : '100%'"
      playsinline
      autoplay
      muted
      loop
    >
      <source :src="blok && blok.media.filename ? blok.media.filename : src" :type="`video/${blok && blok.media.filename ? blok.media.filename.toLowerCase().split('.').pop() : src.toLowerCase().split('.').pop()}`">
    </video>
    <p v-if="(blok && blok.title && blok.show_title) || title" class="media-title text-center" v-text="blok && blok.title ? blok.title : title" />
  </span>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    title: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    image: {
      type: Boolean,
      default: false
    },
    video: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lookFile () {
      return this.blok && this.blok.media.filename ? (/(gif|jpe?g|tiff?|png|webp|bmp)/gi).test(this.blok.media.filename.toLowerCase().split('.').pop()) ? 'image' : 'video' : false
    }
  },
  methods: {
    imageType () {
      if (this.blok && this.blok.media.filename && this.lookFile === 'image') {
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
      } else if (this.image) {
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
}
</script>
