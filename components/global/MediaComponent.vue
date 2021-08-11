<template>
  <div class="media relative w-auto h-full grid gap-5 overflow-hidden rounded">
    <Modal
      v-if="blok.modal_mode"
      close-mode
      modal-style="bg-gray-200 bg-opacity-90"
    >
      <template #activator="action">
        <img
          v-if="(blok && blok.media.filename && lookFile === 'image') || image"
          :style="`height: ${blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit}` : height ? height : 'auto'}; width: ${blok && blok.width && blok.unit ? `${blok.width}${blok.unit}`: width ? width : 'auto'};`"
          :width="blok && blok.width && blok.unit ? `${blok.width}${blok.unit}`: width ? width : 'auto'"
          :height="blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit}` : height ? height : 'auto'"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center cursor-pointer select-none ${carouselMode ? 'h-xs xs:h-sm sm:h-md md:h-md lg:h-2xl xl:h-3xl 2xl:h-4xl' : ''}`"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          :type="`image/${imageType()}`"
          @click="action.open()"
        >
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-video media-video my-0 mx-auto object-contain object-center cursor-pointer select-none ${carouselMode ? 'h-xs xs:h-sm sm:h-md md:h-md lg:h-2xl xl:h-3xl 2xl:h-4xl' : ''}`"
          :style="`height: ${blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit}` : height ? height : 'auto'}; width: ${blok && blok.width && blok.unit ? `${blok.width}${blok.unit}`: width ? width : 'auto'};`"
          :width="blok && blok.width && blok.unit ? `${blok.width}${blok.unit}`: width ? width : 'auto'"
          :height="blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit}` : height ? height : 'auto'"
          playsinline
          autoplay
          muted
          loop
          @click="action.open()"
        >
          <source :src="blok && blok.media.filename ? blok.media.filename : src" :type="`video/${blok && blok.media.filename ? blok.media.filename.toLowerCase().split('.').pop() : src.toLowerCase().split('.').pop()}`">
        </video>
      </template>
      <template #body>
        <img
          v-if="(blok && blok.media.filename && lookFile === 'image') || image"
          width="100%"
          height="100%"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center select-none cursor-default`"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          :type="`image/${imageType()}`"
        >
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-video media-video my-0 mx-auto object-contain object-center select-none cursor-default`"
          width="100%"
          height="100%"
          playsinline
          autoplay
          muted
          loop
        >
          <source :src="blok && blok.media.filename ? blok.media.filename : src" :type="`video/${blok && blok.media.filename ? blok.media.filename.toLowerCase().split('.').pop() : src.toLowerCase().split('.').pop()}`">
        </video>
      </template>
    </Modal>
    <template v-else>
      <img
        v-if="(blok && blok.media.filename && lookFile === 'image') || image"
        class="image-container"
        :style="`height: ${blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit}` : height ? height : 'auto'}; width: ${blok && blok.width && blok.unit ? `${blok.width}${blok.unit}`: width ? width : 'auto'};`"
        :width="blok && blok.width && blok.unit ? `${blok.width}${blok.unit}`: width ? width : 'auto'"
        :height="blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit}` : height ? height : 'auto'"
        :class="`${blok && blok.media.filename ? blok.media.filename : src
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center pointer-events-none select-none ${carouselMode ? 'h-xs xs:h-sm sm:h-md md:h-md lg:h-2xl xl:h-3xl 2xl:h-4xl' : ''}`"
        :src="blok && blok.media.filename ? blok.media.filename : src"
        :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
        :type="`image/${imageType()}`"
      >

      <video
        v-else-if="(blok && blok.media.filename) || video"
        :class="`${blok && blok.media.filename ? blok.media.filename : src
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-video media-video my-0 mx-auto object-contain object-center pointer-events-none select-none ${carouselMode ? 'h-xs xs:h-sm sm:h-md md:h-md lg:h-2xl xl:h-3xl 2xl:h-4xl' : ''}`"
        :style="`height: ${blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit}` : height ? height : 'auto'}; width: ${blok && blok.width && blok.unit ? `${blok.width}${blok.unit}`: width ? width : 'auto'};`"
        :width="blok && blok.width && blok.unit ? `${blok.width}${blok.unit}`: width ? width : 'auto'"
        :height="blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit}` : height ? height : 'auto'"
        playsinline
        autoplay
        muted
        loop
      >
        <source :src="blok && blok.media.filename ? blok.media.filename : src" :type="`video/${blok && blok.media.filename ? blok.media.filename.toLowerCase().split('.').pop() : src.toLowerCase().split('.').pop()}`">
      </video>
    </template>
    <p v-if="(blok && blok.title && blok.show_title) || title" class="media-title text-center text-lg" v-text="blok && blok.title ? blok.title : title" />
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    carouselMode: {
      type: Boolean,
      default: false
    },
    containerWidth: {
      type: Number,
      default: 0
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
      return this.blok && this.blok.media.filename ? (/(gif|jpe?g|tiff?|png|svg|webp|bmp)/gi).test(this.blok.media.filename.toLowerCase().split('.').pop()) ? 'image' : 'video' : ''
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
