<template>
  <div v-show="wait" class="skeleton p-5 opacity-80">
    <div class="h-full flex items-center justify-center rounded-md bg-white">
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
      type: Object,
      required: true
    }
  }
}
</script>
