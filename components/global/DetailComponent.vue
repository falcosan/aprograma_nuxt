<template>
  <div class="detail">
    <h1 v-if="blok.title" :class="`detail-title text-lg sm:text-xl font-extralight ${sliderMode || carouselMode || containerMode ? 'm-5' : 'mb-5'}`" v-text="blok.title" />
    <div class="detail-content grid gap-5 md:grid-flow-col auto-cols-fr rounded">
      <ul :class="`image-container grid gap-5 w-full justify-items-center auto-rows-max ${$store.state.data.windowWidth >= 768 ? blok.invert_direction ? 'col-start-2 col-end-2' : '' : ''}`" :style="`grid-template-columns: repeat(${blok.column_container ? $rangeItems(Number(blok.column_container), 3) : blok.media.length}, 1fr)`">
        <li v-for="media in blok.media" :key="media.id" class="image-item w-full">
          <Modal
            v-if="blok.modal_mode"
            close-mode
            modal-style="bg-opacity-90 bg-gray-200"
          >
            <template #activator="action">
              <div class="modal-detail cursor-pointer" @click="action.open()">
                <component
                  :is="imageType(media) === 'svg+xml' ? 'img' : 'NuxtImg'"
                  v-if="$imageValidation(media.filename)"
                  loading="lazy"
                  :class="`${media.filename
                    .split(/[\\/]/)
                    .pop()
                    .replace(/\.[^/.]+$/, '')}-image detail-image my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
                  :src="media.filename"
                  :alt="media.alt"
                  width="620"
                  height="620"
                  :type="`image/${imageType(media)}`"
                  draggable="false"
                  :modifiers="imageType(media) === 'svg+xml' ? false : { filters: { focal: media.focus ? media.focus : 0 } }"
                  :fit="imageType(media) === 'svg+xml' ? false : 'in'"
                  :format="imageType(media) === 'svg+xml' ? false : 'webp'"
                  :sizes="imageType(media) === 'svg+xml' ? false : 'xs:299px sm:380px md:514px lg:620px'"
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
              </div>
            </template>
            <template #body>
              <NuxtImg
                v-if="$imageValidation(media.filename)"
                :modifiers="{ filters: { focal: media.focus ? media.focus : 0 } }"
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(/\.[^/.]+$/, '')}-image modal-image my-0 mx-auto object-contain object-center select-none cursor-default`"
                width="1920"
                height="1980"
                format="webp"
                fit="in"
                sizes="xs:380px sm:514px md:711px lg:804px xl:1680px 2xl:1920px"
                draggable="false"
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
            <component
              :is="imageType(media) === 'svg+xml' ? 'img' : 'NuxtImg'"
              v-if="$imageValidation(media.filename)"
              loading="lazy"
              :class="`${media.filename
                .split(/[\\/]/)
                .pop()
                .replace(/\.[^/.]+$/, '')}-image detail-image my-0 mx-auto object-contain cursor-pointer object-cover rounded pointer-events-none select-none`"
              :src="media.filename"
              :alt="media.alt"
              width="620"
              height="620"
              :type="`image/${imageType(media)}`"
              draggable="false"
              :modifiers="imageType(media) === 'svg+xml' ? false : { filters: { focal: media.focus ? media.focus : 0 } }"
              :fit="imageType(media) === 'svg+xml' ? false : 'in'"
              :format="imageType(media) === 'svg+xml' ? false : 'webp'"
              :sizes="imageType(media) === 'svg+xml' ? false : 'xs:299px sm:380px md:514px lg:620px'"
            />
            <video
              v-else
              :class="`${media.filename
                .split(/[\\/]/)
                .pop()
                .replace(/\.[^/.]+$/, '')}-video detail-video my-0 mx-auto object-contain object-center rounded pointer-events-none cursor-pointer select-none`"
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
      <div :class="`text-container w-full max-w-full flex flex-col self-start rounded ${!blok.remove_space ? 'p-5' : ''}`" :style="`background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`">
        <div class="detail-text markdown block max-w-none rounded" v-html="$md.render(blok.text)" />
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
