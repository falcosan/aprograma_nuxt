<template>
  <div v-if="show" class="projects_page">
    <p
      class="about_text absolute w-1/2 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-green-500 py-6 px-10 text-5xl"
    >
      {{ content.text }}
    </p>
  </div>
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
      return this.$route.name === "projects";
    },
  },
};
</script>


