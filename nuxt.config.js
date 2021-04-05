const os = require('os')
const axios = require('axios')

export default {
  target: 'static',

  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
    '~/plugins/components',
    '~/plugins/injects'
  ],

  buildModules: [
    '@nuxtjs/tailwindcss',
    'nuxt-compress'
  ],

  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.NODE_ENV === 'production' ? process.env.NUXT_ENV_PUBLIC_TOKEN : process.env.NUXT_ENV_PREVIEW_TOKEN,
        cacheProvider: 'memory'

      }
    ],
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 10240
        }
      }
    ],
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    hostname: os.hostname(),
    gzip: true,
    routes: async () => {
      const { data } = await axios.get(`https://api.storyblok.com/v1/cdn/links?token=${process.env.NUXT_ENV_PREVIEW_TOKEN}`)
      return Object.values(data.links).map(link => link.slug)
    }
  },
  build: {
    postcss: {
      plugins: {
      },
      preset: {
        autoprefixer: {
          grid: 'autoplace'
        }
      }
    }
  }
}
