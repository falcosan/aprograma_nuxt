<template>
  <div v-if="loading" class="loader">
    <div :class="`bar-container fixed w-full h-0.5 z-40 ${!$device.isDesktop || $store.state.data.windowWidth < 768 ? 'bottom-10' : ''}`">
      <div class="loader-bar absolute h-full filter grayscale bg-gray-800" />
    </div>
    <transition
      appear
      appear-active-class="duration-500"
      enter-active-class="duration-500 in-out"
      enter-class="opacity-0"
      appear-class="opacity-0"
    >
      <div :class="`loader-logo fixed z-50 overflow-hidden bg-white ${!$device.isDesktop || $store.state.data.windowWidth < 768 ? 'top-0 right-1/2 p-1 transform translate-x-1/2 rounded-b-full' : 'h-24 w-24'}`">
        <Logo
          :class="`animate-spin filter opacity-50 contrast-0 brightness-50`"
          :size="`${!$device.isDesktop || $store.state.data.windowWidth < 768 ? 'w-12' : 'w-full'}`"
        />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      setTimeout(() => { this.loading = false }, 1000)
    }
  }
}
</script>

<style scoped>
.loader-bar {
  animation:looping 2s linear infinite;
}

@keyframes looping {
  0% {
    left:0%;
    right:100%;
    width:0%;
  }
  10% {
    left:0%;
    right:75%;
    width:25%;
  }
  90% {
    right:0%;
    left:75%;
    width:25%;
  }
  100% {
    left:100%;
    right:0%;
    width:0%;
  }
}
</style>
