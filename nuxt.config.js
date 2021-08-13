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
  loading: {
    color: '#212121',
    duration: 1000,
    rtl: true,
    continuous: true
  },
  plugins: [
    '~/plugins/injects',
    '~/plugins/components',
    '~/plugins/touchScreen.client.js',
    '~/plugins/persistedState.client.js'
  ],

  buildModules: [
    '@nuxtjs/tailwindcss',
    'nuxt-compress',
    '@nuxtjs/device',
    '@nuxt/image'
  ],
  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://img2.storyblok.com'
    },
    domains: ['https://aprograma.co']
  },
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
    typographer: true,
    breaks: true
  },

  sitemap: {
    hostname: 'https://aprograma.co',
    routes: async () => {
      const { data } = await axios.get(`https://api.storyblok.com/v1/cdn/links?token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
      const exclude = ['home', 'layout']
      const include = Object.values(data.links).map(link => !exclude.includes(link.slug) ? link.slug : '')
      return include.filter(Boolean)
    },
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },

  feed: [
    {
      path: '/feedeng.xml',
      async create (feed) {
        feed.options = {
          title: 'Aprograma Blog ENG',
          link: 'https://aprograma.co/feedeng.xml',
          description: 'Aprograma Blog RSS'
        }
        feed.addCategory('Blog ENG')
        feed.addContributor({
          name: 'Daniele Falchetti',
          email: 'danielefalche@gmail.com',
          link: 'https://aprograma.co/'
        })
        const dataEng = await axios.get(`https://api.storyblok.com/v2/cdn/stories?starts_with=blog&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
        const dataFiltered = dataLang => dataLang.data.stories.filter(filteredPost => filteredPost.name.toLowerCase() !== 'blog')
        dataFiltered(dataEng).forEach((post) => {
          feed.addItem({
            title: post.content.title,
            image: post.content.file.filename,
            id: post.id,
            link: `https://aprograma.co/blog/${post.slug}`,
            description: post.content.intro,
            content: post.content.long_text,
            published: new Date(post.content.date)
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
    },
    {
      path: '/feedesp.xml',
      async create (feed) {
        feed.options = {
          title: 'Aprograma Blog ESP',
          link: 'https://aprograma.co/feedesp.xml',
          description: 'Aprograma Blog RSS'
        }
        feed.addCategory('Blog ESP')
        feed.addContributor({
          name: 'Daniele Falchetti',
          email: 'danielefalche@gmail.com',
          link: 'https://aprograma.co/'
        })
        const dataEs = await axios.get(`https://api.storyblok.com/v2/cdn/stories?starts_with=es/blog&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
        const dataFiltered = dataLang => dataLang.data.stories.filter(filteredPost => filteredPost.name.toLowerCase() !== 'blog')
        dataFiltered(dataEs).forEach((post) => {
          feed.addItem({
            title: post.content.title,
            image: post.content.file.filename,
            id: post.id,
            link: `https://aprograma.co/blog/${post.slug}`,
            description: post.content.intro,
            content: post.content.long_text,
            published: new Date(post.content.date)
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
    },
    {
      path: '/feedita.xml',
      async create (feed) {
        feed.options = {
          title: 'Aprograma Blog ITA',
          link: 'https://aprograma.co/feedita.xml',
          description: 'Aprograma Blog RSS'
        }
        feed.addCategory('Blog ITA')
        feed.addContributor({
          name: 'Daniele Falchetti',
          email: 'danielefalche@gmail.com',
          link: 'https://aprograma.co/'
        })
        const dataIt = await axios.get(`https://api.storyblok.com/v2/cdn/stories?starts_with=it/blog&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
        const dataFiltered = dataLang => dataLang.data.stories.filter(filteredPost => filteredPost.name.toLowerCase() !== 'blog')
        dataFiltered(dataIt).forEach((post) => {
          feed.addItem({
            title: post.content.title,
            image: post.content.file.filename,
            id: post.id,
            link: `https://aprograma.co/blog/${post.slug}`,
            description: post.content.intro,
            content: post.content.long_text,
            published: new Date(post.content.date)
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
    }
  ],

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
