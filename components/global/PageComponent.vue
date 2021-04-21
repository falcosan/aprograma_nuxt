<template>
  <section
    :class="`${blok.name.toLowerCase()}-page w-8/12 my-0 mx-auto
      ${customClass('home','all', 'h-screen flex flex-col justify-center')}
      ${customClass('about','all', 'flex md:items-center my-20 md:my-0')}
      ${customClass('portfolio','all', 'md:h-screen flex items-center my-20 md:my-0')}
      ${customClass('contact','all', 'md:h-screen md:grid md:grid-cols-2 md:content-center md:gap-x-10 my-20 md:my-0')}
      ${customClass('blog','all', 'md:h-screen p-6')}`"
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
