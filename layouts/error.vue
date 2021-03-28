<template>
  <div>
    <h1 v-if="error.statusCode === 404">
      {{ error.message }}
    </h1>
    <h1 v-else>
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
