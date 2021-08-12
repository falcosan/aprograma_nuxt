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
    screens: {
      ss: '320px',
      xx: '375px',
      xs: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      spacing: {
        5.5: '22px',
        18: '4.5rem',
        max: 'max-content',
        min: 'min-content',
        xs: '20rem',
        sm: '24rem',
        sd: '420px',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem'
      },
      minHeight: {
        40: '10rem'
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
        '-40': '-40'
      },
      gridTemplateColumns: {
        'fit-big': 'repeat(auto-fit, minmax(300px, 1fr))',
        'fit-medium': 'repeat(auto-fit, minmax(257px, 1fr))',
        'fit-small': 'repeat(auto-fit, minmax(159px, 1fr))',
        'fit-tiny': 'repeat(auto-fit, minmax(130px, 1fr))',
        'fill-big': 'repeat(auto-fill, minmax(300px, 1fr))',
        'fill-medium': 'repeat(auto-fill, minmax(257px, 1fr))',
        'fill-small': 'repeat(auto-fill, minmax(159px, 1fr))',
        'fill-tiny': 'repeat(auto-fill, minmax(130px, 1fr))'

      },
      opacity: {
        65: '0.65'
      },
      transitionProperty: {
        height: 'height'
      },
      transformOrigin: {
        'center-left': '50% 40%'
      },
      rotate: {
        360: '360deg'
      },
      cursor: {
        next: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\' fill-rule=\'evenodd\' clip-rule=\'evenodd\'%3E%3Cpath d=\'M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z\'/%3E%3C/svg%3E") 32 32, pointer',
        previous: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\' fill-rule=\'evenodd\' clip-rule=\'evenodd\'%3E%3Cpath d=\'M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z\'/%3E%3C/svg%3E") 32 32, pointer'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
