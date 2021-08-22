export default ({ app }, inject) => {
  inject('markdownRules', () => {
    if (document.querySelector('pre code')) {
      [...document.querySelectorAll('pre code')].forEach((code) => {
        if (code.className && !code.classList.contains('code-block')) {
          const content = document.createElement('span')
          content.classList.add('code-language')
          code.classList.add('code-block')
          content.appendChild(document.createTextNode(code.className.split(' ')[0]))
          return document.querySelector('pre').insertBefore(content, code)
        } else {
          return false
        }
      })
    }
  })
}
