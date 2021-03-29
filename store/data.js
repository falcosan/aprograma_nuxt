
export const state = () => ({
  story: {
    content: {}
  },
  language: ''
})

export const mutations = {
  dataMutation (state, currentData) {
    state.story = currentData
  },
  languageMutation (state, newLanguage) {
    state.language = newLanguage
  }
}

export const actions = {
  async updateData ({ commit, state }, route) {
    const { data } = await this.$storyapi.get(`cdn/stories/${state.language}/${route}`)
    commit('dataMutation', data.story)
  }
}
