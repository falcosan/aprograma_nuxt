export const state = () => ({
  projects: []
})

export const mutations = {
  setProjects (state, entries) {
    state.projects = entries
  }
}
