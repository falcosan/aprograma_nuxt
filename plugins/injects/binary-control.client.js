export default ({ app }, inject) => {
  inject('binaryControl', (element, prop, alternative = false) => {
    if (element) {
      return element[prop]
    } else if (alternative) {
      return alternative
    }
  })
}
