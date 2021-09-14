const axios = require('axios')

export default {
  ssr: false,
  target: 'static',
  head: {
    meta: [
      { name: 'google-site-verification', content: 'XAHIQv3mCKIUNNPmq1Vqr_nnFUudd52GYaCSxWZG_Hc' },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Aprograma - A break from stressfull coding'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Coding can be defined in many ways, sometimes even stressful. The goal of Aprograma is to change this.'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://a.storyblok.com/f/106240/810x810/1be2192023/logostatic.png'
      }
    ],
    link: [
      { rel: 'preconnect', href: 'https://img2.storyblok.com' }
    ]
  },
  loading: '@/components/layout/LoadingComponent.vue',
  css: ['~/assets/css/main', '~/assets/css/markdown'],
  plugins: [
    '~/plugins/injects/go-back.client.js',
    '~/plugins/injects/no-scroll.client.js',
    '~/plugins/injects/range-items.client.js',
    '~/plugins/injects/theme-color.client.js',
    '~/plugins/injects/error-message.client.js',
    '~/plugins/injects/language-case.client.js',
    '~/plugins/injects/markdown-rules.client.js',
    '~/plugins/injects/email-validator.client.js',
    '~/plugins/injects/content-by-name.client.js',
    '~/plugins/injects/image-validation.client.js',
    '~/plugins/injects/scroll-to-smoothly.client.js',
    '~/plugins/custom-flag.client.js',
    '~/plugins/touchScreen.client.js',
    '~/plugins/components',
    '~/plugins/persistedState.js'
  ],

  buildModules: [
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxtjs/tailwindcss',
    'nuxt-build-optimisations'
  ],
  buildOptimisations: {
    profile: process.env.NODE_ENV === 'development' ? 'risky' : 'experimental',
    imageFileLoader: false
  },
  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://img2.storyblok.com'
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1366,
      '2xl': 1600,
      '3xl': 1920
    }
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
      axios(`https://api.storyblok.com/v2/cdn/links?token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`).then((res) => {
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
    '@nuxtjs/google-fonts',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
    '@nuxtjs/feed',
    '@nuxtjs/pwa'
  ],
  pwa: {
    meta: {
      title: 'Aprograma - A break from stressfull coding',
      author: 'Daniele Falchetti - danielefalche@gmail.com',
      description: 'Coding can be defined in many ways, sometimes even stressful. The goal of Aprograma is to change this.',
      theme_color: '#f9f9f9',
      'apple-mobile-web-app-status-bar-style': 'black',
      'og:url': 'https://aprograma.co/',
      'og:image': {
        path: 'https://a.storyblok.com/f/106240/810x810/1be2192023/logostatic.png',
        width: 1200,
        height: 630,
        type: 'image/png'
      },
      'twitter:site': '@danielefalche',
      'twitter:card': 'summary_large_image'

    },
    manifest: {
      name: 'Aprograma',
      short_name: 'Aprograma',
      description: 'Coding can be defined in many ways, sometimes even stressful. The goal of Aprograma is to change this.',
      start_url: ''
    }
  },
  googleFonts: {
    families: {
      Nunito: [100, 200, 300, 400, 600, 800]
    },
    preconnect: true,
    display: 'swap'
  },
  markdownit: {
    html: true,
    linkify: true,
    runtime: true,
    typographer: true,
    breaks: true,
    use: [
      'markdown-it-emoji'
    ]
  },

  sitemap: {
    hostname: 'https://aprograma.co',
    routes: async () => {
      const { data } = await axios(`https://api.storyblok.com/v2/cdn/links?token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
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
        const dataEng = await axios(`https://api.storyblok.com/v2/cdn/stories?starts_with=blog&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
        const dataFiltered = dataLang => dataLang.data.stories.filter(filteredPost => filteredPost.name.toLowerCase() !== 'blog')
        dataFiltered(dataEng).forEach((post) => {
          feed.addItem({
            title: post.content.title,
            image: post.content.file.filename ? post.content.file.filename : 'https://img2.storyblok.com/1240x0/f/106240/4067x2440/49d9d1a222/noimagedetail.png',
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
        const dataEs = await axios(`https://api.storyblok.com/v2/cdn/stories?starts_with=es/blog&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
        const dataFiltered = dataLang => dataLang.data.stories.filter(filteredPost => filteredPost.name.toLowerCase() !== 'blog')
        dataFiltered(dataEs).forEach((post) => {
          feed.addItem({
            title: post.content.title,
            image: post.content.file.filename ? post.content.file.filename : 'https://img2.storyblok.com/1240x0/f/106240/4067x2440/49d9d1a222/noimagedetail.png',
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
        const dataIt = await axios(`https://api.storyblok.com/v2/cdn/stories?starts_with=it/blog&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP`)
        const dataFiltered = dataLang => dataLang.data.stories.filter(filteredPost => filteredPost.name.toLowerCase() !== 'blog')
        dataFiltered(dataIt).forEach((post) => {
          feed.addItem({
            title: post.content.title,
            image: post.content.file.filename ? post.content.file.filename : 'https://img2.storyblok.com/1240x0/f/106240/4067x2440/49d9d1a222/noimagedetail.png',
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
        'postcss-url': false,
        'postcss-nested': {}
      },
      preset: {
        autoprefixer: {
          grid: 'autoplace'
        }
      }
    }
  }
}
