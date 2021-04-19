<template>
  <NuxtLink
    :to="blok.path"
    class="item-link"
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
