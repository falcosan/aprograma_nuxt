<template>
  <div v-if="show" class="bad_page">{{ content.text }}</div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  computed: {
    show() {
      return this.$route.name === "404";
    },
  },
};
</script>


