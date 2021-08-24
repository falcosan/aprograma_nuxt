<template>
  <div class="detail">
    <h1 v-if="blok.title" :class="`detail-title text-lg sm:text-xl font-light ${sliderMode || carouselMode || containerMode ? 'm-5' : 'mb-5'}`" v-text="blok.title" />
    <div class="detail-content grid gap-5 md:grid-flow-col auto-cols-fr rounded">
      <ul :class="`image-container grid gap-5 w-full justify-items-center auto-rows-max ${$store.state.data.windowWidth >= 768 ? blok.invert_direction ? 'col-start-2 col-end-2' : '' : ''}`" :style="`grid-template-columns: repeat(${blok.column_container ? $rangeItems(Number(blok.column_container), 3) : blok.media.length}, 1fr)`">
        <li v-for="media in blok.media" :key="media.id" class="image-item w-full">
          <Modal
            v-if="blok.modal_mode"
            close-mode
            class="detail-modal"
            modal-style="bg-opacity-90 bg-gray-200"
          >
            <template #activator="action">
              <ImageSet
                v-if="$imageValidation(media.filename)"
                :file="media"
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(/\.[^/.]+$/, '')}-image my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
                :src="media.filename"
                :alt="media.alt"
                width="620"
                height="620"
                sizes="xs:299px sm:380px md:514px lg:620px"
                @click.native="action.open()"
              />
              <video
                v-else
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(/\.[^/.]+$/, '')}-video my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
                width="auto"
                height="auto"
                autoplay
                muted
                playsinline
                :loop="blok.loop"
                @click="action.open()"
              >
                <source :src="media.filename" :type="`video/${media.filename.toLowerCase().split('.').pop()}`">
              </video>
            </template>
            <template #body>
              <ImageSet
                v-if="$imageValidation(media.filename)"
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(/\.[^/.]+$/, '')}-image my-0 mx-auto object-contain object-center select-none cursor-default`"
                width="1920"
                height="1980"
                sizes="xs:380px sm:514px md:711px lg:804px xl:1680px 2xl:1920px"
                :file="media"
                :src="media.filename"
                :alt="media.alt"
              />
              <video
                v-else
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(/\.[^/.]+$/, '')}-video my-0 mx-auto object-contain object-center select-none cursor-default`"
                width="auto"
                height="auto"
                :src="media.filename"
                :alt="media.alt"
                playsinline
                autoplay
                muted
                loop
              >
                <source :src="media.filename" :type="`video/${media.filename.toLowerCase().split('.').pop()}`">
              </video>
            </template>
          </Modal>
          <template v-else>
            <ImageSet
              v-if="$imageValidation(media.filename)"
              :file="media"
              :class="`${media.filename
                .split(/[\\/]/)
                .pop()
                .replace(/\.[^/.]+$/, '')}-image my-0 mx-auto object-contain object-center rounded pointer-events-none cursor-pointer select-none`"
              :src="media.filename"
              :alt="media.alt"
              fit="in"
              width="620"
              height="620"
              sizes="xs:299px sm:380px md:514px lg:620px"
            />
            <video
              v-else
              :class="`${blok && media.filename ? media.filename : src
                .split(/[\\/]/)
                .pop()
                .replace(/\.[^/.]+$/, '')}-video my-0 mx-auto object-contain object-center rounded pointer-events-none cursor-pointer select-none`"
              width="auto"
              height="auto"
              playsinline
              autoplay
              muted
              :loop="blok.loop"
            >
              <source :src="media.filename" :type="`video/${media.filename.toLowerCase().split('.').pop()}`">
            </video>
          </template>
        </li>
      </ul>
      <div :class="`text-container w-full max-w-full flex flex-col self-start rounded ${!blok.remove_space ? 'p-5' : ''}`" :style="`background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`">
        <div :class="`detail-text markdown block max-w-none rounded ${setAlignText}`" v-html="$md.render(blok.text)" />
      </div>
    </div>
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
      required: true
    },
    containerMode: {
      type: Boolean,
      default: false
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setAlignText () {
      switch (this.blok.align_text) {
        case 'right':
          return 'text-right'
        case 'center':
          return 'text-center'
        case 'justify':
          return 'text-justify'
      } return ''
    }
  },
  mounted () {
    this.$markdownRules()
  },
  methods: {
    imageType (media) {
      switch (media.filename.toLowerCase().split('.').pop()) {
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
