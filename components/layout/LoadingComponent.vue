<template>
  <div
    v-if="loading"
    class="indeterminate w-full h-screen flex items-center bg-gray-200 fixed inset-0 z-50 overflow-hidden"
  >
    <div
      class="progressbar w-full h-px bg-black"
      role="progressbar"
      aria-valuenow="100"
      aria-valuemin="0"
      aria-valuemax="100"
    />
  </div>
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
<style scoped>
@keyframes progress-indeterminate {
  0% {
    width: 0%;
    left: -100%;
  }
  60% {
    right: -100%;
    width: 100%;
  }
  to {
    left: 100%;
    width: 0;
  }
}
.progressbar {
  transition: width 0.25s ease;
}
.indeterminate .progressbar {
  animation: progress-indeterminate 1.4s ease infinite;
}
</style>
