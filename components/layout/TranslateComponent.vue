<template>
  <ul id="translate" class="list-translate w-full">
    <li
      v-for="language in blok"
      :key="language._uid"
      :class="`${styleTranslateItem} cursor-pointer`"
    >
      <a
        class="link-translate"
        @click="
          changeLang(language.language)
        "
      >
        <span class="translate-lang hover:text-gray-400 hover:text-underline">{{ language.language }}</span>
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
    },
    styleTranslateItem: String
  },
  methods: {
    changeLang (lang) {
      this.$store.commit('data/languageMutation', lang)
    }
  }
}
</script>
