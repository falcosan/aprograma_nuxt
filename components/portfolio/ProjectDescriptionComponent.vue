<template>
  <div :class="`project-description grid gap-5 ${blok.text ? 'md:grid-cols-3' : ''}`">
    <ul :class="`image-container description-container grid col-start-1 col-end-1 md:col-end-3 justify-items-center gap-5 ${blok.image.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`" :style="inlineImageStyle">
      <li v-for="image in blok.image" :key="image.id" class="image-item">
        <Modal
          close-mode
          class="modal-project_description"
          modal-style="bg-opacity-90 bg-gray-200"
        >
          <template #activator="action">
            <img
              class="description-image w-full h-full max-h-96 md:max-h-full cursor-pointer object-contain select-none"
              :src="image.filename"
              :alt="image.alt"
              @click="action.open()"
            >
          </template>
          <template #body>
            <img class="image-description max-h-full max-w-full select-none cursor-default" :src="image.filename" :alt="image.alt">
          </template>
        </Modal>
      </li>
    </ul>
    <span v-if="blok.text" class="description-text h-max p-5 break-words" :style="inlineTextStyle" v-text="blok.text" />
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
