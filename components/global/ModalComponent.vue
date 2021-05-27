<template>
  <div class="modal">
    <slot name="activator" :open="openModal" />
    <transition enter-active-class="duration-500 in-out" enter-class="opacity-0" leave-active-class="duration-500 out-in" leave-to-class="opacity-0">
      <div
        v-if="openEvent || open"
        ref="modal"
        :class="`modal-backdrop fixed flex justify-center inset-0 px-5 pt-10 lg:pt-5 lg:px-12 z-50 overflow-auto ${modalStyle} ${closeMode ? 'cursor-pointer' : ''}`"
        tabindex="0"
        @click.self.stop="closeMode ? closeModal() : false"
        @keydown.esc="closeMode ? closeModal() : false"
      >
        <div class="modal-container">
          <header v-if="hasSlot('header') || closeMode" class="modal-header">
            <slot name="header" />
            <Icon
              close
              class="modal-close fixed top-0 right-0 filter invert grayscale bg-gray-300"
              tag="button"
              size="p-2 lg:p-3 w-9 lg:w-12"
              @click.native.stop="closeModal()"
            />
          </header>
          <section
            v-if="hasSlot('body')"
            :class="`modal-body h-full ${closeMode ? 'cursor-pointer' : ''}`"
          >
            <transition appear appear-active-class="duration-300" appear-class="opacity-0">
              <div class="body-container h-full grid gap-5" @click.self.stop="closeMode ? closeModal() : false">
                <slot name="body" />
              </div>
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
    openEvent () { this.checkModal() },
    open () { this.checkModal() }
  },
  beforeDestroy () {
    this.$noscroll(false)
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
        this.$noscroll(true)
      } else {
        this.$noscroll(false)
      }
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    }
  }
}
</script>
<style>
.body-container > *{
  max-height: calc(100vh - 5rem);
  margin: auto 0;
  box-sizing: content-box;
}
.body-container > *:last-child{
  padding-bottom: 2.5rem;
}
@media screen and (min-width: 1024px) {
  .body-container > *{
    max-height: calc(100vh - 2.5rem);
  }
  .body-container > *:last-child{
    padding-bottom: 1.25rem;
  }
}
</style>
