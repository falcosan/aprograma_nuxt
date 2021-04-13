<template>
  <button class="back-container relative cursor-pointer focus:outline-none">
    <svg
      width="24"
      height="24"
      :class="`back-svg ${size} fill-current text-${color}`"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" /></svg>
  </button>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'black'
    }
  }
}
</script>
