export default ({ app }, inject) => {
  inject('markdownRules', () => {
    if (document.querySelector('pre code')) {
      [...document.querySelectorAll('pre code')].forEach((code) => {
        if (!code.classList.contains('syntax-code-block')) {
          if (code.className) {
            const content = document.createElement('span')
            content.classList.add('code-language')
            code.classList.add('syntax-code-block')
            content.appendChild(document.createTextNode(code.className.split(' ')[0]))
            return code.insertBefore(content, code.childNodes[0])
          }
        } else {
          return false
        }
      })
    }
  })
}
