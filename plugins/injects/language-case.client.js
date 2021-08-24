export default ({ app }, inject) => {
  inject('languageCase', (english, spanish, italian) => {
    const ctx = app
    switch (ctx.store.state.language.language) {
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
