<template>
  <span class="cursor-pointer">
    {{ blok.language }}
  </span>
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
