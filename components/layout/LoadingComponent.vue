<template>
  <div v-if="loading" class="loader">
    <div v-show="loadingBar" :class="`bar-container fixed w-full h-0.5 z-40 bg-white ${!$device.isDesktop || $store.state.data.windowWidth < 768 ? 'bottom-10' : ''}`">
      <div class="loader-bar absolute h-full filter grayscale bg-gray-800" />
    </div>
    <transition
      enter-active-class="duration-300 in-out delay-75"
      enter-class="opacity-0"
      leave-active-class="duration-500 out-in"
      leave-to-class="opacity-0"
    >
      <div v-show="loadingLogo" :class="`loader-logo fixed z-50 overflow-hidden bg-white ${!$device.isDesktop || $store.state.data.windowWidth < 768 ? 'top-0 right-1/2 p-1 transform translate-x-1/2 rounded-b-full' : 'h-24 w-24'}`">
        <Logo
          :class="`logo-spin filter opacity-80 contrast-0 brightness-50`"
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
      loading: false,
      loadingBar: false,
      loadingLogo: false,
      loadingTimer: 0
    }
  },
  methods: {
    start () {
      clearTimeout(this.loadingTimer)
      this.loading = true
      this.loadingBar = true
      this.loadingLogo = true
    },
    finish () {
      this.loadingTimer = setTimeout(() => { this.loading = false }, 1000)
      this.loadingBar = false
      this.loadingLogo = false
    }
  }
}
</script>

<style scoped>
.logo-spin{
  filter: blur(2px);
  animation: spinning 0.5s linear infinite;
}

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
@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
