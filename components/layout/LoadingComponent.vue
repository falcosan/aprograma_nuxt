<template>
  <transition enter-active-class="duration-200 linear" leave-active-class="duration-300 linear" enter-class="opacity-0" leave-to-class="opacity-0">
    <div
      v-if="loading"
      class="loading-container fixed h-full w-full flex justify-center items-center inset-0 z-50 overflow-hidden filter grayscale bg-gray-200"
    >
      <Logo
        class="loading-logo w-full flex justify-center filter opacity-50 contrast-50 drop-shadow-md"
        size="w-24"
        role="loading-logo"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  </transition>
</template>
<script>
export default {
  inheritAttrs: false,
  data () {
    return {
      loading: false
    }
  },
  methods: {
    start () {
      if (this.$store.state.data.pages.includes(this.$route.path)) {
        this.loading = true
        this.$noscroll(true)
      }
    },
    finish () {
      if (this.loading) {
        this.loading = false
        this.$noscroll(false)
      }
    }
  }
}
</script>
