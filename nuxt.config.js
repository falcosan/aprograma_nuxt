
export default {
  target: 'static',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  generate: {
    fallback: true
  },
  loading: { color: '#fff' },

  css: [
  ],

  plugins: [
    '~/plugins/registerComponent',
    { src: '~/plugins/contentByName', mode: 'client' },
  ],

  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.NODE_ENV === 'production' ? process.env.NUXT_ENV_PUBLIC_TOKEN : process.env.NUXT_ENV_PREVIEW_TOKEN,
        cacheProvider: 'memory'

      }
    ],
  ],

  build: {
    postcss: {
      plugins: {
      },
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
