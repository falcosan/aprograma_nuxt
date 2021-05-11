<template>
  <div
    class="container-element"
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <div
      :class="`container-wrapper relative grid gap-5 auto-cols-fr ${rowComponent.length === blok.body.length ? 'lg:grid-flow-col-dense' : ''}`"
      :style="`background-color: ${blok.background_color_container.color}`"
    >
      <div
        v-for="(component) in blok.body"
        :key="component._uid"
        :style="`background-color: ${blok.background_color_component.color}; ${component.row_container || $store.state.data.windowWidth < 1024 ? false : `grid-column-end: ${rowComponent.length + 1}`}`"
        :class="`${component.component.toLowerCase()}-container flex justify-center${$device.isDesktop && blok.effects ? ' transform transition duration-200 hover:shadow-lg hover:scale-105' : ''}${component.row_container ? '' : ' col-start-1'}`"
      >
        <component
          :is="component.component"
          :class="`${component.component.toLowerCase()}-component h-full`"
          :blok="component"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SliderComponent from './SliderComponent'
export default {
  components: { SliderComponent },
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
  }
}
</script>
