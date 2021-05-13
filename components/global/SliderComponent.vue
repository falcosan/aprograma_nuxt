<template>
  <div v-if="blok.slider_mode && hasSlot('slider')" class="slider lg:grid-flow-col-dense">
    <Icon

      class="previous-control control absolute top-1/2 -left-20 transform -translate-y-1/2"
      previous
      size="p-3 w-12"
      tag="button"
      @click.native="previous"
    />
    <template
      v-for="(component, index) in rowComponent"
    >
      <slot v-if="(index < max)" name="slider" :component="component" />
    </template>
    <Icon
      class="next-control control absolute top-1/2 -right-20 transform -translate-y-1/2"
      next
      size="p-3 w-12"
      tag="button"
      @click.native="next"
    />
  </div>
  <div v-else-if="hasSlot('no_slider')" class="no-slider">
    <template
      v-for="component in blok.body"
    >
      <slot name="no_slider" :component="component" />
    </template>
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
  data () {
    return {
      max: Number(this.blok.max_slides)
    }
  },
  computed: {
    rowComponent () {
      return this.blok.body.filter(function (item) { return item.row_container })
    }
  },
  methods: {
    sliderMove (arr, oldIndex, newIndex) {
      while (oldIndex < 0) {
        oldIndex += arr.length
      }
      while (newIndex < 0) {
        newIndex += arr.length
      }
      if (newIndex >= arr.length) {
        let slide = newIndex - arr.length
        while (slide--) {
          arr.push(undefined)
        }
      }
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
      return arr
    },
    next () {
      this.sliderMove(this.blok.body, -1, -this.rowComponent.length)
    },
    previous () {
      this.sliderMove(this.blok.body, 0, -this.rowComponent.length)
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    }
  }
}
</script>
