<template>
  <div v-show="wait" class="skeleton flex items-center justify-center p-5 rounded-md bg-opacity-60 bg-gray-100">
    <Icon
      tag="span"
      loader
      class="animate-pulse"
      size="w-24"
    />
  </div>
</template>
<script>
export default {
  props: {
    wait: {
      type: Boolean,
      required: true
    }
  }
}
</script>
