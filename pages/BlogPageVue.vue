<template>
  <div v-if="show" class="blog_page">
    <PostComponentVue
      v-for="post in content.body"
      :key="post._uid"
      :content="post"
    />
  </div>
</template>

<script>
import PostComponentVue from "@/components/PostComponentVue";
export default {
  components: { PostComponentVue },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  computed: {
    show() {
      return this.$route.name === "blog";
    },
  },
};
</script>


