<template>
  <div class="modal">
    <slot name="activator" :open="open = true" />
    <transition enter-active-class="duration-500 in-out" enter-class="opacity-0" leave-active-class="duration-500 out-in" leave-to-class="opacity-0">
      <div
        v-if="open"
        ref="modal"
        :class="`modal-backdrop fixed inset-0 flex justify-center items-center z-40 py-12 px-2 sm:py-2 sm:px-12 xl:p-20 ${modalStyle} ${closeMode ? 'cursor-pointer' : ''}`"
        tabindex="0"
        @click.self.stop="closeMode ? open = false : false"
        @keydown.esc="closeMode ? open = false : false"
      >
        <div class="modal-container h-full flex flex-col justify-center" @click.self.stop="closeMode ? open = false : false">
          <header class="modal-header">
            <slot name="header" />
            <Icon
              v-if="closeMode"
              close
              class="modal-close fixed top-0 right-0 lg:top-5 lg:right-5"
              tag="button"
              size="w-6"
              @click.native.stop="open = false"
            />
          </header>
          <section
            :class="`modal-body flex flex-col justify-center shadow-lg ${closeMode ? 'cursor-pointer' : ''}`"
          >
            <transition appear appear-active-class="duration-300" appear-class="opacity-0">
              <slot name="body" />
            </transition>
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    closeMode: {
      type: Boolean,
      default: false
    },
    modalStyle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      open: false
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
