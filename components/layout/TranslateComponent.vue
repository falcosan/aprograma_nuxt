<template>
  <div id="translate" class="translate-container">
    <div
      v-if="translateTransition"
      :class="`current-language cursor-pointer ${styleCurrentLanguage}`"
      @click="$emit('currentLangAction')"
    >
      <template v-for="selector in blok">
        <span v-if="cutLanguage(selector) === $store.state.language.language || cutLanguage(selector) === 'en' && $store.state.language.language === ''" :key="selector._uid" class="language-item">
          {{ selector.language.toUpperCase() }}
        </span>
      </template>
    </div>
    <ul
      id="translate-list"
      :class="`translate-list ${styleTranslateList}`"
    >
      <template v-for="language in blok">
        <li
          v-if="translateTransition ? (cutLanguage(language) !== $store.state.language.language && $store.state.language.language !== '' || cutLanguage(language) !== 'en' && $store.state.language.language === '') : true"
          :key="language._uid"
          :class="`translate-item ${styleTranslateItem} cursor-pointer`"
          @click="changeLanguage(language.language); $emit('translateListAction')"
        >
          <span
            class="translate-language"
          >{{ language.language.toUpperCase() }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    blok: {
      type: Array,
      required: true
    },
    translateTransition: {
      type: Boolean,
      required: true
    },
    styleTranslateItem: {
      type: String,
      default: ''
    },
    styleTranslateList: {
      type: String,
      default: ''
    },
    styleCurrentLanguage: {
      type: String,
      default: ''
    }
  },
  methods: {
    changeLanguage (lang) {
      this.$store.commit('language/languageMutation', lang)
    },
    cutLanguage (abbr) {
      return abbr.language.toLowerCase().substring(0, 2)
    }
  }
}
</script>
