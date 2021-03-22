
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
    '~/plugins/components'
  ],

  buildModules: [

    '@nuxtjs/tailwindcss',
  ],

  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken: 'Hfa8vm7STr9uvb8iPaDIKQtt',
        cacheProvider: 'memory'
      }
    ],
  ],

  build: {
    extend(config, ctx) {
    }
  }
}
