import hljs from 'highlight.js'
import 'highlight.js/styles/hybrid.css'

export default ({ app }, inject) => {
  inject('markdownRules', () => {
    if (document.querySelector('pre code')) {
      [...document.querySelectorAll('pre code')].forEach((code) => {
        hljs.highlightElement(code)
        if (!code.classList.contains('hljs')) {
          code.style.color = '#c5c8c6'
        }
        if (!code.classList.contains('syntax-code-block')) {
          if (code.className.split(' ')[0].includes('language-')) {
            const content = document.createElement('span')
            content.classList.add('code-language')
            code.classList.add('syntax-code-block')
            content.appendChild(document.createTextNode(code.className.split(' ')[0].replace('language-', '')))
            return code.insertBefore(content, code.childNodes[0])
          }
        } else {
          return false
        }
      })
    }
    if (document.querySelectorAll('markdown br')) {
      [...document.querySelectorAll('* + br:last-child')].forEach((br) => {
        br.previousElementSibling.style.marginBottom = '0'
      })
    }
  })
}
