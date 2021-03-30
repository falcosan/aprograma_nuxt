<template>
  <ul class="transition-all duration-200 ease-in-out">
    <li
      v-for="language in blok"
      :key="language._uid"
      :class="`translate-item-${customTranslateItem} cursor-pointer`"
    >
      <a
        class="link-translate"
        @click="
          changeLang(language.language.toLowerCase().substring(0,2) === 'en' ? '' : language.language.toLowerCase().substring(0,2))
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
    }
  },
  computed: {
    customTranslateItem () {
      return (
        this.$customClass('header', 'header py-2 px-4')
      )
    }
  },
  methods: {
    changeLang (lang) {
      this.$store.commit('data/languageMutation', lang)
    }
  }
}
</script>
