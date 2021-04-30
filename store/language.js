export const state = () => ({
  language: ''
})

export const mutations = {
  languageMutation (state, newLanguage) {
    state.language = newLanguage
  }
}

export const actions = {
  languageAction ({ commit }, setLanguage) {
    commit('languageMutation', setLanguage.toLowerCase().substring(0, 2) === 'en' ? '' : setLanguage.toLowerCase().substring(0, 2))
  }
}
