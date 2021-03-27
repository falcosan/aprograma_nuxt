<template>
  <NuxtLink
    :to="blok.path"
    class="link_item inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
  >
    <span>{{ blok.name }}</span>
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
