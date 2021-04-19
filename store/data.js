
export const state = () => ({
  language: '',
  moved: false
})

export const mutations = {
  languageMutation (state, newLanguage) {
    state.language = newLanguage.toLowerCase().substring(0, 2) === 'en' ? '' : newLanguage.toLowerCase().substring(0, 2)
  },
  moveMutation (state) {
    if (!state.moved) {
      state.moved = true
    } else {
      state.moved = false
    }
  }
}
