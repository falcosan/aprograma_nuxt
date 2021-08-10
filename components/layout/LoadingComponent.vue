<template>
  <div v-if="loading" class="loader">
    <transition
      enter-active-class="duration-300 in-out"
      enter-class="opacity-0"
      leave-active-class="duration-700 out-in"
      leave-to-class="opacity-0"
    >
      <div v-show="loadingLogo" :class="`loader-logo fixed flex items-center justify-center top-0 z-50 overflow-hidden bg-opacity-80 bg-white ${!$device.isDesktop || $store.state.data.windowWidth < 768 ? '-top-0.5 right-1/2 p-1 transform translate-x-1/2 rounded-b-full' : 'h-20 w-20 rounded-br-lg'}`">
        <Logo
          class="logo-spin filter contrast-0 brightness-50"
          :size="`${!$device.isDesktop || $store.state.data.windowWidth < 768 ? 'w-11' : 'w-16'}`"
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
      loadingLogo: false,
      loadingTimer: 0
    }
  },
  methods: {
    start () {
      clearTimeout(this.loadingTimer)
      this.loading = true
      this.loadingLogo = true
    },
    finish () {
      this.loadingTimer = setTimeout(() => { this.loading = false }, 1000)
      this.loadingLogo = false
    }
  }
}
</script>

<style scoped>
.logo-spin{
  filter: blur(1px);
  animation: spinning 0.5s infinite linear;
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
