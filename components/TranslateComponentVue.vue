<template>
  <ul class="translater">
    <li
      v-for="(language, index) in content"
      :key="language._uid"
      :class="`link_translate cursor-pointer mr-4 ${style[index].link_translate}`"
      @click="
        changeLang(language.path_language === 'en' ? '' : language.path_language)
      "
    >
      <span class="translate_lang">/{{ language.language }}/</span>
    </li>
  </ul>
</template>

<script>
import setCustomStyle from "@/plugins/setCustomStyle";
export default {
  mixins: [setCustomStyle],
  props: {
    content: {
      type: Array,
      required: true,
    },
  },

  methods: {
    changeLang(lang) {
      this.$store.commit("changeLang", lang);
      this.$store.dispatch("updateData");
    },
  },
};
</script>