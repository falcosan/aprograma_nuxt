<template>
  <transition enter-active-class="duration-300 in-out" leave-active-class="duration-300 out-in" enter-class="-translate-y-full opacity-0" leave-to-class="-translate-y-full opacity-0">
    <div v-if="openModal" class="modal-backdrop fixed inset-0 flex justify-center items-center z-40 p-2 sm:p-7 md:p-14 xl:p-16 cursor-pointer" tabindex="0" @click.self.stop="$emit('update:openModal', !openModal)" @keydown.esc="$emit('update:openModal', !openModal)">
      <div :class="`modal cursor-default ${modalStyle}`">
        <header class="modal-header">
          <slot name="header" />
          <Icon
            close
            class="modal-close fixed top-5 right-5"
            tag="button"
            size="w-6"
            @click.native.stop="$emit('update:openModal', !openModal)"
          />
        </header>
        <section class="modal-body">
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
    openModal: {
      type: Boolean,
      required: true
    },
    modalStyle: {
      type: String,
      default: ''
    }
  },
  watch: {
    openModal: { handler () { this.checkModal() } }
  },
  methods: {
    checkModal () {
      if (this.openModal) {
        this.$nextTick(function () {
          this.$el.focus()
        })
        document.body.classList.add('noscroll')
      } else {
        document.body.classList.remove('noscroll')
      }
    }
  }
}
</script>
