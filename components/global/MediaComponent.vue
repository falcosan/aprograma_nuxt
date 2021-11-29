<template>
  <div
    :class="`media relative h-full flex flex-col justify-center overflow-hidden rounded ${!blok.remove_space ? blok.title ? 'px-5 pt-5' : 'p-5' : ''}`"
  >
    <Modal
      v-if="blok.modal_mode"
      close-mode
    >
      <template #activator="action">
        <ImageSet
          v-if="(blok && $imageValidation(blok.media.filename)) || image"
          :class="`${getClass}-image my-0 mx-auto object-contain object-center rounded cursor-pointer select-none ${blok.width === 'full' ? 'w-full' : ''}`"
          lazy
          :file="blok.media"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          :width="blok ? blok.width : width"
          :height="blok ? blok.height : height"
          :sizes="checkSizes"
          @click.native="action.open()"
        />
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="`${getClass}-video my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
          :width="blok ? blok.width : width"
          :height="blok ? blok.height : height"
          playsinline
          autoplay
          muted
          :loop="blok.loop"
          @click="action.open()"
        >
          <source :src="blok && blok.media.filename ? blok.media.filename : src" :type="`video/${blok && blok.media.filename ? blok.media.filename.toLowerCase().split('.').pop() : src.toLowerCase().split('.').pop()}`">
        </video>
      </template>
      <template #body>
        <ImageSet
          v-if="(blok && $imageValidation(blok.media.filename)) || image"
          :file="blok.media"
          :class="`${getClass}-image my-0 mx-auto object-contain object-center select-none cursor-default`"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          width="1920"
          height="1980"
          sizes="xs:380px sm:514px md:711px lg:804px xl:1680px 2xl:1920px"
        />
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="`${getClass}-video my-0 mx-auto object-contain object-center select-none cursor-default`"
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
      <ImageSet
        v-if="(blok && $imageValidation(blok.media.filename)) || image"
        :class="`${getClass}-image my-0 mx-auto object-contain object-center rounded pointer-events-none select-none ${blok.width === 'full' ? 'w-full' : ''}`"
        lazy
        :file="blok.media"
        :src="blok && blok.media.filename ? blok.media.filename : src"
        :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
        :width="blok ? blok.width : width"
        :height="blok ? blok.height : height"
        :sizes="checkSizes"
      />
      <video
        v-else-if="(blok && blok.media.filename) || video"
        :class="`${getClass}-video my-0 mx-auto object-contain object-center rounded pointer-events-none select-none`"
        :width="blok ? blok.width : width"
        :height="blok ? blok.height : height"
        playsinline
        autoplay
        muted
        :loop="blok.loop"
      >
        <source :src="blok && blok.media.filename ? blok.media.filename : src" :type="`video/${blok && blok.media.filename ? blok.media.filename.toLowerCase().split('.').pop() : src.toLowerCase().split('.').pop()}`">
      </video>
    </template>
    <p
      v-if="(blok && blok.title) || title"
      class="media-title p-5 text-center"
      :style="`color: ${blok && blok.title_color.color ? blok.title_color.color : false};`"
      v-text="blok && blok.title ? blok.title : title"
    />
  </div>
</template>

<script>
import Modal from './ModalComponent'
export default {
  components: { Modal },
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
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
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
    checkSizes () {
      if (this.blok.width === 'auto' || this.blok.width === 'full') { return false } else if (this.blok.width === '100%') { return 'xs:100vw' } else {
        return `xs:${this.blok.width.replace(/\D/g, '') / 1.15}px sm:${this.blok.width.replace(/\D/g, '') / 1.12}px md:${this.blok.width.replace(/\D/g, '') / 1.09}px lg:${this.blok.width.replace(/\D/g, '') / 1.06}px xl:${this.blok.width.replace(/\D/g, '') / 1.03}px`
      }
    },
    getClass () {
      return this.blok
        ? this.blok.media.filename?.split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')
        : this.src?.split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')
    }
  }
}
</script>
