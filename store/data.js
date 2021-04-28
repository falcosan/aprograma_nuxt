
export const state = () => ({
  language: '',
  moved: false,
  windowWidth: 0,
  mobile: false
})

export const mutations = {
  languageMutation (state, newLanguage) {
    state.language = newLanguage.toLowerCase().substring(0, 2) === 'en' ? '' : newLanguage.toLowerCase().substring(0, 2)
  },
  moveMutation (state, newMove) {
    state.moved = newMove
  },
  responsiveMutation (state, newResponsive) {
    state.windowWidth = newResponsive
  }
}

export const actions = {
  responsiveAction ({ commit }) {
    window.addEventListener('resize', function () { commit('responsiveMutation', window.innerWidth) })
  }
}
