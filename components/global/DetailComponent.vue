<template>
  <div class="project-description">
    <h1 v-if="blok.title" class="description-title p-5 text-lg font-extralight" v-text="blok.title" />
    <div :class="`description-content rounded ${blok.text ? 'grid gap-5 md:grid-flow-col auto-cols-fr' : 'flex justify-center'}`">
      <ul :class="`image-container grid gap-5 w-full justify-items-center auto-rows-max ${blok.text ? `${blok.invert_direction ? 'col-start-2 col-end-2' : ''}` : ''}`" :style="`${inlineImageStyle} grid-template-columns: repeat(${blok.column_container ? $rangeItems(Number(blok.column_container), 3) : blok.image.length}, 1fr)`">
        <li v-for="image in blok.image" :key="image.id" class="image-item w-full">
          <Modal
            v-if="blok.modal_mode"
            close-mode
            class="modal-project_description"
            modal-style="bg-opacity-90 bg-gray-200"
          >
            <template #activator="action">
              <nuxt-img
                height="100%"
                width="100%"
                class="description-image w-screen h-full cursor-pointer object-cover rounded select-none"
                :src="image.filename"
                :alt="image.alt"
                @click="action.open()"
              />
            </template>
            <template #body>
              <nuxt-img
                class="description-image select-none cursor-default"
                height="auto"
                width="auto"
                :src="image.filename"
                :alt="image.alt"
              />
            </template>
          </Modal>
          <div v-else class="project-description">
            <nuxt-img

              height="100%"
              width="100%"
              class="description-image w-screen h-full object-cover rounded select-none"
              :src="image.filename"
              :alt="image.alt"
            />
          </div>
        </li>
      </ul>
      <span v-if="blok.text" :class="`description-text- h-max block rounded break-words ${blok.background_color.color ? 'p-5' : ''}`" :style="inlineTextStyle ? inlineTextStyle : `background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`" v-html="$md.render(blok.text)" />
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
    inlineImageStyle: {
      type: String,
      default: ''
    },
    inlineTextStyle: {
      type: String,
      default: ''
    }
  }
}
</script>
