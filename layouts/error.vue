<template>
  <div class="py-10 md:py-6">
    <h1 v-if="error.statusCode === 404">
      {{ error.statusCode }}
      {{ error.message }}
    </h1>
    <h1 v-else>
      {{ error.statusCode }}
      {{ error.message }}
    </h1>
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
