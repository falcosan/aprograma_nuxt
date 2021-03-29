export default ({ app }, inject) => {
  inject('customClass', (elementName, style) => {
    if (app.context.route.name.includes(elementName) || app.store.state.classes.nameElement.includes(elementName)) {
      return style
    }
  })
}
