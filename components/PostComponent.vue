<template>
  <div
    class="my-24 mx-auto">
    <h1>{{ blok.title }}</h1>
  </div>
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