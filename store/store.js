import Vue from 'vue'
import Vuex from 'vuex'
import api from '../utils/api';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        story: {
            content: {
                body: [],
            },
            slug: "public",
            lang: ""
        },
    },
    getters: {
        currentData: state => {
            return state.story
        },
    },
    mutations: {
        dataMutation(state, story) {
            state.story = story
        },
        changeLang(state, newLang) {
            state.story.lang = newLang
        }
    },
    actions: {
        async updateData({ commit, state }) {
            const { data } = await api.get(`cdn/stories/${state.story.lang}/${state.story.slug}`, {
                version: 'published'
            })
            commit('dataMutation', data.story)
        }
    }
})