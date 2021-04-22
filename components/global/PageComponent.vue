<template>
  <section
    :class="`${blok.name.toLowerCase()}-page max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto my-0 pb-12 pt-16 px-4 md:p-6
      ${customClass('home','all', 'h-screen flex flex-col justify-center ')}
      ${customClass('about','all', 'flex md:items-center ')}
      ${customClass('portfolio','all', 'h-screen flex items-center :')}
      ${customClass('contact','all', 'lg:grid lg:grid-cols-2 lg:content-center lg:gap-x-10 ')}`"
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
