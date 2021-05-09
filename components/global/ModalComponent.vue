<template>
  <div
    v-if="open"
    ref="modal"
    :class="`modal-backdrop fixed inset-0 flex justify-center items-center z-40 py-12 px-2 sm:py-2 sm:px-12 xl:p-20 ${closeMode ? 'cursor-pointer' : ''}`"
    tabindex="0"
    @click.self.stop="closeMode ? closeModal() : false"
    @keydown.esc="closeMode ? closeModal() : false"
  >
    <div :class="`modal h-full ${modalStyle} cursor-default`">
      <header class="modal-header">
        <slot name="header" />
        <Icon
          v-if="closeMode"
          close
          class="modal-close fixed top-0 right-0 lg:top-5 lg:right-5"
          tag="button"
          size="w-6"
          @click.native.stop="closeModal()"
        />
      </header>
      <section
        :class="`modal-body h-full flex flex-col justify-center ${closeMode ? 'cursor-pointer' : ''}`"
        @click.self.stop="closeMode ? closeModal() : false"
      >
        <transition appear appear-active-class="duration-300 in-out" appear-class="opacity-0">
          <slot name="body" />
        </transition>
        <div v-if="slideMode" class="controls-container flex justify-around mt-5">
          <Icon
            previous
            class="modal-previous"
            tag="button"
            size="w-6"
            @click.native.prevent="$emit('next')"
          />
          <Icon
            next
            class="modal-next"
            tag="button"
            size="w-6"
            @click.native.prevent="$emit('previous')"
          />
        </div>
      </section>
      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true
    },
    closeMode: {
      type: Boolean,
      default: false
    },
    slideMode: {
      type: Boolean,
      default: false
    },
    modalStyle: {
      type: String,
      default: ''
    }
  },
  watch: {
    open: { handler () { this.checkModal() } }
  },
  methods: {
    closeModal () {
      this.$emit('close', document.body.classList.remove('noscroll'))
    },
    checkModal () {
      if (this.open) {
        this.$nextTick(function () {
          this.$refs.modal.focus({ preventScroll: true })
        })
        document.body.classList.add('noscroll')
      }
    }
  }
}
</script>
