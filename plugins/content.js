export default ({ app }, inject) => {
  inject('contentByName', (from, nameComponent) => {
    return from.filter(function (item) { return item.component === `${nameComponent}` })
  })
}
