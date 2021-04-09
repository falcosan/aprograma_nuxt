export default ({ app }, inject) => {
  inject('customClass', (elementName, style) => {
    if (app.context.route.name.includes(elementName)) {
      return style
    } else {
      return ''
    }
  })
  inject('contentByName', (from, nameComponent) => {
    return from.filter(function (item) { return item.component === `${nameComponent}` })
  })
  inject('emailValidator', (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  })
  inject('languageCase', (english, spanish, italian) => {
    switch (app.store.state.data.language) {
      case '':
        return english
      case 'es':
        return spanish
      case 'it':
        return italian
    }
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
