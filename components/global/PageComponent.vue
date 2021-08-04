<template>
  <section :class="`${blok.name.toLowerCase()}-page p-5`">
    <h1 v-if="blok.title" class="page-title mb-5 text-xl xs:text-2xl font-extralight break-words">
      {{ blok.title }}
    </h1>
    <div class="page-components flex flex-wrap -m-2.5">
      <div
        v-for="(component, index) in blok.body"
        :key="component._uid"
        :style="`flex: ${component.row_container ? `1 ${(100 - (maxComponents > 1 ? spaceFix : 0 )) / $rangeItems(maxComponents, 3)}%` : '100%'};`"
        :class="`${component.component.toLowerCase()}-content mx-2.5 mt-2.5 ${component.component.toLowerCase() === 'container' && component.slider_mode === 'slider' ? 'overflow-hidden' : ''}  ${index === blok.body.length - 1 ? '' : component.component.toLowerCase() === 'container' && !component.slider_mode ? 'mb-5.5' : 'mb-8'}`"
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
  data () {
    return {
      spaceFix: 20
    }
  },
  computed: {
    rowComponent () {
      return this.blok.body.filter(function (item) { return item.row_container })
    },
    maxComponents () {
      if (Number(this.blok.column_container)) {
        if (this.$store.state.data.windowWidth >= 1440) {
          return this.$rangeItems(Number(this.blok.column_container), 3)
        } return this.$store.state.data.windowWidth >= 1024 ? this.$rangeItems(Number(this.blok.column_container), 2) : 1
      } else {
        if (this.$store.state.data.windowWidth >= 1440) {
          return this.$rangeItems(this.rowComponent.length, 3)
        } return this.$store.state.data.windowWidth >= 1024 ? this.$rangeItems(this.rowComponent.length, 2) : 1
      }
    }
  }
}
</script>
