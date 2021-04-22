<template>
  <section
    :class="`${blok.name.toLowerCase()}-page md:w-8/12 mx-auto my-0 py-14 px-4 md:py-6
      ${customClass('home','all', 'h-screen flex flex-col justify-center ')}
      ${customClass('about','all', 'flex md:items-center ')}
      ${customClass('portfolio','all', 'flex items-center :')}
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
