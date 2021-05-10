<template>
  <div
    class="container"
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <div class="container-content flex flex-row flex-wrap" :style="`background-color: ${blok.background_color.color}`">
      <div
        v-for="component in blok.body"
        :key="component._uid"
        :class="`container-component flex justify-center items-center ${component.row_container ? 'flex-grow' : 'w-full'}`"
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
