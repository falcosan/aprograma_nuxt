<template>
  <div v-if="blok.slider_mode && hasSlot('slider')" class="slider">
    <Icon
      class="previous-control control absolute top-1/2 -left-20 transform -translate-y-1/2"
      previous
      size="p-3 w-12"
      tag="button"
      @click.native="previous"
    />
    <template
      v-for="(component, index) in blok.body"
    >
      <div v-show="index < max" :key="component._uid" class="slide">
        <slot name="slider" :component="component" />
      </div>
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
      <div
        :key="component._uid"
      >
        <slot name="no_slider" :component="component" />
      </div>
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
      max: Number(this.blok.max_slides),
      min: 0
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
        let k = newIndex - arr.length
        while (k--) {
          arr.push(undefined)
        }
      }
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
      return arr
    },
    next () {
      this.sliderMove(this.blok.body, -1, -this.blok.body.length)
    },
    previous () {
      this.sliderMove(this.blok.body, 0, this.blok.body.length)
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    }
  }
}
</script>
