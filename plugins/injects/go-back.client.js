
export default ({ app }, inject) => {
  inject('goBack', () => {
    !app.context.from ? app.router.push('/') : app.router.push(`/${app.context.from.name.split('/')[0]}/`)
  })
}
