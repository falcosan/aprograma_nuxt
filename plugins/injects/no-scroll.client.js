export default ({ app }, inject) => {
  inject('noscroll', (condition) => {
    if (condition) {
      document.body.classList.add('noscroll')
    } else {
      document.body.classList.remove('noscroll')
    }
  })
}
