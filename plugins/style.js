export default ({ app }, inject) => {
  inject('customClass', (elementName, style) => {
    if (app.context.route.name.includes(elementName) || app.store.state.values.nameElement.includes(elementName)) {
      return style
    }
  })
}
