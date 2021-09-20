export const state = () => ({
  items: []
})
export const mutations = {
  setPosts (state, entries) {
    state.items = entries
  }
}
export const actions = {
  async addPosts ({ commit, rootState }) {
    const listPosts = await this.$storyapi.get('cdn/stories', {
      language: rootState.language.language
    })
    commit('setPosts', listPosts.data.stories)
  },
  deletePosts ({ commit }) {
    commit('setPosts', [])
  }
}
