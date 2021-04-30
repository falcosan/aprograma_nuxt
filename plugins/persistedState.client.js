import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'language/language',
    storage: window.localStorage
  })(store)
}
