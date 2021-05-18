<template>
  <section :class="`${blok.name.toLowerCase()}-page max-w-sm xs:max-w-md sm:max-w-none sm:w-9/12 2xl:max-w-7xl my-0 mx-auto pb-10 pt-20 px-6`">
    <h1 v-if="blok.title && blok.show_title" class="page-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <div class="container-components grid gap-5 auto-cols-fr" :style="`grid-template-columns:repeat(${maxComponents}, 1fr);`">
      <div
        v-for="component in blok.body"
        :key="component._uid"
        :style="`${component.row_container || $store.state.data.windowWidth < 768 ? false : `grid-column-end: ${rowComponent.length + 1}`}`"
        :class="`${component.component.toLowerCase()}-content ${component.row_container ? '' : ' col-start-1'}`"
      >
        <component
          :is="component.component"
          :class="`${component.component.toLowerCase()}-component h-full`"
          :blok="component"
        />
      </div>
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
    },
    maxComponents () {
      if (this.$store.state.data.windowWidth >= 1536) {
        return this.$rangeItems(this.rowComponent.length, 5)
      } else if (this.$store.state.data.windowWidth >= 1280) {
        return this.$rangeItems(this.rowComponent.length, 4)
      } else if (this.$store.state.data.windowWidth >= 1024) {
        return this.$rangeItems(this.rowComponent.length, 3)
      } else if (this.$store.state.data.windowWidth >= 768) {
        return this.$rangeItems(this.rowComponent.length, 2)
      }
      return this.$rangeItems(this.rowComponent.length, 1)
    }
  }
}
</script>
