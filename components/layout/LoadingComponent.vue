<template>
  <div v-if="loading" class="loader">
    <div v-if="!$device.isDesktop && $store.state.data.windowWidth < 768" class="loader-bar">
      <transition
        enter-active-class="duration-100 in-out"
        enter-class="opacity-0"
        leave-active-class="duration-100 out-in"
        leave-to-class="opacity-0"
      >
        <div v-show="loadingItem" class="bar-container fixed h-0.5 w-full bottom-12 z-50 overflow-hidden bg-gray-200">
          <div class="loading-bar absolute -left-1/2 h-full w-1/2 filter grayscale bg-gray-800" />
        </div>
      </transition>
    </div>
    <div v-else class="loader-logo">
      <div v-show="loadingItem" class="logo-container fixed h-20 w-20 flex items-center justify-center top-0 z-50 overflow-hidden rounded-br-lg bg-white">
        <Logo
          class="loading-logo filter opacity-50 contrast-0 brightness-50"
          size="w-16"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      loadingItem: false,
      loadingTimer: 0
    }
  },
  methods: {
    start () {
      clearTimeout(this.loadingTimer)
      this.loading = true
      this.loadingItem = true
    },
    finish () {
      this.loadingTimer = setTimeout(() => { this.loading = false }, 1000)
      this.loadingItem = false
    }
  }
}
</script>

<style scoped>
.loading-logo{
  filter: blur(0.5px);
  animation: spinning 0.5s linear infinite;
}

.loading-bar {
  animation: loading 1.5s ease-in 0.5s infinite;
}

@keyframes loading {
 0% {
  transform:translateX(0)
 }
 to {
  transform:translateX(400%)
 }
}
@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
