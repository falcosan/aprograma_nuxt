<template>
  <li class="link_menu">
    <nuxt-link :to="content.path" class="link_item inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4">
      <span>{{ content.title }}</span></nuxt-link
    >
  </li>
</template>
<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>
