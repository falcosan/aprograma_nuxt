<template>
  <transition enter-active-class="duration-500 linear" leave-active-class="duration-500 linear" enter-class="opacity-0" leave-to-class="opacity-0">
    <div
      v-if="loading"
      class="loading-container fixed h-full w-full flex justify-center items-center inset-0 z-50 overflow-hidden filter grayscale bg-gray-600"
    >
      <Logo
        transition-a="loading-logo origin-center-left"
        transition-p="loading-logo origin-center"
        class="loading-logo w-full flex justify-center"
        size="w-32"
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
      this.loading = true
      this.$noscroll(true)
    },
    finish () {
      this.loading = false
      this.$noscroll(false)
    }
  }
}
</script>
<style>
@keyframes progress-indeterminate {
    from {
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -moz-transform:rotate(0deg)
      }
    to {
      transform: rotate(359deg);
      -webkit-transform: rotate(359deg);
      -moz-transform:rotate(359deg)
      }
}
 .loading-logo {
  animation: progress-indeterminate 1.5s linear infinite;
}
</style>
