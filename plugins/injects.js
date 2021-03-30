export default ({ app }, inject) => {
  inject('customClass', (elementName, style) => {
    if (app.context.route.name.includes(elementName) || app.store.state.classes.nameElement.includes(elementName)) {
      return style
    }
  })
  inject('contentByName', (from, nameComponent) => {
    return from.filter(function (item) { return item.component === `${nameComponent}` })
  })
  inject('errorMessage', (res, message404, message500) => {
    if (!res) {
      app.context.error({
        statusCode: 404,
        message: message404
      })
    } else {
      app.context.error({
        statusCode: 500,
        message: message500
      })
    }
  })
}
