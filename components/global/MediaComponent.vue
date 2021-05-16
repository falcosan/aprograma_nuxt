<template>
  <span class="media-container relative grid gap-5 w-full">
    <img
      v-if="(blok && blok.media.filename && lookFile === 'image') || image"
      :width="blok && blok.width ? `${blok.width}${blok.unit}`: blok && blok.width && blok.full_space ? 100 : width ? width : false"
      :height="blok && blok.height ? `${blok.height}${blok.unit}` : blok && blok.width && blok.full_space ? 100 : height ? height : false"
      :class="`media ${blok && blok.media.filename ? blok.media.filename : source
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, '')}-medi h-xs xs:h-sm sm:h-md md:h-lg lg:h-2xl xl:h-3xl media-image my-0 mx-auto object-contain object-center pointer-events-none select-none`"
      :src="blok && blok.media.filename ? blok.media.filename : source"
      :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
      :type="`image/${imageType()}`"
    >
    <video
      v-else-if="(blok && blok.media.filename) || video"
      :class="`${blok && blok.media.filename ? blok.media.filename : source
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, '')}-medi h-xs xs:h-sm sm:h-md md:h-lg lg:h-2xl xl:h-3xl media-video my-0 mx-auto object-contain object-center pointer-events-none select-none`"
      :width="blok && blok.width ? `${blok.width}${blok.unit}`: blok && blok.width && blok.full_space ? 100 : width ? width : false"
      :height="blok && blok.height ? `${blok.height}${blok.unit}` : blok && blok.width && blok.full_space ? 100 : height ? height : false"
      playsinline
      autoplay
      muted
      loop
    >
      <source :src="blok && blok.media.filename ? blok.media.filename : source" :type="`video/${blok && blok.media.filename ? blok.media.filename.toLowerCase().split('.').pop() : source.toLowerCase().split('.').pop()}`">
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
    source: {
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
        switch (this.source.toLowerCase().split('.').pop()) {
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
