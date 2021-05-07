<template>
  <transition enter-active-class="duration-300 in-out" leave-active-class="duration-300 out-in" enter-class="-translate-y-full opacity-0" leave-to-class="-translate-y-full opacity-0">
    <div
      v-if="open"
      ref="modal"
      :class="`modal-backdrop fixed inset-0 flex justify-center items-center z-40 p-2 sm:p-14 xl:p-20 ${closeMode ? 'cursor-pointer' : ''}`"
      tabindex="0"
      @click.self.stop="closeMode ? $emit('close') : false"
      @keydown.esc="closeMode ? $emit('close') : false"
    >
      <div :class="`modal h-full ${modalStyle} cursor-default`">
        <header class="modal-header">
          <slot name="header" />
          <Icon
            v-if="closeMode"
            close
            class="modal-close fixed top-0 right-0 md:top-5 md:right-5"
            tag="button"
            size="w-6"
            @click.native.stop="$emit('close')"
          />
        </header>
        <section :class="`modal-body h-full flex flex-col justify-center ${closeMode ? 'cursor-pointer' : ''}`" @click.self.stop="closeMode ? $emit('close') : false">
          <slot name="body" />
        </section>
        <footer class="modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
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
    modalStyle: {
      type: String,
      default: ''
    }
  },
  watch: {
    open: { handler () { this.checkModal() } }
  },
  methods: {
    checkModal () {
      if (this.open) {
        this.$nextTick(function () {
          this.$refs.modal.focus({ preventScroll: true })
        })
        document.body.classList.add('noscroll')
      } else {
        document.body.classList.remove('noscroll')
      }
    }
  }
}
</script>
