export const state = () => ({
  items: []
})
export const mutations = {
  setProjects (state, entries) {
    state.items = entries
  }
}
export const actions = {
  async addProjects ({ commit, rootState }) {
    const listProjects = await this.$storyapi.get('cdn/stories', {
      language: rootState.language.language
    })
    commit('setProjects', listProjects.data.stories)
  },
  deleteProjects ({ commit }) {
    commit('setProjects', [])
  }
}
