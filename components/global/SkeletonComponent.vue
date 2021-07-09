<template>
  <div v-show="wait" class="skeleton p-5 bg-opacity-60 bg-gray-100">
    <div class="h-full flex items-center justify-center rounded-md shadow opacity-80 bg-white">
      <Icon
        tag="span"
        loader
        class="animate-pulse"
        size="w-24"
      />
    </div>
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
