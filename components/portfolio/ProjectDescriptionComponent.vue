<template>
  <div :class="`project-description grid ${blok.text ? 'lg:grid-cols-3' : ''} gap-5 col-start-1 col-end-4`">
    <ul :class="`image-container description-container grid${blok.image.length > 1 ? ' sm:grid-cols-2' : ' grid-cols-1'} col-start-1 col-end-1 lg:col-end-3 gap-5`" :style="inlineImageStyle">
      <li v-for="(image, index) in blok.image" :key="image.id" class="image-item" @click="showModal = index">
        <img
          class="description-image w-full max-h-96 lg:max-h-full object-contain cursor-pointer select-none"
          :src="image.filename"
          :alt="image.alt"
        >
        <Modal
          close-mode
          :slide-mode="blok.image.length > 1"
          :open="showModal === index"
          class="modal-image bg-gray-200 bg-opacity-90"
          modal-style="shadow-sm"
          @next="showModal <= 0 ? showModal = false : index--"
          @previous="showModal + 1 === blok.image.length ? showModal = false : index++"
          @close="showModal = false"
        >
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
  },
  data () {
    return {
      showModal: false
    }
  }
}
</script>
