<template>
  <transition appear enter-active-class="duration-1000" enter-class="opacity-0">
    <div v-if="story.content.body && story.content.view" class="aprograma-theme">
      <component
        :is="layout.component"
        v-for="layout in story.content.body"
        :key="layout._uid"
        :blok="layout"
      />
    </div>
    <div v-else-if="story.content.body" class="aprograma-maintenance h-screen flex flex-col justify-center p-10">
      <Logo
        transition
        class="rounded"
        size="w-full max-h-md mx-auto my-0"
      />
      <h1 class="maintenance-text text-xs xs:text-base sm:text-lg text-center xs:whitespace-nowrap pointer-events-none font-medium uppercase underline italic">
        under maintenance
      </h1>
    </div>
  </transition>
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
    '$store.state.language.language' () { this.getLayout() }
  },
  created () {
    this.getLayout()
  },
  beforeMount () {
    this.$store.commit('data/responsiveMutation', window.innerWidth)
  },
  mounted () {
    this.$store.dispatch('data/responsiveAction')
  },
  methods: {
    async getLayout () {
      const { data } = await this.$storyapi.get('cdn/stories/layout', {
        language: this.$store.state.language.language
      })
      this.story = data.story
    }
  }
}
</script>
