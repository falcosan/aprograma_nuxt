export const state = () => ({
  posts: []
})

export const mutations = {
  setPosts (state, entries) {
    state.posts = entries
  }
}
