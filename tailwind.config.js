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
      spacing: {
        max: 'max-content',
        min: 'min-content'
      },
      zIndex: {
        '-10': '-10'
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
  plugins: [
    require('@tailwindcss/typography')
  ]
}
