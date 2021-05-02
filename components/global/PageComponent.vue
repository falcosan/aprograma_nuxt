<template>
  <section
    :class="`${blok.name.toLowerCase()}-page max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl grid gap-10 my-0 mx-auto py-16 px-6 ${$device.isDesktop || $store.state.data.windowWidth >= 768 ? blok.page_direction === 'column' ? 'grid-flow-col' : 'grid-flow-row' : 'grid-flow-row'}`"
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
      if (this.$route.name === page && component) {
        return style
      } else {
        return ''
      }
    }
  }
}
</script>
