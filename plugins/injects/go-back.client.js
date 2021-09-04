
export default ({ app }, inject) => {
  inject('goBack', () => {
    app.context.from ? app.router.go(-1) : app.router.push(`/${app.context.route.name.split('-')[0]}/`)
  })
}
