<template>
  <div>
    <Header :content="contentByName(story.content.body, 'Header')" />
    <Nuxt />
    <Footer :content="contentByName(story.content.body, 'Footer')" />
  </div>
</template>


<script>
import contentByName from '@/plugins/contentByName'
import Header from '@/components/HeaderComponent'
import Footer from '@/components/FooterComponent'
export default {
  components: { Header, Footer },
  mixins: [contentByName],
  data() {
    return {
      story: {
        content: {
          body: [],
        },
      },
    }
  },
  mounted() {
    this.getLayout()
  },
  methods: {
    async getLayout() {
      const { data } = await this.$storyapi.get(`cdn/stories/layout`, {
        version: 'published',
      })
      this.story = data.story
    },
  },
}
</script>