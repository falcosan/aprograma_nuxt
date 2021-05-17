<template>
  <div v-if="blok.slider_mode && hasSlot('slider') && blok.body.length > 1" class="slider relative">
    <Icon
      v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop"
      :class="`previous-control control absolute z-10 md:z-auto top-1/2 left-0 md:-left-2 transform ${blok.slider_mode === 'slider' ? '-translate-y-1/2' : '-translate-y-3/4'} md:-translate-x-full`"
      previous
      size="p-2 md:p-3 w-9 md:w-12"
      tag="button"
      @click.native="previous"
    />
    <div v-else class="previous-control control h-full w-1/2 absolute left-0 top-0 z-20 cursor-previous" @click="previous" />
    <transition-group
      tag="ul"
      enter-active-class="duration-500 in-out transform"
      leave-active-class="duration-300 out-in transform"
      enter-class="translate-y-full absolute opacity-0"
      :leave-to-class="`absolute h-full w-full md:z-10 inset-0 ${transitionLeave}`"
      class="slider-list relative grid gap-5 auto-cols-fr grid-flow-col-dense overflow-hidden"
    >
      <template
        v-for="(component, index) in blok.body"
      >
        <slot v-if="index < (max >= blok.body.length ? defaultMax : maxSlides) && blok.slider_mode === 'slider' && $store.state.data.windowWidth >= 640" name="slider" :previous="previous" :next="next" :component="component" />
        <slot v-else-if="index === currentSlide" name="slider" :previous="previous" :next="next" :component="component" />
      </template>
    </transition-group>
    <div v-if="blok.slider_mode === 'carousel'" class="dot-contaienr w-full grid grid-flow-col-dense gap-5 justify-center my-5 md:my-10">
      <template v-for="dot in blok.body.length">
        <span :key="dot" :class="`dot-${dot} ${dot === currentSlide + 1 ? 'transform -translate-y-1 duration-500' : ''} transition-transform select-none`" v-text="`•`" />
      </template>
    </div>
    <Icon
      v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop"
      :class="`next-control control absolute z-10 md:z-auto top-1/2 right-0 md:-right-2 transform ${blok.slider_mode === 'slider' ? '-translate-y-1/2' : '-translate-y-3/4'} md:translate-x-full`"
      next
      size="p-2 md:p-3 w-9 md:w-12"
      tag="button"
      @click.native="next"
    />
    <div v-else class="next-control control h-full w-1/2 absolute right-0 top-0 z-20 cursor-next" @click="next" />
  </div>
  <div v-else-if="hasSlot('no_slider')" class="container-wrapper">
    <slot name="no_slider" />
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
      defaultMax: this.blok.body.length - 1,
      currentSlide: 0,
      transitionLeave: ''
    }
  },
  computed: {
    maxSlides () {
      if (this.max) {
        if (this.$store.state.data.windowWidth >= 1536) {
          return this.$rangeItems(Number(this.blok.max_slides), 5)
        } else if (this.$store.state.data.windowWidth >= 1280) {
          return this.$rangeItems(Number(this.blok.max_slides), 4)
        } else if (this.$store.state.data.windowWidth >= 1024) {
          return this.$rangeItems(Number(this.blok.max_slides), 3)
        } else if (this.$store.state.data.windowWidth >= 640) {
          return this.$rangeItems(Number(this.blok.max_slides), 2)
        }
        return this.$rangeItems(Number(this.blok.max_slides), 1)
      } else {
        if (this.$store.state.data.windowWidth >= 1536) {
          return this.$rangeItems(this.defaultMax, 5)
        } else if (this.$store.state.data.windowWidth >= 1280) {
          return this.$rangeItems(this.defaultMax, 4)
        } else if (this.$store.state.data.windowWidth >= 1024) {
          return this.$rangeItems(this.defaultMax, 3)
        } else if (this.$store.state.data.windowWidth >= 640) {
          return this.$rangeItems(this.defaultMax, 2)
        }
        return this.$rangeItems(this.defaultMax, 1)
      }
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
      if (this.blok.slider_mode === 'slider') {
        this.sliderMove(this.blok.body, -1, -this.blok.body.length)
      } else if (this.blok.slider_mode === 'carousel' && this.blok.body.length - 1 > this.currentSlide) {
        this.currentSlide++
      } else {
        this.currentSlide = 0
      }
      this.transitionLeave = 'translate-x-full'
    },
    previous () {
      if (this.blok.slider_mode === 'slider') {
        this.sliderMove(this.blok.body, -this.blok.body.length, -1)
      } else if (this.blok.slider_mode === 'carousel' && this.currentSlide > 0) {
        this.currentSlide--
      } else {
        this.currentSlide = this.blok.body.length - 1
      }
      this.transitionLeave = '-translate-x-full'
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    }
  }
}
</script>
