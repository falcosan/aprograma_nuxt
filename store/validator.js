
export const state = () => ({
  email: {
    text: '',
    passed: ''
  },
  message: {
    text: '',
    passed: ''
  },
  check: false
})

export const mutations = {
  checkEmail (state, newEmail) {
    state.email.text = newEmail
  },
  checkMessage (state, newMessage) {
    state.message.text = newMessage
  },
  passEmail (state, newEmail) {
    state.email.passed = newEmail
  },
  passMessage (state, newMessage) {
    state.message.passed = newMessage
  },
  checkForm (state, submitForm) {
    state.check = submitForm
  }
}
export const actions = {
  checkValues ({ state, commit }) {
    commit('checkForm', true)
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.text)) {
      commit('passEmail', 'yes')
    } else {
      commit('passEmail', 'no')
    }
    if (state.message.text.length >= 5) {
      commit('passMessage', 'yes')
    } else {
      commit('passMessage', 'no')
    }
  },
  clearValues ({ commit }) {
    commit('passEmail', '')
    commit('checkEmail', '')
    commit('passMessage', '')
    commit('checkMessage', '')
    commit('checkForm', false)
  }
}
