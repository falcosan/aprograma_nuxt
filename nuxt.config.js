const axios = require('axios')

export default {
  target: 'static',

  head: {
    title: 'Aprograma - a paceful coding experience',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Coding can be defined in many ways, sometimes even stressful. The goal of aprograma is to change this.' },
      { name: 'application-name', content: 'aprograma' },
      { name: 'apple-mobile-web-app-title', content: 'aprograma' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon/apple-touch-icon.png' },
      { rel: 'mask-icon', href: '/icon/safari-pinned-tab.svg', color: '#454545' },
      { rel: 'manifest', href: '/icon/site.webmanifest' }
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

  publicRuntimeConfig: {
    emailJSuser: process.env.NUXT_ENV_EMAILJSUSER,
    emailJSservice: process.env.NUXT_ENV_EMAILJSSERVICE
  },

  sitemap: {
    hostname: 'https://aprograma.co',
    routes: async () => {
      const { data } = await axios.get(`https://api.storyblok.com/v1/cdn/links?token=${process.env.NUXT_ENV_PREVIEW_TOKEN}`)
      const pages = ['about', 'portfolio', 'blog', 'contact']
      const exclude = Object.values(data.links).map(link => pages.some(el => link.slug.includes(el)) ? link.slug : '')
      return exclude.filter(Boolean)
    },
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
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
