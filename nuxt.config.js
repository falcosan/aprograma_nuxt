const axios = require('axios')

export default {
  target: 'static',
  head: {
    title: 'Aprograma - a peaceful coding experience',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Coding can be defined in many ways, sometimes even stressful. The goal of Aprograma is to change this.' },
      { name: 'application-name', content: 'Aprograma' },
      { name: 'apple-mobile-web-app-title', content: 'Aprograma' },
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
    'nuxt-compress',
    '@nuxtjs/device'
  ],
  device: {
    refreshOnResize: true
  },
  publicRuntimeConfig: {
    projectName: process.env.npm_package_name
  },
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

  generate: {
    routes: async () => {
      const { data } = await axios.get(`https://api.storyblok.com/v1/cdn/links?token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
      const exclude = ['home', 'layout']
      const include = Object.keys(data.links).map(index => !exclude.includes(data.links[index].slug) ? data.links[index].slug : '')
      return include.filter(Boolean)
    }
  },
  sitemap: {
    hostname: 'https://aprograma.co',
    routes: async () => {
      const { data } = await axios.get(`https://api.storyblok.com/v1/cdn/links?token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
      const pages = ['about', 'portfolio', 'contact', 'blog']
      const include = Object.values(data.links).map(link => pages.includes(link.slug) ? link.slug : '')
      return include.filter(Boolean)
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
