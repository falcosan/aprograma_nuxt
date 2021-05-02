<template>
  <section :class="`${blok.name.toLowerCase()}-page max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl my-0 mx-auto py-16 px-6`">
    <h1 v-if="blok.show_title" class="page-title mb-10 text-3xl">
      {{ blok.title }}
    </h1>
    <div
      :class="`${blok.name.toLowerCase()}-content grid gap-5 ${$store.state.data.windowWidth >= 1024 ? blok.page_direction === 'column' ? 'grid-flow-col' : 'grid-flow-row' : 'grid-flow-row'}`"
    >
      <component
        :is="component.component"
        v-for="component in blok.body"
        :key="component._uid"
        :blok="component"
      />
    </div>
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
