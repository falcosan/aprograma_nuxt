
export const state = () => ({
  windowWidth: 0
})

export const mutations = {
  responsiveMutation (state, newResponsive) {
    state.windowWidth = newResponsive
  }
}
export const actions = {
  responsiveAction ({ commit }) {
    window.addEventListener('resize', function () { commit('responsiveMutation', window.innerWidth) })
  }
}
