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
      gridTemplateColumns: {
        'post-teaser-link': '1fr 112px',
        'post-teaser-content': '300px auto',
        slider: '1fr 1fr 5rem'
      },
      gridTemplateRows: {
        post: '100vh auto',
        project: '5rem auto 5rem'
      },
      transitionProperty: {
        height: 'height',
        left: 'left'
      },
      spacing: {
        'full-adapted': 'calc(100vh - 3rem)'
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
