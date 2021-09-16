<template>
  <transition enter-active-class="duration-500" enter-class="opacity-0">
    <div v-if="story.content.body && !story.content.maintenance" class="aprograma-theme">
      <component
        :is="layout.component"
        v-for="layout in story.content.body"
        :key="layout._uid"
        :blok="layout"
      />
    </div>
    <div v-else-if="story.content.body" class="aprograma-maintenance h-screen flex flex-col justify-center p-5">
      <Logo
        transition
        class="rounded max-w-full mx-auto my-0"
        size="50vh"
      />
      <h1 class="maintenance-text text-xs xs:text-base sm:text-lg text-center xs:whitespace-nowrap pointer-events-none uppercase italic">
        {{ $languageCase("under maintenance", "en mantenimiento", "in manutenzione") }}
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
  async beforeMount () {
    await this.getLayout()
    this.$store.commit('data/responsiveMutation', window.innerWidth)
    this.$store.dispatch('data/responsiveAction')
    if (this.story.content.maintenance) {
      this.$noscroll(true)
    }
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
