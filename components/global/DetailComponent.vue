<template>
  <div class="project-description">
    <h1 v-if="blok.title" class="description-title mb-5 font-semibold" v-text="blok.title" />
    <div :class="`description-content ${blok.text ? 'grid gap-5 grid-flow-col auto-cols-fr' : 'flex'}`">
      <ul :class="`image-container description-container justify-items-center ${blok.text ? `grid gap-5 ${blok.image.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}` : ''}`" :style="inlineImageStyle">
        <li v-for="image in blok.image" :key="image.id" class="image-item">
          <Modal
            close-mode
            class="modal-project_description"
            modal-style="bg-opacity-90 bg-gray-200"
          >
            <template #activator="action">
              <img
                height="100%"
                width="100%"
                class="description-image max-h-96 w-screen md:max-h-2xl cursor-pointer object-contain select-none"
                :src="image.filename"
                :alt="image.alt"
                @click="action.open()"
              >
            </template>
            <template #body>
              <img class="description-image select-none cursor-default" height="auto" width="auto" :src="image.filename" :alt="image.alt">
            </template>
          </Modal>
        </li>
      </ul>
      <span v-if="blok.text" class="description-text- h-max p-5 rounded-md break-words" :style="inlineTextStyle ? inlineTextStyle : `background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`" v-text="blok.text" />
    </div>
  </div>
</template>
<script>
import Modal from '../global/ModalComponent'
export default {
  components: { Modal },
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
