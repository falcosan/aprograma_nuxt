<template>
  <div
    class="container-cover"
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <div v-if="blok.slider_mode && blok.body.length > 1" class="slider-wrapper relative" :style="`background-color: ${blok.background_color_container.color};`">
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
        :enter-class="`absolute opacity-0 ${transitionEnter}`"
        :leave-to-class="`absolute h-full w-full z-10 opacity-0 ${transitionLeave}`"
        class="slider relative grid gap-5 auto-cols-fr grid-flow-col-dense overflow-hidden"
      >
        <template v-for="(component, index) in blok.body">
          <li
            v-if="blok.slider_mode === 'slider' && $store.state.data.windowWidth >= 768"
            v-show="index < (max >= blok.body.length ? defaultMax : maxElements)"
            :key="component._uid"
            v-touch:swipe.stop.right="next"
            v-touch:swipe.stop.left="previous"
            class="slider-slide slide"
          >
            <component
              :is="component.component"
              :style="`background-color: ${blok.background_color_component.color};`"
              :class="`${component.component.toLowerCase()}-component`"
              :blok="component"
            />
          </li>
          <li
            v-else
            v-show="index === currentSlide"
            :key="component._uid"
            v-touch:swipe.stop.right="next"
            v-touch:swipe.stop.left="previous"
            class="carousel-slide slide"
          >
            <component
              :is="component.component"
              :style="`background-color: ${blok.background_color_component.color};`"
              :class="`${component.component.toLowerCase()}-component`"
              :blok="component"
            />
          </li>
        </template>
      </transition-group>
      <div v-if="blok.slider_mode === 'carousel'" class="dot-contaienr w-full grid grid-flow-col-dense gap-5 justify-center my-5 md:my-10">
        <span v-for="dot in blok.body.length" :key="dot" :class="`dot-${dot} ${dot === currentSlide + 1 ? 'transform -translate-y-1 duration-500' : ''} transition-transform select-none`" v-text="`•`" />
      </div>
    </div>
    <div v-else class="container-components grid gap-5 auto-cols-fr" :style="`grid-template-columns:repeat(${$store.state.data.windowWidth >= 768 ? maxElements : '1'}, 1fr);`">
      <div
        v-for="component in blok.body"
        :key="component._uid"
        :style="`background-color: ${blok.background_color_component.color}; ${component.row_container || $store.state.data.windowWidth < 768 ? false : `grid-column-end: ${rowComponent.length + 1}`}`"
        :class="`${component.component.toLowerCase()}-container flex justify-center ${component.row_container ? '' : 'col-start-1'}`"
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
  data () {
    return {
      elements: this.blok.body,
      max: Number(this.blok.max_slides),
      defaultMax: this.blok.body.length - 1,
      currentSlide: 0,
      setAutoPlay: 0,
      transitionEnter: '',
      transitionLeave: ''
    }
  },
  computed: {
    rowComponent () {
      return this.blok.body.filter(function (item) { return item.row_container })
    },
    maxElements () {
      if (this.blok.slider_mode && this.blok.body.length > 1) {
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
      } else {
        if (this.$store.state.data.windowWidth >= 1536) {
          return this.$rangeItems(this.rowComponent.length, 5)
        } else if (this.$store.state.data.windowWidth >= 1280) {
          return this.$rangeItems(this.rowComponent.length, 4)
        } else if (this.$store.state.data.windowWidth >= 1024) {
          return this.$rangeItems(this.rowComponent.length, 3)
        } else if (this.$store.state.data.windowWidth >= 768) {
          return this.$rangeItems(this.rowComponent.length, 2)
        }
        return this.$rangeItems(this.rowComponent.length, 1)
      }
    }
  },
  mounted () {
    if (this.blok.slider_mode && this.blok.auto_play) {
      this.autoPlay()
    }
  },
  beforeDestroy () {
    if (this.blok.slider_mode && this.blok.auto_play) {
      this.clearAutoPlay()
    }
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

    setNext () {
      if (this.blok.slider_mode === 'slider') {
        if (this.defaultMax > this.currentSlide) { this.sliderMove(-1, -this.elements.length) } else { this.currentSlide = 0 }
        this.transitionEnter = 'right-0 translate-y-full scale-150'
        this.transitionLeave = 'translate-x-full scale-150'
      } else if (this.blok.slider_mode === 'carousel') {
        if (this.defaultMax > this.currentSlide) { this.currentSlide++ } else { this.currentSlide = 0 }
        this.transitionEnter = '-translate-x-full'
        this.transitionLeave = 'translate-x-full'
      }
    },
    setPrevious () {
      if (this.blok.slider_mode === 'slider') {
        if (this.currentSlide > 0) { this.sliderMove(-this.elements.length, -1) } else { this.currentSlide = this.defaultMax }
        this.transitionEnter = 'left-0 translate-y-full scale-150'
        this.transitionLeave = '-translate-x-full scale-150'
      } else if (this.blok.slider_mode === 'carousel') {
        if (this.currentSlide > 0) { this.currentSlide-- } else { this.currentSlide = this.defaultMax }
        this.transitionEnter = 'translate-x-full'
        this.transitionLeave = '-translate-x-full'
      }
    },
    next () {
      if (this.blok.slider_mode && this.blok.auto_play) {
        this.setNext()
        this.clearAutoPlay()
        this.autoPlay()
      } else {
        this.setNext()
      }
    },
    previous () {
      if (this.blok.slider_mode && this.blok.auto_play) {
        this.setPrevious()
        this.clearAutoPlay()
        this.autoPlay()
      } else {
        this.setPrevious()
      }
    },
    autoPlay () {
      this.setAutoPlay = setTimeout(this.next, 5000)
    },
    clearAutoPlay () {
      clearTimeout(this.setAutoPlay)
      this.setAutoPlay = 0
    }
  }
}
</script>
