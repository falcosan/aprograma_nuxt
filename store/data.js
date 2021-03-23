// export const state = () => ({
//     story: {},
//     path: "",
// })

// export const mutations = {
//     setData(state, currentPath, currentStory) {
//         state.story = currentStory
//         state.path = currentPath
//     }
// }
// export const actions = {
//     getData({ commit, state }, VMcontext, setPath) {
//         return VMcontext.app.$storyapi.get(`cdn/stories/aprograma/${state.path}`, {
//             version: 'published',
//         })
//             .then((res) => {
//                 return commit('setData', setPath, res.data)

//             })
//     }
// }