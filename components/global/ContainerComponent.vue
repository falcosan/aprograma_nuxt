<template>
  <div
    class="container-cover"
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <Slider
      :blok="blok"
      :style="`background-color: ${blok.background_color_container.color};`"
    >
      <template #slider="{component, previous, next}">
        <li
          :key="component._uid"
          v-touch:swipe.prevent.right="next"
          v-touch:swipe.prevent.left="previous"
          v-touch:start.prevent="$noscroll(true)"
          v-touch:end.prevent="$noscroll(false)"
          :style="`background-color: ${blok.background_color_component.color};`"
          :class="`${component.component.toLowerCase()}-slide flex justify-center`"
        >
          <component
            :is="component.component"
            :class="`${component.component.toLowerCase()}-component h-full`"
            :blok="component"
          />
        </li>
      </template>
      <template #no_slider>
        <div class="container-components grid gap-5 auto-cols-fr" :style="`grid-template-columns:repeat(${$store.state.data.windowWidth >= 640 ? maxComponents : '1'}, 1fr);`">
          <div
            v-for="component in blok.body"
            :key="component._uid"
            :style="`background-color: ${blok.background_color_component.color}; ${component.row_container || $store.state.data.windowWidth < 640 ? false : `grid-column-end: ${rowComponent.length + 1}`}`"
            :class="`${component.component.toLowerCase()}-container flex justify-center${component.row_container ? '' : ' col-start-1'}`"
          >
            <component
              :is="component.component"
              :class="`${component.component.toLowerCase()}-component h-full`"
              :blok="component"
            />
          </div>
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
    },
    maxComponents () {
      if (this.$store.state.data.windowWidth >= 1536) {
        return this.$rangeItems(this.rowComponent.length, 5)
      } else if (this.$store.state.data.windowWidth >= 1280) {
        return this.$rangeItems(this.rowComponent.length, 4)
      } else if (this.$store.state.data.windowWidth >= 1024) {
        return this.$rangeItems(this.rowComponent.length, 3)
      } else if (this.$store.state.data.windowWidth >= 640) {
        return this.$rangeItems(this.rowComponent.length, 2)
      }
      return this.$rangeItems(this.rowComponent.length, 1)
    }
  }
}
</script>
