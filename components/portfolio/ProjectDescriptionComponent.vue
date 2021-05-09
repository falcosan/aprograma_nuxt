<template>
  <div :class="`project-description grid ${blok.text ? 'lg:grid-cols-3' : ''} gap-5 col-start-1 col-end-4`">
    <ul :class="`image-container description-container grid${blok.image.length > 1 ? ' sm:grid-cols-2' : ' grid-cols-1'} col-start-1 col-end-1 lg:col-end-3 gap-5`" :style="inlineImageStyle">
      <li v-for="image in blok.image" :key="image.id" class="image-item">
        <Modal
          close-mode
          class="modal-project_description"
          modal-style="bg-opacity-90 bg-gray-200"
        >
          <template #activator="props">
            <img
              class="description-image w-full max-h-96 lg:max-h-full object-contain cursor-pointer select-none"
              :src="image.filename"
              :alt="image.alt"
              @click="props.open()"
            >
          </template>
          <template #body>
            <img class="image-description max-h-full select-none cursor-default" :src="image.filename" :alt="image.alt">
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
