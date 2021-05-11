<template>
  <div
    class=""
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <div
      :class="`grid gap-5 ${rowComponent.length === blok.body.length ? 'lg:grid-flow-col' : ''}`"
      :style="`background-color: ${blok.background_color_container.color}`"
    >
      <div
        v-for="component in blok.body"
        :key="component._uid"
        :style="`background-color: ${blok.background_color_component.color}; ${component.row_container || $store.state.data.windowWidth < 1024 ? false : `grid-column-end: ${rowComponent.length + 1}`}`"
        :class="`flex justify-center p-5 md:p-10 ${component.row_container ? '' : 'col-start-1'}`"
      >
        <component
          :is="component.component"
          :class="`${component.component.toLowerCase()}-component`"
          :blok="component"
        />
      </div>
    </div>
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
