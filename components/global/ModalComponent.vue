<template>
  <div v-if="$store.state.data.modal" class="modal-backdrop fixed inset-0 flex justify-center items-center p-5 z-40" tabindex="0" @click.self="$store.commit('data/modalMutation', false)" @keydown.esc="$store.commit('data/modalMutation', false)">
    <div :class="`modal ${modalStyle}`">
      <header class="modal-header">
        <slot name="header" />
        <Icon
          close
          class="modal-close fixed top-5 right-5"
          tag="button"
          size="w-6"
          @click.native="$store.commit('data/modalMutation', false)"
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
</template>
<script>
export default {
  props: {
    modalStyle: {
      type: String,
      default: ''
    }
  },
  watch: {
    '$store.state.data.modal': { handler () { this.checkModal() } }
  },
  methods: {
    checkModal () {
      if (this.$store.state.data.modal) {
        this.$nextTick(function () {
          this.$el.focus()
        })
        window.scrollTo(0, 0)
        document.body.classList.add('noscroll')
      } else {
        document.body.classList.remove('noscroll')
      }
    }
  }
}
</script>
