<template>
  <ul class="rounded-r-2xl transition-all duration-200 ease-in-out">
    <li
      v-for="language in blok"
      :key="language._uid"
      class="translate-item cursor-pointer"
    >
      <a
        class="link-translate"
        @click="
          changeLang(language.language.toLowerCase().substring(0,2) === 'en' ? '' : language.language.toLowerCase().substring(0,2))
        "
      >
        <span class="translate-lang">{{ language.language }}</span>
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
      this.$store.commit('data/languageMutation', lang)
    }
  }
}
</script>
