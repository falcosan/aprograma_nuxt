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
        8: '1fr 112px'
      },
      transitionProperty: {
        height: 'height',
        left: 'left'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
