<template>
  <div
    class="container"
    :style="`background-color: ${blok.background_color.color}`"
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <div class="container-content flex flex-row flex-wrap flex-gap">
      <div
        v-for="component in blok.body"
        :key="component._uid"
        :class="`component-container flex justify-center items-center p-5 ${component.row_container ? 'flex-grow bg-red-700' : 'w-full'}`"
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
