export const state = () => ({
  items: [],
  itemRoute: ''
})

export const mutations = {
  setItems (state, entries) {
    state.items = entries
  },
  setItemsRoute (state, route) {
    state.itemRoute = route
  }
}

export const actions = {
  async addItems ({ commit, state, rootState }, currentRoute) {
    commit('setItemsRoute', currentRoute)
    const listItems = await this.$storyapi.get('cdn/stories', {
      starts_with: rootState.data.language === '' ? `[default]/${state.itemRoute}` : `${rootState.data.language}/${state.itemRoute}`
    })
    commit('setItems', listItems.data.stories)
  }
}
