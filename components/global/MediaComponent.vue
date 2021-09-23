<template>
  <div
    :class="`media relative h-full flex flex-col justify-center overflow-hidden rounded ${!blok.remove_space ? blok.title ? 'px-5 pt-5' : 'p-5' : ''}`"
  >
    <Modal
      v-if="blok.modal_mode"
      close-mode
      modal-style="bg-gray-200 bg-opacity-90"
    >
      <template #activator="action">
        <ImageSet
          v-if="(blok && $imageValidation(blok.media.filename)) || image"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-image my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
          lazy
          :file="blok.media"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          :width="blok ? blok.width : width"
          :height="blok ? blok.height : height"
          :sizes="`xs:${blok.width.replace(/\D/g, '') / 1.15}px sm:${blok.width.replace(/\D/g, '') / 1.12}px md:${blok.width.replace(/\D/g, '') / 1.09}px lg:${blok.width.replace(/\D/g, '') / 1.06}px xl:${blok.width.replace(/\D/g, '') / 1.03}px`"
          @click.native="action.open()"
        />
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-video my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
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
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-image my-0 mx-auto object-contain object-center select-none cursor-default`"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          width="1920"
          height="1980"
          sizes="xs:380px sm:514px md:711px lg:804px xl:1680px 2xl:1920px"
        />
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-video my-0 mx-auto object-contain object-center select-none cursor-default`"
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
        :class="`${blok && blok.media.filename ? blok.media.filename : src
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-image my-0 mx-auto object-contain object-center rounded pointer-events-none select-none`"
        lazy
        :file="blok.media"
        :src="blok && blok.media.filename ? blok.media.filename : src"
        :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
        :width="blok ? blok.width : width"
        :height="blok ? blok.height : height"
        :sizes="`xs:${blok.width.replace(/\D/g, '') / 1.15}px sm:${blok.width.replace(/\D/g, '') / 1.12}px md:${blok.width.replace(/\D/g, '') / 1.09}px lg:${blok.width.replace(/\D/g, '') / 1.06}px xl:${blok.width.replace(/\D/g, '') / 1.03}px`"
      />
      <video
        v-else-if="(blok && blok.media.filename) || video"
        :class="`${blok && blok.media.filename ? blok.media.filename : src
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-video my-0 mx-auto object-contain object-center rounded pointer-events-none select-none`"
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
import ImageSet from './ImageSetComponent'
export default {
  components: { ImageSet, Modal },
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
  }
}
</script>
