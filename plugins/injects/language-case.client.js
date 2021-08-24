export default ({ app }, inject) => {
  inject('languageCase', (english, spanish, italian) => {
    switch (app.store.state.language.language) {
      case '':
        return english
      case 'default':
        return english
      case 'es':
        return spanish
      case 'it':
        return italian
    }
  })
}
