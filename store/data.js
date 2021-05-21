
export const state = () => ({
  pages: [],
  moved: false,
  windowWidth: 0
})

export const mutations = {
  moveMutation (state, newMove) {
    state.moved = newMove
  },
  responsiveMutation (state, newResponsive) {
    state.windowWidth = newResponsive
  },
  pageMutation (state, newPage) {
    state.pages.push(newPage)
  }
}
export const actions = {
  responsiveAction ({ commit }) {
    window.addEventListener('resize', function () { commit('responsiveMutation', window.innerWidth) })
  }
}
