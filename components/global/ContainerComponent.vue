<template>
  <div
    class="container w-full"
    :style="`background-color: ${blok.background_color.color}`"
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title col-span-full mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <div
      :class="`container-content w-full grid gap-y-5 row-start-2 row-end-2 justify-between ${rowComponent.length === blok.body.length ? 'sm:grid-cols-2 auto-cols-fr lg:grid-flow-col' : ''}`"
    >
      <component
        :is="component.component"
        v-for="component in blok.body"
        :key="component._uid"
        :style="component.row_container || $store.state.data.windowWidth < 1024 ? false : `grid-column-end: ${rowComponent.length + 1}`"
        :class="`container-component justify-self-center ${component.row_container ? '' : 'lg:col-start-1'}`"
        :blok="component"
      />
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
