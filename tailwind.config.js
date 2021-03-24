module.exports = {
  purge: {
    content: ['./assets/css', './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',],
    enabled: process.env.NODE_ENV === 'production',
    options: {
      extractors: [
        {
          extractor(content) {
            return content.match(/[A-z0-9-:\\/]+/g)
          },
          extensions: ['txt']
        },
      ]
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        7: '300px auto',
        8: '1fr 112px'
      },
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}