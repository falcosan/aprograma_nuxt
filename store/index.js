import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
 new Vuex.Store({
    state: {
        story: {
            content: {
                body: [],
            },
            slug: "layout/publicn",
            lang: ""
        },
    },
    mutations: {
        dataMutation(state, story, slug) {
            state.story = story
            state.story.slug = slug
        },
        changeLang(state, newLang) {
            state.story.lang = newLang
        }
    },

    actions: {
        updateData({ commit, state }, context, version) {
            return context.app.$storyapi
                .get(`cdn/stories/${state.story.lang}/${state.story.slug}`, {
                    version: version,
                })
                .then((res) => {
                    commit('dataMutation', res.data)
                    return res.data
                })
                .catch((res) => {
                    if (!res.response) {
                        console.error(res)
                        context.error({
                            statusCode: 404,
                            message: 'Failed to receive content form api',
                        })
                    } else {

                        context.error({
                            statusCode: res.response.status,
                            message: res.response.data,
                        })
                    }
                })
        }
    }

})