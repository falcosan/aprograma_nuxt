export default ({ app }, inject) => {
  inject('contentByName', (from, nameComponent, is = true) => {
    if (is) {
      return from.filter(function (item) { return item.component === `${nameComponent}` })
    } else {
      return from.filter(function (item) { return item.component !== `${nameComponent}` })
    }
  })
}
