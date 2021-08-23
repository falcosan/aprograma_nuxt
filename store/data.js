
export const state = () => ({
  error: false,
  windowWidth: 0,
  themeColor: []
})

export const mutations = {
  responsiveMutation (state, newResponsive) {
    state.windowWidth = newResponsive
  },
  themeColorMutation (state, newThemeColor) {
    state.themeColor = newThemeColor
  },
  errorMutation (state, newError) {
    state.error = newError
  }
}
export const actions = {
  responsiveAction ({ commit }) {
    window.addEventListener('resize', function () { commit('responsiveMutation', window.innerWidth) })
  }
}
