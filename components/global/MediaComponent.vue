<template>
  <div
    :class="`media relative flex flex-col mx-auto my-0 overflow-hidden rounded ${!blok.remove_space ? blok.title ? 'px-5 pt-5' : 'p-5' : ''}`"
  >
    <Modal
      v-if="blok.modal_mode"
      close-mode
      modal-style="bg-gray-200 bg-opacity-90"
    >
      <template #activator="action">
        <div class="modal-media cursor-pointer" @click="action.open()">
          <component
            :is="imageType() === 'svg+xml' ? 'img' : 'NuxtImg'"
            v-if="(blok && $imageValidation(blok.media.filename)) || image"
            :modifiers="imageType() === 'svg+xml' ? false : { filters: { focal: blok.media.focus ? blok.media.focus : 0 } }"
            loading="lazy"
            :format="imageType() === 'svg+xml' ? false : 'webp'"
            class="image-container"
            :class="`${blok && blok.media.filename ? blok.media.filename : src
              .split(/[\\/]/)
              .pop()
              .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center rounded select-none`"
            :src="blok && blok.media.filename ? blok.media.filename : src"
            :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
            :width="blok ? blok.width : width"
            :height="blok ? blok.height : height"
            :type="`image/${imageType()}`"
            :fit="imageType() === 'svg+xml' ? false : 'in'"
            draggable="false"
            :sizes="imageType() === 'svg+xml' ? false : `xs:299px sm:380px md:514px lg:${blok ? /[a-zA-Z]/g.test(blok.width) ? blok.width : `${blok.width}px` : /[a-zA-Z]/g.test(width) ? width : `${width}px`}`"
          />
          <video
            v-else-if="(blok && blok.media.filename) || video"
            :class="`${blok && blok.media.filename ? blok.media.filename : src
              .split(/[\\/]/)
              .pop()
              .replace(/\.[^/.]+$/, '')}-video media-video my-0 mx-auto object-contain object-center rounded select-none`"
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
        </div>
      </template>
      <template #body>
        <component
          :is="imageType() === 'svg+xml' ? 'img' : 'NuxtImg'"
          v-if="(blok && $imageValidation(blok.media.filename)) || image"
          :modifiers="imageType() === 'svg+xml' ? false : { filters: { focal: blok.media.focus ? blok.media.focus : 0 } }"
          loading="lazy"
          :format="imageType() === 'svg+xml' ? false : 'webp'"
          class="image-container"
          :class="`${blok && blok.media.filename ? blok.media.filename : src
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center select-none cursor-default`"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          width="1920"
          height="1980"
          :type="`image/${imageType()}`"
          :fit="imageType() === 'svg+xml' ? false : 'in'"
          draggable="false"
          :sizes="imageType() === 'svg+xml' ? false : 'xs:380px sm:514px md:711px lg:804px xl:1680px 2xl:1920px'"
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
      <component
        :is="imageType() === 'svg+xml' ? 'img' : 'NuxtImg'"
        v-if="(blok && $imageValidation(blok.media.filename)) || image"
        :modifiers="imageType() === 'svg+xml' ? false : { filters: { focal: blok.media.focus ? blok.media.focus : 0 } }"
        loading="lazy"
        :format="imageType() === 'svg+xml' ? false : 'webp'"
        class="image-container"
        :class="`${blok && blok.media.filename ? blok.media.filename : src
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-image media-image my-0 mx-auto object-contain object-center rounded pointer-events-none select-none`"
        :src="blok && blok.media.filename ? blok.media.filename : src"
        :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
        :width="blok ? blok.width : width"
        :height="blok ? blok.height : height"
        :type="`image/${imageType()}`"
        :fit="imageType() === 'svg+xml' ? false : 'in'"
        draggable="false"
        :sizes="imageType() === 'svg+xml' ? false : `xs:299px sm:380px md:514px lg:${blok ? /[a-zA-Z]/g.test(blok.width) ? blok.width : `${blok.width}px` : /[a-zA-Z]/g.test(width) ? width : `${width}px`}`"
      />
      <video
        v-else-if="(blok && blok.media.filename) || video"
        :class="`${blok && blok.media.filename ? blok.media.filename : src
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-video media-video my-0 mx-auto object-contain object-center rounded pointer-events-none select-none`"
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
  methods: {
    imageType () {
      if (this.blok && this.$imageValidation(this.blok.media.filename)) {
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
