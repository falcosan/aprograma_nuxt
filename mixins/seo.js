export default {
  methods: {
    seo (content = undefined) {
      const title = !content ? this.story.content.title ? this.story.content.title : null : this.story.name ? `${this.story.name} - Aprograma` : null
      const meta = !content
        ? [
            {
              hid: 'description',
              name: 'description',
              content: `${this.story.content.title} - Aprograma`
            },
            {
              hid: 'og:title',
              name: 'og:title',
              content: this.story.content.title
            },
            {
              hid: 'og:description',
              property: 'og:description',
              content: this.story.content.intro
            },
            {
              hid: 'og:image',
              property: 'og:image',
              content: this.story.content.file ? this.story.content.file.filename : false
            },
            {
              hid: 'og:url',
              property: 'og:url',
              content: `${this.$config.projectDomain}${this.$route.path}`
            },
            {
              hid: 'twitter:url',
              name: 'twitter:url',
              content: this.$config.projectDomain
            },
            {
              hid: 'twitter:title',
              name: 'twitter:title',
              content: this.story.content.title
            },
            {
              hid: 'twitter:description',
              name: 'twitter:description',
              content: this.story.content.intro
            },
            {
              hid: 'twitter:image',
              name: 'twitter:image',
              content: this.story.content.file ? this.story.content.file.filename : false
            }
          ]
        : [
            {
              hid: 'description',
              name: 'description',
              content
            }
          ]
      return {
        title,
        meta,
        link: [
          {
            hid: 'canonical',
            rel: 'canonical',
            href: `${this.$config.projectDomain}${this.$route.path}`
          }
        ]
      }
    }
  }

}
