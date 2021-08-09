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
      { name: 'google-site-verification', content: 'XAHIQv3mCKIUNNPmq1Vqr_nnFUudd52GYaCSxWZG_Hc' },
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
      { rel: 'manifest', href: '/icon/site.webmanifest' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
      }
    ]
  },
  loading: '~/components/layout/LoadingComponent.vue',
  plugins: [
    '~/plugins/injects',
    '~/plugins/components',
    '~/plugins/touchScreen.client.js',
    '~/plugins/persistedState.client.js'
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
  generate: {
    fallback: true,
    routes (callback) {
      const exclude = ['home', 'layout']
      const routes = []
      axios.get(`https://api.storyblok.com/v1/cdn/links?token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`).then((res) => {
        Object.keys(res.data.links).forEach((key) => {
          if (!exclude.includes(res.data.links[key].slug)) {
            routes.push('/' + res.data.links[key].slug)
          }
        })
        callback(null, routes)
      })
    }
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
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
    '@nuxtjs/feed'
  ],
  markdownit: {
    html: true,
    linkify: true,
    runtime: true,
    typographer: true
  },
  sitemap: {
    hostname: 'https://aprograma.co',
    routes: async () => {
      const { data } = await axios.get(`https://api.storyblok.com/v2/cdn/links?token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
      const exclude = ['home', 'layout']
      const include = Object.values(data.links).map(link => !exclude.includes(link.slug) ? link.slug : '')
      return include.filter(Boolean)
    }
  },
  feed: [
    {
      path: '/feed.xml',
      async create (feed) {
        feed.options = {
          title: 'Aprograma Blog',
          link: 'https://aprograma.co/feed.xml',
          description: 'Aprograma Blog RSS'
        }
        feed.addCategory('Nuxt.js')
        feed.addContributor({
          name: 'Daniele Falchetti',
          email: 'danielefalche@gmail.com',
          link: 'https://aprograma.co/'
        })
        const { data } = await axios.get(
              `https://api.storyblok.com/v2/cdn/stories?starts_with=blog&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`
        )
        data.stories.forEach((post) => {
          const url = `https://aprograma.co/blog/${post.slug}`
          feed.addItem({
            title: post.content.title,
            id: url,
            link: url,
            description: post.content.intro,
            published: new Date(post.content.date),
            author: [
              {
                name: post.content.author
              }
            ]
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
    }
  ],
  defaults: {
    changefreq: 'daily',
    priority: 1,
    lastmod: new Date()

  },
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: false }],
        ['@babel/plugin-proposal-class-properties', { loose: false }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: false }]
      ]
    },
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
