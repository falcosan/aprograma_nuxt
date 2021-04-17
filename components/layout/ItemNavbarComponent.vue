<template>
  <NuxtLink
    :to="blok.path"
    class="item-link inline-block text-gray-600 no-underline hover:text-gray-300 py-2 px-4"
  >
    <span class="item-text">{{ blok.title }}</span>
  </NuxtLink>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
