
export const state = () => ({
  language: '',
  email: ''
})

export const mutations = {
  languageMutation (state, newLanguage) {
    state.language = newLanguage.toLowerCase().substring(0, 2) === 'en' ? '' : newLanguage.toLowerCase().substring(0, 2)
  },
  emailMutation (state, newEmail) {
    state.email = newEmail
  }
}
