<template>
  <div class="error h-screen">
    <div v-if="error.statusCode === 404" :class="`error-404 absolute w-full max-w-screen-md flex flex-col left-1/2 top-0 transform -translate-x-1/2 translate-y-1/2 justify-center items-center p-20 space-y-5 text-center rounded-b bg-opacity-80 bg-white ${!$device.isDesktop ? '' : 'md:rounded-t'}`">
      <span class="text-7xl">{{ error.statusCode }}</span>
      <Logo class="relative w-max h-max justify-self-center -top-1 filter brightness-0 animate-pulse" width="50" />
      <span class="text-xs xs:text-base sm:text-lg text-center pointer-events-none uppercase italic"> {{ error.message }}</span>
      <NuxtLink class=" w-max justify-self-center py-3 px-4 rounded text-sm filter grayscale bg-gray-600 text-white" to="/">
        Home
      </NuxtLink>
    </div>
    <div v-else :class="`error-500 absolute w-full max-w-screen-md flex flex-col left-1/2 top-0 transform -translate-x-1/2 translate-y-1/2 justify-center items-center p-20 space-y-5 text-center rounded-b bg-opacity-80 bg-white ${!$device.isDesktop ? '' : 'md:rounded-t'}`">
      <span class="text-7xl">{{ error.statusCode }}</span>
      <Logo class="relative w-max h-max justify-self-center -top-1 filter brightness-0 animate-pulse" width="50" />
      <span class="text-xs xs:text-base sm:text-lg text-center pointer-events-none uppercase italic"> {{ error.message }}</span>
      <NuxtLink class=" w-max justify-self-center py-3 px-4 rounded text-sm filter grayscale bg-gray-600 text-white" to="/">
        Home
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  created () {
    this.$noscroll(true)
  },
  beforeDestroy () {
    this.$noscroll(false)
  }
}
</script>
