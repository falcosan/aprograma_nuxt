
export const state = () => ({
  email: {
    text: '',
    passed: ''
  },
  message: {
    text: '',
    passed: ''
  }
})

export const mutations = {
  emailValidation (state, newEmail) {
    state.email.text = newEmail
  },
  messageValidation (state, newMessage) {
    state.message.text = newMessage
  },
  passEmail (state, newEmail) {
    state.email.passed = newEmail
  },
  passMessage (state, newMessage) {
    state.message.passed = newMessage
  }
}
export const actions = {
  checkValues: ({ state, commit }) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.text)) {
      commit('passEmail', 'yes')
    } else {
      commit('passEmail', 'no')
    }
    if (state.message.text && state.message.text.length >= 5) {
      commit('passMessage', 'yes')
    } else {
      commit('passMessage', 'no')
    }
  }
}
