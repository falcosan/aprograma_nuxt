import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    languageMutation (state, newLanguage) {
      state.language = newLanguage.toLowerCase().substring(0, 2) === 'en' ? '' : newLanguage.toLowerCase().substring(0, 2)
    }
  })(store)
}
