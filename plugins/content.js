export default ({ app }, inject) => {
  inject('contentByName', (from, nameComponent) => {
    const filteredbloks = from.filter(function (item) { return item.component === `${nameComponent}` })
    return filteredbloks.length > 1 ? filteredbloks : filteredbloks[0]
  })
}
