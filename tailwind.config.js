module.exports = {
  purge: {
    content: ['./components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}'],
    enabled: process.env.NODE_ENV === 'production'
  },
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        body: ['Asap']
      },
      height: {
        'min-content': 'min-content'
      },
      transitionProperty: {
        height: 'height'
      },
      transformOrigin: {
        'center-left': '50% 40%'
      },
      rotate: {
        360: '360deg'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
