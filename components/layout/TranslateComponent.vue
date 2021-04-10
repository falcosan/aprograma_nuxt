<template>
  <div class="translate-container">
    <div
      :class="`current-language w-full relative z-10 flex items-center justify-center cursor-pointer ${styleCurrentLanguage}`"
    >
      <template v-for="selector in blok">
        <span v-if="cutLanguage(selector) === $store.state.data.language || cutLanguage(selector) === 'en' && $store.state.data.language === ''" :key="selector._uid" class="">
          {{ selector.language }}
        </span>
      </template>
    </div>
    <ul
      id="translate-list"
      :class="`translate-list ${styleTranslateList} flex flex-col`"
    >
      <template v-for="language in blok">
        <li
          v-if="cutLanguage(language) !== $store.state.data.language && $store.state.data.language !== '' || cutLanguage(language) !== 'en' && $store.state.data.language === ''"
          :key="language._uid"
          :class="`translate-item ${styleTranslateItem} cursor-pointer`"
        >
          <a

            class="translate-link"
            @click="
              changeLanguage(language.language)
            "
          >
            <span class="translate-language hover:text-gray-400 hover:text-underline">{{ language.language }}</span>
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
    },

    showTranslate: Boolean
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
