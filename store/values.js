export const state = () => ({
  nameElement: []
})

export const mutations = {
  setName (state, currentName) {
    state.nameElement.unshift(currentName)
  }
}

export const actions = {
  setElementsName ({ commit }, setName) {
    commit('setName', setName.toLowerCase())
  }
}
