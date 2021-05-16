<template>
  <div class="modal">
    <slot name="activator" :open="openModal" />
    <transition enter-active-class="duration-500 in-out" enter-class="opacity-0" leave-active-class="duration-500 out-in" leave-to-class="opacity-0">
      <div
        v-if="openEvent || open"
        ref="modal"
        :class="`modal-backdrop fixed inset-0 flex justify-center items-center z-40 py-12 px-2 sm:py-2 sm:px-12 xl:p-20 ${modalStyle} ${closeMode ? 'cursor-pointer' : ''}`"
        tabindex="0"
        @click.self.stop="closeMode ? closeModal() : false"
        @keydown.esc="closeMode ? closeModal() : false"
      >
        <div class="modal-container h-full flex flex-col justify-center">
          <header v-if="hasSlot('header') || closeMode" class="modal-header">
            <slot name="header" />
            <Icon
              close
              class="modal-close fixed top-0 right-0"
              tag="button"
              size="w-14 p-4"
              @click.native.stop="closeModal()"
            />
          </header>
          <section
            v-if="hasSlot('body')"
            :class="`modal-body h-full flex flex-col justify-center ${closeMode ? 'cursor-pointer' : ''}`"
            @click.self.stop="closeMode ? closeModal() : false"
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
    open: {
      type: Boolean,
      default: false
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
  data () {
    return {
      openEvent: false
    }
  },
  watch: {
    openEvent: { handler () { this.checkModal() } },
    open: { handler () { this.checkModal() } }
  },
  beforeDestroy () {
    document.body.classList.remove('noscroll')
  },
  methods: {
    openModal () {
      this.openEvent = true
    },
    closeModal () {
      this.openEvent = false
    },
    checkModal () {
      if (this.openEvent || this.open) {
        this.$nextTick(function () {
          this.$refs.modal.focus({ preventScroll: true })
        })
        document.body.classList.add('noscroll')
      } else {
        document.body.classList.remove('noscroll')
      }
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    }
  }
}
</script>
