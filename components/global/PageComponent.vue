<template>
  <section
    :class="`${blok.name.toLowerCase()}-page w-8/12 my-0 mx-auto mb-20 md:mb-0
      ${customClass('home','all', 'h-screen flex flex-col justify-center')}
      ${customClass('about','all', 'md:h-screen flex md:items-center mt-20 md:mt-0')}
      ${customClass('portfolio','all', 'flex items-center mt-20 md:mt-0 md:h-screen')}
      ${customClass('contact','all', 'grid grid-cols-2 content-center gap-x-10 mt-20 md:mt-0 md:h-screen')}
      ${customClass('blog','all', 'p-6 mt-20 md:mt-0 md:h-screen')}`"
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
