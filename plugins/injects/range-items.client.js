export default ({ app }, inject) => {
  inject('rangeItems', (val, max) => {
    return val < 1 ? 1 : (val > max ? max : val)
  })
}
