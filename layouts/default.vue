<template>
  <div class="font-body">
    <component
      :is="layout.component"
      v-for="layout in story.content.body"
      :key="layout._uid"
      :blok="layout"
    />
  </div>
</template>

<script>
import Header from '@/components/layout/HeaderComponent'
import Main from '@/components/layout/MainComponent'
import Footer from '@/components/layout/FooterComponent'
export default {
  components: { Header, Main, Footer },
  data () {
    return {
      story: {
        content: {}
      }
    }
  },

  watch: {
    '$store.state.language.language': 'getLayout'
  },
  created () {
    this.getLayout()
  },
  methods: {
    async getLayout () {
      const { data } = await this.$storyapi.get(`cdn/stories/${this.$store.state.language.language}/layout`)
      this.story = data.story
    }
  }
}
</script>
