
export default ({ app }, inject) => {
  inject('goBack', () => {
    const fromRoute = `/${app.context.from?.name.split('-')[0]}/`
    app.context.from ? app.router.push(fromRoute) : app.router.go(-1)
  })
}
