export const state = () => ({
  language: ''
})

export const mutations = {
  languageMutation (state, newLanguage) {
    state.language = newLanguage
  }
}

// export const actions = {
//   async updateData ({ commit, state }) {
//     const { data } = await this.$storyap.get(`cdn/stories/${state.story.lang}/${state.story.slug}`, {
//       version: 'published'
//     })
//     commit('dataMutation', data.story)
//   }
// }
