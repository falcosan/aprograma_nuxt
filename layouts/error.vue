<template>
  <div class="h-screen">
    <div v-if="error.statusCode === 404" class="h-full flex flex-col justify-center items-center space-y-5 text-center py-10 bg-gray-300">
      <span class="text-9xl font-bold">{{ error.statusCode }}</span>
      <span class="w-max h-max justify-self-center transform rotate-90"> = ( </span>
      <span class="text-2xl"> {{ error.message }}</span>
      <NuxtLink class=" w-max justify-self-center py-3 px-10 filter grayscale bg-gray-600 text-white" to="/">
        Home
      </NuxtLink>
    </div>
    <div v-else class="h-full flex flex-col justify-center items-center space-y-5 text-center py-10 bg-gray-300">
      <span class="text-9xl font-bold">{{ error.statusCode }}</span>
      <span class="w-max h-max justify-self-center transform rotate-90">= (</span>
      <span class="text-2xl"> {{ error.message }}</span>
      <NuxtLink class=" w-max justify-self-center py-3 px-10 filter grayscale bg-gray-600 text-white" to="/">
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
  }
}
</script>
