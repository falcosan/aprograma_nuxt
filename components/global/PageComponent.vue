<template>
  <section
    :class="`${blok.name.toLowerCase()}-page max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl mx-auto my-0 pb-12 pt-16 px-4 md:p-6
      ${customClass('home','all', 'md:h-screen flex flex-col justify-center')}
      ${customClass('about','all', 'md:h-screen flex items-center')}
      ${customClass('portfolio','all', 'md:h-screen')}
      ${customClass('contact','all', 'lg:h-screen grid grid-cols-1 lg:grid-cols-2 gap-10 items-center')}`"
  >
    <component
      :is="component.component"
      v-for="component in blok.body"
      :key="component._uid"
      :blok="component"
    />
  </section>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  methods: {
    customClass (page, component, style) {
      if (this.$store.state.data.page === page && component) {
        return style
      } else {
        return ''
      }
    }
  }
}
</script>
