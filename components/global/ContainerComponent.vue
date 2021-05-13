<template>
  <div
    class="container-element"
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <Slider
      :class="`container-wrapper grid gap-5 auto-cols-fr ${rowComponent.length === blok.body.length ? 'lg:grid-flow-col-dense' : ''}`"
      :blok="blok"
      :style="`background-color: ${blok.background_color_container.color}`"
    >
      <template #slider="{component}">
        <li
          :key="component._uid"
          :style="`background-color: ${blok.background_color_component.color};`"
          :class="`${component.component.toLowerCase()}-container flex justify-center`"
        >
          <component
            :is="component.component"
            :class="`${component.component.toLowerCase()}-component h-full`"
            :blok="component"
          />
        </li>
      </template>
      <template #no_slider="{component}">
        <div
          :style="`background-color: ${blok.background_color_component.color}; ${component.row_container || $store.state.data.windowWidth < 1024 ? false : `grid-column-end: ${rowComponent.length + 1}`}`"
          :class="`${component.component.toLowerCase()}-container flex justify-center${component.row_container ? '' : ' col-start-1'}`"
        >
          <component
            :is="component.component"
            :class="`${component.component.toLowerCase()}-component h-full`"
            :blok="component"
          />
        </div>
      </template>
    </Slider>
  </div>
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
  }
}
</script>
