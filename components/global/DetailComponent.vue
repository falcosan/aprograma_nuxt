<template>
  <div class="project-description">
    <h1 v-if="blok.title" class="description-title mb-5 font-medium" v-text="blok.title" />
    <div :class="`description-content rounded ${blok.text ? 'grid gap-5 grid-flow-col auto-cols-fr' : 'flex justify-center'}`">
      <ul :class="`image-container grid gap-5 w-full justify-items-center ${blok.text ? `${blok.image.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} ${blok.invert_direction ? 'col-start-2 col-end-2' : ''}` : ''}`" :style="inlineImageStyle">
        <li v-for="image in blok.image" :key="image.id" class="image-item">
          <Modal
            close-mode
            class="modal-project_description h-full"
            modal-style="bg-opacity-90 bg-gray-200"
          >
            <template #activator="action">
              <img
                v-show="!wait"
                height="100%"
                width="100%"
                class="description-image w-screen h-full cursor-pointer object-cover rounded select-none"
                :src="image.filename"
                :alt="image.alt"
                @click="action.open()"
                @load="wait = false"
              >
              <Skeleton :class="`w-screen h-full select-none ${blok.text ? '' : 'mx-auto my-0'}`" :wait="wait" />
            </template>
            <template #body>
              <img class="description-image select-none cursor-default" height="auto" width="auto" :src="image.filename" :alt="image.alt">
            </template>
          </Modal>
        </li>
      </ul>
      <span v-if="blok.text" class="description-text- h-max p-5 rounded break-words" :style="inlineTextStyle ? inlineTextStyle : `background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`" v-text="blok.text" />
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
  },
  data () {
    return {
      wait: true
    }
  }
}
</script>
