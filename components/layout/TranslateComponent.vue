<template>
  <div class="translate-container text-xs">
    <div
      v-if="translateTransition"
      :class="`current-language cursor-pointer ${styleCurrentLanguage}`"
      @click="$emit('currentLangAction')"
    >
      <template v-for="selector in blok">
        <span v-if="cutLanguage(selector) === $storage.get('lang') || cutLanguage(selector) === 'en' && $storage.get('lang') === ''" :key="selector._uid" class="language-item">
          {{ selector.language.toUpperCase() }}
        </span>
      </template>
    </div>
    <ul
      :class="`translate-list ${styleTranslateList}`"
    >
      <template v-for="language in blok">
        <li
          v-if="translateTransition ? cutLanguage(language) !== $storage.get('lang') && $storage.get('lang') !== '' || cutLanguage(language) !== 'en' && $storage.get('lang') === '' : true"
          :key="language._uid"
          :class="`translate-item cursor-pointer ${styleTranslateItem} ${!translateTransition && (cutLanguage(language) === $storage.get('lang') || cutLanguage(language) === 'en' && $storage.get('lang') === '') ? 'filter grayscale bg-gray-500 text-white' : ''}`"
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
      default: false
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
      this.$storage.set('lang', lang.toLowerCase().substring(0, 2) === 'en' ? '' : lang.toLowerCase().substring(0, 2))
      this.$store.dispatch('language/languageAction', lang)
    },
    cutLanguage (abbr) {
      return abbr.language.toLowerCase().substring(0, 2)
    }
  }
}
</script>
