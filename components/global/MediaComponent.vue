<template>
  <div class="media relative w-auto h-full grid gap-5 items-center overflow-hidden rounded">
    <Modal
      v-if="blok.modal_mode"
      close-mode
      modal-style="bg-gray-200 bg-opacity-90"
    >
      <template #activator="action">
        <nuxt-img
          v-if="(blok && blok.media.filename && lookFile === 'image') || image"
          :modifiers="{ smart: true }"
          :style="`height: ${blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit === 'vh; vw' ? lookUnit[0] : lookUnit}` : height ? height : 'auto'}; width: ${blok && blok.width && blok.unit ? `${blok.width}${blok.unit === 'vh; vw' ? lookUnit[1] : lookUnit}`: width ? width : 'auto'};`"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center cursor-pointer select-none`"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          :quality="Number(blok.quality)"
          :width="blok && blok.quality ? Number(blok.quality) : width ? width : ''"
          :height="blok && blok.quality ? Number(blok.quality) : height ? height : ''"
          :type="`image/${imageType()}`"
          draggable="false"
          @click.native="action.open()"
        />
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-video media-video my-0 mx-auto object-contain object-center cursor-pointer select-none`"
          :style="`height: ${blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit === 'vh; vw' ? lookUnit[0] : lookUnit}` : height ? height : 'auto'}; width: ${blok && blok.width && blok.unit ? `${blok.width}${blok.unit === 'vh; vw' ? lookUnit[1] : lookUnit}`: width ? width : 'auto'};`"
          playsinline
          autoplay
          muted
          loop
          @click.native="action.open()"
        >
          <source :src="blok && blok.media.filename ? blok.media.filename : src" :type="`video/${blok && blok.media.filename ? blok.media.filename.toLowerCase().split('.').pop() : src.toLowerCase().split('.').pop()}`">
        </video>
      </template>
      <template #body>
        <nuxt-img
          v-if="(blok && blok.media.filename && lookFile === 'image') || image"
          :modifiers="{ smart: true }"
          width="auto"
          height="auto"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center select-none cursor-default`"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          :type="`image/${imageType()}`"
          draggable="false"
        />
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-video media-video my-0 mx-auto object-contain object-center select-none cursor-default`"
          width="auto"
          height="auto"
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
      <nuxt-img
        v-if="(blok && blok.media.filename && lookFile === 'image') || image"
        :modifiers="{ smart: true }"
        class="image-container"
        :style="`height: ${blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit === 'vh; vw' ? lookUnit[0] : lookUnit}` : height ? height : 'auto'}; width: ${blok && blok.width && blok.unit ? `${blok.width}${blok.unit === 'vh; vw' ? lookUnit[1] : lookUnit}`: width ? width : 'auto'};`"
        :class="`${blok && blok.media.filename ? blok.media.filename : src
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center pointer-events-none select-none`"
        :src="blok && blok.media.filename ? blok.media.filename : src"
        :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
        :quality="Number(blok.quality)"
        :width="blok && blok.quality ? Number(blok.quality) : width ? width : ''"
        :height="blok && blok.quality ? Number(blok.quality) : height ? height : ''"
        :type="`image/${imageType()}`"
        draggable="false"
      />
      <video
        v-else-if="(blok && blok.media.filename) || video"
        :class="`${blok && blok.media.filename ? blok.media.filename : src
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-video media-video my-0 mx-auto object-contain object-center pointer-events-none select-none`"
        :style="`height: ${blok && blok.height && blok && blok.unit ? `${blok.height}${blok.unit === 'vh; vw' ? lookUnit[0] : lookUnit}` : height ? height : 'auto'}; width: ${blok && blok.width && blok.unit ? `${blok.width}${blok.unit === 'vh; vw' ? lookUnit[1] : lookUnit}`: width ? width : 'auto'};`"
        playsinline
        autoplay
        muted
        loop
      >
        <source :src="blok && blok.media.filename ? blok.media.filename : src" :type="`video/${blok && blok.media.filename ? blok.media.filename.toLowerCase().split('.').pop() : src.toLowerCase().split('.').pop()}`">
      </video>
    </template>
    <p
      v-if="(blok && blok.title && blok.show_title) || title"
      class="media-title text-center text-lg"
      :style="`color: ${blok && blok.text_color.color ? blok.text_color.color : false};`"
      v-text="blok && blok.title ? blok.title : title"
    />
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
    },
    lookUnit () {
      return this.blok.unit === 'vh; vw' ? this.blok.unit.split('; ') : this.blok.unit
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
