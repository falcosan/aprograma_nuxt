<template>
  <nuxt-link
    :to="postLink"
    class="post-teaser block py-4 px-6 border rounded border-gray-500">
    <h2 class="pt-2 pb-4 text-2xl font-bold">
      {{ postContent.name }}
    </h2>
    <p class="pb-6 leading-relaxed">
      {{ postContent.intro }}
    </p>
  </nuxt-link>
</template>
 
<script>
export default {
  props: {
    postContent: {
      type: Object,
      required: true
    },
    postLink: {
      type: String,
      required: true
    }
  }
}
</script>