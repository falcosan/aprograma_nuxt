
export default {
  target: 'server',

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

  loading: { color: '#fff' },

  css: [
  ],

  plugins: [
    '~/plugins/registerComponent',
    '~/plugins/contentByName'
  ],

  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_TOKEN : process.env.VUE_APP_PREVIEW_TOKEN,
        cacheProvider: 'memory'

      }
    ],
  ],

  build: {
    extend(config, ctx) {
    }
  }
}
