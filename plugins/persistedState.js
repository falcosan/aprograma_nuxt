import createPersistedState from 'vuex-persistedstate'
import cookie from 'cookie'
import Cookies from 'js-cookies'
export default ({ store, req, res }) => {
  createPersistedState({
    key: 'vuex',
    paths: ['language'],
    storage: {
      getItem: key =>
        process.client
          ? Cookies.getJSON(key)
          : cookie.parse(req.headers.cookie || '')[key],
      setItem: (key, value) => {
        if (key !== '@@') {
          process.client
            ? Cookies.set(key, value)
            : res.setHeader('Set-Cookie', cookie.serialize(key, value))
        }
      },
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}
