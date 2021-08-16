<template>
  <div class="detail">
    <h1 v-if="blok.title" :class="`detail-title ${sliderMode || carouselMode || containerMode ? 'm-5 text-xl' : 'mb-5 text-xl xs:text-2xl'}`" v-text="blok.title" />
    <div class="detail-content grid gap-5 md:grid-flow-col auto-cols-fr rounded">
      <ul :class="`image-container grid gap-5 w-full justify-items-center auto-rows-max ${blok.invert_direction ? 'col-start-2 col-end-2' : ''}`" :style="`${inlineImageStyle} grid-template-columns: repeat(${blok.column_container ? $rangeItems(Number(blok.column_container), 3) : blok.image.length}, 1fr)`">
        <li v-for="image in blok.image" :key="image.id" class="image-item w-full">
          <Modal
            v-if="blok.modal_mode"
            close-mode
            class="detail-modal"
            modal-style="bg-opacity-90 bg-gray-200"
          >
            <template #activator="action">
              <nuxt-img
                :modifiers="{ smart: true, filters: { focal: blok.image.focus ? blok.image.focus : 0 } }"
                height="auto"
                width="auto"
                class="detail-image w-screen h-full cursor-pointer object-cover rounded select-none"
                :src="image.filename"
                :alt="image.alt"
                @click.native="action.open()"
              />
            </template>
            <template #body>
              <nuxt-img
                :modifiers="{ smart: true, filters: { focal: blok.image.focus ? blok.image.focus : 0 } }"
                class="detail-image select-none cursor-default"
                height="auto"
                width="auto"
                :src="image.filename"
                :alt="image.alt"
              />
            </template>
          </Modal>
          <div v-else class="detail-image">
            <nuxt-img
              :modifiers="{ smart: true, filters: { focal: blok.image.focus ? blok.image.focus : 0 } }"
              height="auto"
              width="auto"
              class="detail-image w-screen h-full object-cover rounded select-none"
              :src="image.filename"
              :alt="image.alt"
            />
          </div>
        </li>
      </ul>
      <div :class="`detail-text h-max block overflow-hidden rounded break-words font-extralight prose-sm lg:prose-lg ${blok.remove_space ? 'p-5' : ''}`" :style="inlineTextStyle ? inlineTextStyle : `background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`" v-html="$md.render(blok.text)" />
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
  }
}
</script>
