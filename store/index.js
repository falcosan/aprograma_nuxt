export const actions = {
  async nuxtServerInit ({ commit, state, dispatch },
    { app, store, route, req, res, error, redirect }
  ) {
    await app.$storage.set('lang', '')
  }
}
