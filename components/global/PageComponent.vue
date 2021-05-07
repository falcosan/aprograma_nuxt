<template>
  <section :class="`${blok.name.toLowerCase()}-page max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl my-0 mx-auto pb-10 pt-24 ${$device.isDesktop ? 'md:pt-20' : ''} px-6`">
    <h1 v-if="blok.show_title" class="page-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <div
      :class="`${blok.name.toLowerCase()}-content grid gap-5 md:gap-10 ${customClass('index', 'all', 'justify-center')}`"
    >
      <div v-if="blok.body.map(component => component.row_container).filter(Boolean).length > 0" class="content-row grid gap-5 md:gap-10 lg:grid-flow-col">
        <component
          :is="component.component"
          v-for="component in setComponent(true)"
          :key="component._uid"
          :blok="component"
        />
      </div>
      <component
        :is="component.component"
        v-for="component in setComponent(false)"
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
    setComponent (condition) {
      if (condition) {
        return this.blok.body.filter(function (item) { return item.row_container })
      } else {
        return this.blok.body.filter(function (item) { return !item.row_container })
      }
    },
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
