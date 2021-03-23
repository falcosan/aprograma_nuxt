export const state = () => ({
  story: {},
  path: "",
  posts: [],
  loaded: '0',
})

export const mutations = {
  setPosts(state, entries) {
    state.posts = entries
  },
  setLoaded(state, loaded) {
    state.loaded = loaded
  }
}
