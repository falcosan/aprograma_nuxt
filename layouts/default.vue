<template>
  <div>
    <component
      v-for="layout in story.content.body"
      :key="layout._uid"
      :blok="layout"
      :is="layout.component"
    />
  </div>
</template>


<script>
import Header from '@/components/layout/HeaderComponent'
import Main from '@/components/layout/MainComponent'
import Footer from '@/components/layout/FooterComponent'
export default {
  components: { Header, Main, Footer },
  data() {
    return {
      story: {
        content: {
          body: [],
        },
      },
    }
  },
  created() {
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