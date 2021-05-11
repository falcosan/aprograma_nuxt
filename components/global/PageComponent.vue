<template>
  <section :class="`${blok.name.toLowerCase()}-page max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl my-0 mx-auto pb-10 pt-20 px-6`">
    <h1 v-if="blok.title && blok.show_title" class="page-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <div
      :class="`${blok.name.toLowerCase()}-content grid gap-5 auto-cols-fr ${rowComponent.length === blok.body.length ? 'lg:grid-flow-col-dense' : ''} ${customClass('index', 'all', 'justify-center')}`"
    >
      <component
        :is="component.component"
        v-for="component in blok.body"
        :key="component._uid"
        :style="component.row_container || $store.state.data.windowWidth < 1024 ? false : `grid-column-end: ${rowComponent.length + 1}`"
        :class="`${blok.name.toLowerCase()}-component ${component.row_container ? '' : 'col-start-1'}`"
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
  computed: {
    rowComponent () {
      return this.blok.body.filter(function (item) { return item.row_container })
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
