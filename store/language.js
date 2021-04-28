export const state = () => ({
  language: ''
})

export const mutations = {
  languageMutation (state, newLanguage) {
    state.language = newLanguage.toLowerCase().substring(0, 2) === 'en' ? '' : newLanguage.toLowerCase().substring(0, 2)
  }
}
