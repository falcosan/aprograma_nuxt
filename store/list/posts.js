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
      starts_with: rootState.language.language === '' ? '[default]/blog' : `${rootState.language.language}/blog`
    })
    commit('setPosts', listPosts.data.stories)
  },
  deletePosts ({ commit }) {
    commit('setPosts', [])
  }
}
