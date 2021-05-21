export default ({ app }, inject) => {
  inject('contentByName', (from, nameComponent) => {
    return from.filter(function (item) { return item.component === `${nameComponent}` })
  })
  inject('emailValidator', (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  })
  inject('languageCase', (english, spanish, italian) => {
    switch (app.store.state.language.language) {
      case '':
        return english
      case 'es':
        return spanish
      case 'it':
        return italian
    }
  })
  inject('rangeItems', (val, max) => {
    return val < 1 ? 1 : (val > max ? max : val)
  })
  inject('noscroll', (condition) => {
    if (condition) {
      document.body.classList.add('noscroll')
    } else {
      document.body.classList.remove('noscroll')
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
