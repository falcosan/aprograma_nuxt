export const state = () => ({
  nameElement: []
})

export const mutations = {
  setName (state, currentName) {
    state.nameElement.unshift(currentName.toLowerCase())
  }
}
