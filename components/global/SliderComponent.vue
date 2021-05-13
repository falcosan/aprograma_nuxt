<template>
  <div v-if="blok.slider_mode && hasSlot('slider') && $store.state.data.windowWidth >= 1024 && blok.body.length > max && max" class="slider relative">
    <Icon
      class="previous-control control absolute top-1/2 -left-2 transform -translate-y-1/2 -translate-x-full"
      previous
      size="p-3 w-12"
      tag="button"
      @click.native="previous"
    />
    <transition-group
      id="slider"
      tag="ul"
      enter-active-class="duration-500 in-out transform"
      leave-active-class="duration-500 out-in transform"
      enter-class="translate-y-full absolute"
      :leave-to-class="`absolute h-full w-full inset-0 ${transitionLeave}`"
      class="relative grid gap-5 auto-cols-fr grid-flow-col-dense overflow-hidden "
    >
      <template
        v-for="(component, index) in blok.body"
      >
        <slot v-if="index < max" name="slider" :component="component" />
      </template>
    </transition-group>
    <Icon
      class="next-control control absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-full"
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
      max: Number(this.blok.max_slides),
      transitionLeave: ''
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
      this.sliderMove(this.blok.body, -1, -this.blok.body.length)
      this.transitionLeave = 'translate-x-full'
    },
    previous () {
      this.sliderMove(this.blok.body, -this.blok.body.length, -1)
      this.transitionLeave = '-translate-x-full'
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    }
  }
}
</script>
