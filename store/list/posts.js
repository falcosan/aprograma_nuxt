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
      language: this.$storage.get('lang')
    })
    commit('setPosts', listPosts.data.stories)
  },
  deletePosts ({ commit }) {
    commit('setPosts', [])
  }
}
