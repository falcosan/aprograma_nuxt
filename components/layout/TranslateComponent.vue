<template>
  <ul class="translate">
    <li
      v-for="language in blok"
      :key="language._uid"
      class="link_translate cursor-pointer mr-4"
    >
      <a
        @click="
          changeLang(language.language.toLowerCase().substring(0,2) === 'en' ? '' : language.language.toLowerCase().substring(0,2))
        "
      >
        <span class="translate_lang">{{ language.language }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    blok: {
      type: Array,
      required: true
    }
  },

  methods: {
    changeLang (lang) {
      this.$store.commit('language/languageMutation', lang)
    }
  }
}
</script>
