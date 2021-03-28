export const state = () => ({
  language: ''
})

export const mutations = {
  languageMutation (state, newLanguage) {
    state.language = newLanguage
  }
}
