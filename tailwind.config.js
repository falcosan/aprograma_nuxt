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
        body: ['DM Serif Display']
      },
      gridTemplateColumns: {
        7: '300px auto',
        8: '1fr 112px',
        9: '20rem auto 35px',
        slider: '1fr 1fr 5rem'
      },
      gridTemplateRows: {
        post: '100vh auto'
      },
      transitionProperty: {
        height: 'height',
        left: 'left'
      },
      spacing: {
        'full-adapted': 'calc(100vh - 3rem)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
