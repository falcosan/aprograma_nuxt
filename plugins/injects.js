export default ({ app }, inject) => {
  inject('contentByName', (from, nameComponent, is = true) => {
    if (is) {
      return from.filter(function (item) { return item.component === `${nameComponent}` })
    } else {
      return from.filter(function (item) { return item.component !== `${nameComponent}` })
    }
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
  inject('themeColor', (bgColor) => {
    const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor
    const r = parseInt(color.substring(0, 2), 16)
    const g = parseInt(color.substring(2, 4), 16)
    const b = parseInt(color.substring(4, 6), 16)
    const uicolors = [r / 255, g / 255, b / 255]
    const c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92
      }
      return Math.pow((col + 0.055) / 1.055, 2.4)
    })
    const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2])
    return !(L > 0.179)
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
