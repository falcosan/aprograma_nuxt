import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default ({ app }, inject) => {
  inject('markdownRules', () => {
    if (document.querySelector('pre code')) {
      [...document.querySelectorAll('pre code')].forEach((code) => {
        if (!code.classList.contains('syntax-code-block')) {
          if (code.className.split(' ')[0].includes('language-')) {
            const content = document.createElement('span')
            content.classList.add('code-language')
            code.classList.add('syntax-code-block')
            content.appendChild(document.createTextNode(code.className.split(' ')[0].replace('language-', '')))
            const language = hljs.getLanguage(code.className.split(' ')[0].replace('language-', '')) ? hljs.getLanguage(code.className.split(' ')[0].replace('language-', '')).name.toLocaleLowerCase() : null
            if (hljs.listLanguages().includes(language)) {
              hljs.highlightElement(code)
            }
            return code.insertBefore(content, code.childNodes[0])
          }
        } else {
          return false
        }
      })
    }
    if (document.querySelectorAll('.markdown br')) {
      [...document.querySelectorAll('* + br:last-child')].forEach((br) => {
        br.previousElementSibling.style.marginBottom = '0'
      })
    }
    document.querySelectorAll('.markdown img')?.forEach((image) => {
      image.addEventListener('click', function () {
        document.body.classList.add('noscroll')
        const wrapper = document.createElement('div')
        const newImage = image.cloneNode()
        wrapper.classList.add('markdown-modal')
        wrapper.appendChild(newImage)
        document.body.appendChild(wrapper).focus({ preventScroll: true })
        wrapper.addEventListener('click', function () {
          document.body.removeChild(wrapper)
          document.body.classList.remove('noscroll')
        })
        document.onkeydown = function (event) {
          if (event.key.toLowerCase() === 'escape' && document.body.contains(wrapper)) {
            document.body.classList.remove('noscroll')
            document.body.removeChild(wrapper)
          }
        }
      })
    })
  })
}
