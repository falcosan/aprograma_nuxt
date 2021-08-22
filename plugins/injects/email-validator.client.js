export default ({ app }, inject) => {
  inject('emailValidator', (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  })
}
