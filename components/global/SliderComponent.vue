<template>
  <div v-if="blok.slider_mode && hasSlot('slider') && blok.body.length > 1" class="slider relative">
    <div v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 768 || !$device.isDesktop" class="slider-controls w-full absolute top-1/2 z-20 filter invert grayscale">
      <Icon
        :class="`previous-control control absolute left-0 transform bg-gray-300 ${blok.slider_mode === 'slider' ? '-translate-y-1/2' : '-translate-y-full'}`"
        previous
        size="p-2 lg:p-3 w-9 lg:w-12"
        tag="button"
        @click.native="previous"
      />
      <Icon
        :class="`next-control control absolute right-0 transform bg-gray-300 ${blok.slider_mode === 'slider' ? '-translate-y-1/2' : '-translate-y-full'}`"
        next
        size="p-2 lg:p-3 w-9 lg:w-12"
        tag="button"
        @click.native="next"
      />
    </div>
    <div v-else class="carousel-controls w-full h-full absolute top-0 z-10">
      <div class="previous-control control h-full w-full absolute -left-1/2 cursor-previous" @click="previous" />
      <div class="next-control control h-full w-full absolute -right-1/2 cursor-next" @click="next" />
    </div>
    <transition-group
      tag="ul"
      enter-active-class="duration-500 in-out transform"
      leave-active-class="duration-300 out-in transform"
      enter-class="translate-y-full absolute opacity-0"
      :leave-to-class="`absolute h-full w-full z-10 inset-0 ${transitionLeave}`"
      class="slider-list relative grid gap-5 auto-cols-fr grid-flow-col-dense overflow-hidden"
    >
      <template
        v-for="(component, index) in blok.body"
      >
        <slot v-if="index < (max >= blok.body.length ? defaultMax : maxSlides) && blok.slider_mode === 'slider' && $store.state.data.windowWidth >= 768" name="slider" :previous="previous" :next="next" :component="component" />
        <slot v-else-if="index === currentSlide" name="slider" :previous="previous" :next="next" :component="component" />
      </template>
    </transition-group>
    <div v-if="blok.slider_mode === 'carousel'" class="dot-contaienr w-full grid grid-flow-col-dense gap-5 justify-center my-5 md:my-10">
      <template v-for="dot in blok.body.length">
        <span :key="dot" :class="`dot-${dot} ${dot === currentSlide + 1 ? 'transform -translate-y-1 duration-500' : ''} transition-transform select-none`" v-text="`•`" />
      </template>
    </div>
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
      elements: this.blok.body,
      max: Number(this.blok.max_slides),
      defaultMax: this.blok.body.length - 1,
      currentSlide: 0,
      setAutoPlay: 0,
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
        } else if (this.$store.state.data.windowWidth >= 768) {
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
        } else if (this.$store.state.data.windowWidth >= 768) {
          return this.$rangeItems(this.defaultMax, 2)
        }
        return this.$rangeItems(this.defaultMax, 1)
      }
    }
  },
  mounted () {
    this.autoPlay()
  },
  methods: {
    sliderMove (oldIndex, newIndex) {
      while (oldIndex < 0) {
        oldIndex += this.elements.length
      }
      while (newIndex < 0) {
        newIndex += this.elements.length
      }
      if (newIndex >= this.elements.length) {
        let slide = newIndex - this.elements.length
        while (slide--) {
          this.elements.push(undefined)
        }
      }
      this.elements.splice(newIndex, 0, this.elements.splice(oldIndex, 1)[0])
      return this.elements
    },
    autoPlay () {
      if (this.blok.slider_mode && this.blok.auto_play) {
        this.setAutoPlay = setTimeout(this.next, 5000)
      }
    },
    next () {
      if (this.blok.slider_mode && this.blok.auto_play) {
        clearTimeout(this.setAutoPlay)
        this.setAutoPlay = 0
        this.autoPlay()
      }
      if (this.blok.slider_mode === 'slider') {
        this.sliderMove(-1, -this.elements.length)
      } else if (this.blok.slider_mode === 'carousel' && this.defaultMax > this.currentSlide) {
        this.currentSlide++
      } else {
        this.currentSlide = 0
      }
      this.transitionLeave = 'translate-x-full'
    },
    previous () {
      if (this.blok.slider_mode && this.blok.auto_play) {
        clearTimeout(this.setAutoPlay)
        this.setAutoPlay = 0
        this.autoPlay()
      }
      if (this.blok.slider_mode === 'slider') {
        this.sliderMove(-this.elements.length, -1)
      } else if (this.blok.slider_mode === 'carousel' && this.currentSlide > 0) {
        this.currentSlide--
      } else {
        this.currentSlide = this.defaultMax
      }
      this.transitionLeave = '-translate-x-full'
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    }
  }
}
</script>
