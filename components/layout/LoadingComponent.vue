<template>
  <div v-if="loading" :class="`loader fixed w-full h-0.5 ${!$device.isDesktop || $store.state.data.windowWidth < 768 ? 'top-10' : ''}`">
    <div class="loader-bar absolute h-full flex justify-center filter drop-shadow-2xl grayscale bg-gray-800" />
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
      this.loading = false
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
