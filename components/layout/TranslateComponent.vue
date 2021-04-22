<template>
  <div class="translate-container">
    <div
      v-if="translateTransition"
      :class="`current-language cursor-pointer ${styleCurrentLanguage}`"
    >
      <template v-for="selector in blok">
        <span v-if="cutLanguage(selector) === $store.state.data.language || cutLanguage(selector) === 'en' && $store.state.data.language === ''" :key="selector._uid" class="language-item">
          {{ selector.language }}
        </span>
      </template>
    </div>
    <ul
      id="translate-list"
      :class="`translate-list ${styleTranslateList}`"
    >
      <template v-for="language in blok">
        <li
          v-if="translateTransition ? (cutLanguage(language) !== $store.state.data.language && $store.state.data.language !== '' || cutLanguage(language) !== 'en' && $store.state.data.language === '') : true"
          :key="language._uid"
          :class="`translate-item${cutLanguage(language) !== $store.state.data.language && $store.state.data.language !== '' || cutLanguage(language) !== 'en' && $store.state.data.language === '' ? ' text-gray-300' : ''} ${styleTranslateItem} cursor-pointer`"
        >
          <a
            class="translate-link"
            @click="changeLanguage(language.language); $emit('translateAction')"
          >
            <span :class="`translate-language${!$store.state.data.mobile ?' md:hover:text-gray-300' : ''}`">{{ language.language }}</span>
          </a>
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
      this.$store.commit('data/languageMutation', lang)
    },
    cutLanguage (abbr) {
      return abbr.language.toLowerCase().substring(0, 2)
    }
  }
}
</script>
