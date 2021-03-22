<template>
  <div v-if="show" class="about_page">
    <p
      class="about_text absolute w-1/2 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-300 py-6 px-10 text-5xl"
    >
      <TranslateComponentVue
        class="flex justify-end w-full text-base mb-5"
        :content="contentByName('TranslateComponentVue')"
      />
      {{ content.text }}
    </p>
  </div>
</template>

<script>
import TranslateComponentVue from "@/components/TranslateComponentVue.vue";
import setContentByName from "@/plugins/setContentByName";
export default {
  components: { TranslateComponentVue },
  mixins: [setContentByName],
  props: {
    content: {
      type: Object,
      required: true,
    },
  },

  computed: {
    show() {
      return this.$route.name === "about";
    },
  },
};
</script>


