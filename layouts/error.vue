<template>
  <div class="max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl my-0 mx-auto py-16 px-6">
    <div v-if="error.statusCode === 404" class="max-h-screen grid gap-y-10 grid-flow-row text-center p-20 bg-gray-200">
      <span class="text-9xl font-bold">{{ error.statusCode }}</span>
      <span class="w-max h-max justify-self-center transform rotate-90"> = ( </span>
      <span class="text-2xl"> {{ error.message }}</span>
      <NuxtLink class=" w-max justify-self-center py-3 px-10 filter grayscale bg-gray-600 text-white" to="/">
        Home
      </NuxtLink>
    </div>
    <div v-else class="max-h-screen grid gap-y-10 grid-flow-row text-center p-20 bg-gray-200">
      <span class="text-9xl font-bold">{{ error.statusCode }}</span>
      <span class="w-max h-max justify-self-center transform rotate-90"> = ( </span>
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
