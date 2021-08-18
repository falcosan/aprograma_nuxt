<template>
  <div
    class="media relative flex flex-col mx-auto my-0 overflow-hidden rounded"
  >
    <transition appear enter-active-class="duration-500 in-out" enter-class="opacity-0" mode="out-in">
      <Modal
        v-if="blok.modal_mode"
        close-mode
        modal-style="bg-gray-200 bg-opacity-90"
      >
        <template #activator="action">
          <NuxtImg
            v-if="(blok && blok.media.filename && lookFile === 'image') || image"
            :class="`${blok && blok.media.filename ? blok.media.filename : src
              .split(/[\\/]/)
              .pop()
              .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
            :modifiers="{ filters: { focal: blok.media.focus ? blok.media.focus : 0 } }"
            :src="blok && blok.media.filename ? blok.media.filename : src"
            :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
            :width="blok && blok.width ? blok.width: width ? width : 'auto'"
            :height="blok && blok.height ? blok.height : height ? height : 'auto'"
            :type="`image/${imageType()}`"
            fit="in"
            draggable="false"
            sizes="xs:299px sm:380px md:514px lg:619px xl:711px 2xl:804px 3xl:883px"
            @click.native="action.open()"
          />
          <video
            v-else-if="(blok && blok.media.filename) || video"
            :class="`${blok && blok.media.filename ? blok.media.filename : src
              .split(/[\\/]/)
              .pop()
              .replace(/\.[^/.]+$/, '')}-video media-video my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
            :width="blok && blok.width ? blok.width: width ? width : 'auto'"
            :height="blok && blok.height ? blok.height : height ? height : 'auto'"
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
          <NuxtImg
            v-if="(blok && blok.media.filename && lookFile === 'image') || image"
            :modifiers="{ filters: { focal: blok.media.focus ? blok.media.focus : 0 } }"
            :class="`${blok && blok.media.filename ? blok.media.filename : src
              .split(/[\\/]/)
              .pop()
              .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center select-none cursor-default`"
            width="auto"
            height="auto"
            :src="blok && blok.media.filename ? blok.media.filename : src"
            :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
            :type="`image/${imageType()}`"
            fit="in"
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
        <NuxtImg
          v-if="(blok && blok.media.filename && lookFile === 'image') || image"
          :modifiers="{ filters: { focal: blok.media.focus ? blok.media.focus : 0 } }"
          class="image-container"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center rounded pointer-events-none select-none`"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          :width="blok && blok.width ? blok.width: width ? width : 'auto'"
          :height="blok && blok.height ? blok.height : height ? height : 'auto'"
          :type="`image/${imageType()}`"
          fit="in"
          draggable="false"
          sizes="xs:299px sm:380px md:514px lg:619px xl:711px 2xl:804px 3xl:883px"
        />
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-video media-video my-0 mx-auto object-contain object-center rounded pointer-events-none select-none`"
          :width="blok && blok.width ? blok.width: width ? width : 'auto'"
          :height="blok && blok.height ? blok.height : height ? height : 'auto'"
          playsinline
          autoplay
          muted
          :loop="blok.loop"
        >
          <source :src="blok && blok.media.filename ? blok.media.filename : src" :type="`video/${blok && blok.media.filename ? blok.media.filename.toLowerCase().split('.').pop() : src.toLowerCase().split('.').pop()}`">
        </video>
      </template>
    </transition>
    <p
      v-if="(blok && blok.title) || title"
      class="media-title p-5 text-center text-lg font-extralight"
      :style="`color: ${blok && blok.title_color.color ? blok.title_color.color : false};`"
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
