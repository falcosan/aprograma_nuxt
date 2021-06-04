
export const state = () => ({
  moved: false,
  windowWidth: 0,
  themeColor: []
})

export const mutations = {
  moveMutation (state, newMove) {
    state.moved = newMove
  },
  responsiveMutation (state, newResponsive) {
    state.windowWidth = newResponsive
  },
  themeColorMutation (state, newThemeColor) {
    state.themeColor = newThemeColor
  }
}
export const actions = {
  responsiveAction ({ commit }) {
    window.addEventListener('resize', function () { commit('responsiveMutation', window.innerWidth) })
  }
}
