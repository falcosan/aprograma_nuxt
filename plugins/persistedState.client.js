import createPersistedState from 'vuex-persistedstate'
export default ({ store }) => {
  createPersistedState({
    paths: ['language'],
    key: 'vuex'
  })(store)
}
