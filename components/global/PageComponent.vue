<template>
  <section :class="`${blok.name.toLowerCase()}-page p-5`">
    <h1 v-if="blok.title" class="page-title mb-5 text-xl xs:text-2xl break-words">
      {{ blok.title }}
    </h1>
    <div class="page-components flex flex-wrap -m-2.5">
      <component
        :is="component.component"
        v-for="component in components"
        :key="component._uid"
        :blok="component"
        :style="`flex: ${component.component.toLowerCase() === 'blank' ? false : component.row_container ? `1 ${(100 - (maxComponents > 1 ? spaceFix : 0 )) / $rangeItems(maxComponents, 3)}%` : '100%'};`"
        :class="`${component.component.toLowerCase()}-content ${component.component.toLowerCase() === 'blank' ? '' : `${setAlignContent} m-2.5` } ${component.component.toLowerCase() === 'container' && component.slider_mode === 'slider' ? 'overflow-hidden' : ''}`"
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
  data () {
    return {
      spaceFix: 20
    }
  },
  computed: {
    rowComponent () {
      return this.blok.body.filter(function (item) { return item.row_container })
    },
    components () {
      return this.blok.body.filter(component => component.resolution_show ? !component.exact_resolution ? this.$store.state.data.windowWidth >= component.resolution_show.split('; ')[1] : this.$store.state.data.windowWidth >= component.resolution_show.split('; ')[1] && this.maxBreakpoint <= component.resolution_show.split('; ')[1] : component)
    },
    maxBreakpoint () {
      if (this.$store.state.data.windowWidth > 1440) {
        return this.$rangeItems(this.$store.state.data.windowWidth, 1440)
      } else if (this.$store.state.data.windowWidth > 768) {
        return this.$rangeItems(this.$store.state.data.windowWidth, 768)
      } else {
        return this.$rangeItems(this.$store.state.data.windowWidth, 632)
      }
    },
    maxComponents () {
      if (Number(this.blok.column_container)) {
        if (this.$store.state.data.windowWidth >= 1440) {
          return this.$rangeItems(Number(this.blok.column_container), 3)
        } return this.$store.state.data.windowWidth >= 768 ? this.$rangeItems(Number(this.blok.column_container), 2) : 1
      } else {
        if (this.$store.state.data.windowWidth >= 1440) {
          return this.$rangeItems(this.rowComponent.length, 3)
        } return this.$store.state.data.windowWidth >= 768 ? this.$rangeItems(this.rowComponent.length, 2) : 1
      }
    },
    setAlignContent () {
      switch (this.blok.align_content) {
        case 'start':
          return 'self-start'
        case 'center':
          return 'self-center'
        case 'end':
          return 'self-end'
      } return ''
    }
  }
}
</script>
