<template>
  <div class="error h-screen">
    <div v-if="error.statusCode === 404" :class="`error-404 absolute w-full flex flex-col left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-full justify-center items-center p-5 space-y-5 text-center rounded-b ${!$device.isDesktop ? '' : 'md:rounded-t'}`">
      <span class="text-7xl">{{ error.statusCode }}</span>
      <span class="w-max h-max justify-self-center transform rotate-90">=(</span>
      <span class="text-xs xs:text-base sm:text-lg text-center pointer-events-none uppercase italic"> {{ error.message }}</span>
      <NuxtLink class=" w-max justify-self-center py-3 px-4 rounded text-sm filter grayscale bg-gray-600 text-white" to="/">
        Home
      </NuxtLink>
    </div>
    <div v-else :class="`error-500 absolute w-full flex flex-col left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-full justify-center items-center p-5 space-y-5 text-center rounded-b ${!$device.isDesktop ? '' : 'md:rounded-t'}`">
      <span class="text-7xl">{{ error.statusCode }}</span>
      <span class="w-max h-max justify-self-center transform rotate-90">=(</span>
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
