
export const state = () => ({
  moved: false,
  windowWidth: 0,
  modal: false
})

export const mutations = {
  moveMutation (state, newMove) {
    state.moved = newMove
  },
  responsiveMutation (state, newResponsive) {
    state.windowWidth = newResponsive
  },
  modalMutation (state, newModal) {
    state.modal = newModal
  }
}

export const actions = {
  responsiveAction ({ commit }) {
    window.addEventListener('resize', function () { commit('responsiveMutation', window.innerWidth) })
  }
}
