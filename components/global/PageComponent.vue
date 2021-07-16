<template>
  <section :class="`${blok.name.toLowerCase()}-page p-5`">
    <h1 v-if="blok.title && blok.show_title" class="page-title mb-5 md:mb-10 text-2xl font-extralight">
      {{ blok.title }}
    </h1>
    <div class="page-components grid gap-x-5 gap-y-20 auto-cols-fr" :style="maxComponents > 1 ? `grid-template-columns:repeat(${maxComponents}, 1fr);` : false">
      <div
        v-for="component in blok.body"
        :key="component._uid"
        :style="`${component.row_container || $store.state.data.windowWidth < 768 ? false : `grid-column-end: ${maxComponents + 1}`}`"
        :class="`${component.component.toLowerCase()}-content ${component.component.toLowerCase() === 'container' && component.slider_mode ? 'overflow-hidden' : ''} ${component.row_container ? '' : 'col-start-1'}`"
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
      return this.$store.state.data.windowWidth >= 1024 ? this.$rangeItems(this.rowComponent.length, 2) : 1
    }
  }
}
</script>
