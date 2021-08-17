<template>
  <div class="detail">
    <h1 v-if="blok.title" :class="`detail-title ${sliderMode || carouselMode || containerMode ? 'm-5 text-xl' : 'mb-5 text-xl xs:text-2xl'}`" v-text="blok.title" />
    <div class="detail-content grid gap-5 md:grid-flow-col auto-cols-fr rounded">
      <ul :class="`image-container grid gap-5 w-full justify-items-center auto-rows-max ${blok.invert_direction ? 'col-start-2 col-end-2' : ''}`" :style="`${inlineImageStyle} grid-template-columns: repeat(${blok.column_container ? $rangeItems(Number(blok.column_container), 3) : blok.media.length}, 1fr)`">
        <li v-for="media in blok.media" :key="media.id" class="image-item w-full">
          <Modal
            v-if="blok.modal_mode"
            close-mode
            class="detail-modal"
            modal-style="bg-opacity-90 bg-gray-200"
          >
            <template #activator="action">
              <nuxt-img
                v-if="(/(gif|jpe?g|tiff?|png|svg|webp|bmp)/gi).test(media.filename.toLowerCase().split('.').pop())"
                :modifiers="{ smart: true, filters: { focal: media.focus ? media.focus : 0 } }"
                :quality="Number(blok.quality)"
                :width="blok.quality ? Number(blok.quality) : 'auto'"
                :height="blok.quality ? Number(blok.quality) : 'auto'"
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(/\.[^/.]+$/, '')}-image detail-image my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
                :src="media.filename"
                :alt="media.alt"
                :type="`image/${imageType(media)}`"
                fit="in"
                draggable="false"
                @click.native="action.open()"
              />
              <video
                v-else
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(/\.[^/.]+$/, '')}-video detail-video my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
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
              <nuxt-img
                v-if="(/(gif|jpe?g|tiff?|png|svg|webp|bmp)/gi).test(media.filename.toLowerCase().split('.').pop())"
                :modifiers="{ smart: true, filters: { focal: media.focus ? media.focus : 0 } }"
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(/\.[^/.]+$/, '')}-image modal-image my-0 mx-auto object-contain object-center select-none cursor-default`"
                height="auto"
                width="auto"
                :type="`image/${imageType(media)}`"
                :src="media.filename"
                :alt="media.alt"
              />
              <video
                v-else
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(/\.[^/.]+$/, '')}-video modal-video my-0 mx-auto object-contain object-center select-none cursor-default`"
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
          <div v-else class="detail-image">
            <nuxt-img
              v-if="(/(gif|jpe?g|tiff?|png|svg|webp|bmp)/gi).test(media.filename.toLowerCase().split('.').pop())"
              :modifiers="{ smart: true, filters: { focal: media.focus ? media.focus : 0 } }"
              :quality="Number(blok.quality)"
              :width="blok.quality ? Number(blok.quality) : 'auto'"
              :height="blok.quality ? Number(blok.quality) : 'auto'"
              :type="`image/${imageType(media)}`"
              :class="`${media.filename
                .split(/[\\/]/)
                .pop()
                .replace(/\.[^/.]+$/, '')}-image my-0 mx-auto object-contain cursor-pointer object-cover rounded pointer-events-none select-none`"
              :src="media.filename"
              :alt="media.alt"
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
          </div>
        </li>
      </ul>
      <div :class="`detail-text w-full max-w-full flex flex-col self-start rounded ${!blok.remove_space ? 'p-5' : ''}`" :style="inlineTextStyle ? inlineTextStyle : `background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`">
        <div class="block max-w-none font-extralight rounded prose-sm lg:prose-lg" v-html="$md.render(blok.text)" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
    },
    inlineImageStyle: {
      type: String,
      default: ''
    },
    inlineTextStyle: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$setCodeLang()
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
