<template>
  <div class="error h-full">
    <div v-if="error.statusCode === 404" :class="`error-404 h-full flex flex-col justify-center items-center p-10 space-y-5 text-center rounded-b ${!$device.isDesktop ? '' : 'md:rounded-t'}`">
      <span class="text-7xl font-medium">{{ error.statusCode }}</span>
      <span class="w-max h-max justify-self-center transform rotate-90">=(</span>
      <span class="text-lg sm:text-2xl"> {{ error.message }}</span>
      <NuxtLink class=" w-max justify-self-center py-3 px-8 filter grayscale bg-gray-600 text-white" to="/">
        Home
      </NuxtLink>
    </div>
    <div v-else :class="`error-500 h-full flex flex-col justify-center items-center p-10 space-y-5 text-center rounded-b ${!$device.isDesktop ? '' : 'md:rounded-t'}`">
      <span class="text-7xl font-medium">{{ error.statusCode }}</span>
      <span class="w-max h-max justify-self-center transform rotate-90">=(</span>
      <span class="text-lg sm:text-2xl"> {{ error.message }}</span>
      <NuxtLink class=" w-max justify-self-center py-3 px-8 filter grayscale bg-gray-600 text-white" to="/">
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
    this.$store.commit('data/errorMutation', true)
  },
  beforeDestroy () {
    this.$store.commit('data/errorMutation', false)
  }
}
</script>
