<template>
  <div class="modal">
    <slot name="activator" :open="openModal" />
    <transition enter-active-class="duration-200 in-out" enter-class="opacity-0" leave-active-class="duration-200 out-in" leave-to-class="opacity-0">
      <div
        v-show="openEvent || open"
        ref="modal"
        :class="`modal-backdrop fixed flex justify-center inset-0 z-50 overflow-auto focus:outline-none ${modalStyle} ${closeMode ? 'cursor-pointer' : ''}`"
        tabindex="0"
        @keydown.esc="closeMode ? closeModal() : ''"
        @click.self.stop="closeModal()"
      >
        <div class="modal-container flex items-center" @click.self.stop="closeMode ? closeModal() : ''">
          <header v-if="hasSlot('header') || closeMode" class="modal-header">
            <slot name="header" />
            <Icon
              close
              class="modal-close fixed top-0 right-0 rounded-bl filter invert grayscale bg-gray-300"
              tag="button"
              size="p-3 w-10"
              @click.native.stop="closeModal()"
            />
          </header>
          <section
            v-if="hasSlot('body')"
            :class="`modal-body h-auto px-5 lg:px-12 ${closeMode ? 'cursor-pointer' : ''}`"
            @click.self.stop="closeMode ? closeModal() : ''"
          >
            <transition appear appear-active-class="duration-300" appear-class="opacity-0">
              <div class="body-container grid gap-10 grid-flow-row-dense" @click.self.stop="closeMode ? closeModal() : ''">
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
        document.body.appendChild(this.$refs.modal)
        this.$nextTick(function () {
          this.$refs.modal.focus({ preventScroll: true })
        })
        this.$noscroll(true)
      } else {
        this.$refs.modal.parentNode.removeChild(this.$refs.modal)
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
.body-container{
  max-height: calc(100vh - 90px);
}
.body-container > *:not(hr) {
  max-height: inherit;
  align-self: flex-end;
  width: auto;
  min-width: 30vw;
  object-fit: contain;
}
.body-container > *:first-child{
  box-sizing: content-box;
}
.body-container > *:last-child:not(:first-child){
  padding-bottom: 3rem;
}
</style>
