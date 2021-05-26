<template>
  <div
    class="container-cover"
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title mb-10 text-xl">
      {{ blok.title }}
    </h1>
    <div v-if="blok.slider_mode && blok.body.length > 1" class="slider-wrapper relative" :style="`background-color: ${blok.background_color_container.color};`">
      <Icon
        v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop"
        previous
        :class="`previous-control control absolute top-1/2 z-20 filter invert grayscale left-2 transform rounded-full bg-opacity-70 bg-gray-300 ${blok.slider_mode === 'slider' ? '-translate-y-1/2' : '-translate-y-full'}`"
        size="p-2 w-7"
        tag="button"
        @click.native="previous"
      />
      <div v-else class="previous-control control h-full w-full absolute top-0 z-10 -left-1/2 cursor-previous" @click="previous" />
      <Icon
        v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop"
        next
        :class="`next-control control absolute top-1/2 z-20 filter invert grayscale right-2 transform rounded-full bg-opacity-70 bg-gray-300 ${blok.slider_mode === 'slider' ? '-translate-y-1/2' : '-translate-y-full'}`"
        size="p-2 w-7"
        tag="button"
        @click.native="next"
      />
      <div v-else class="next-control control h-full w-full absolute top-0 z-10 -right-1/2 cursor-next" @click="next" />
      <ul v-if="blok.slider_mode === 'slider'" class="slider relative overflow-hidden grid gap-5 auto-cols-fr grid-flow-col">
        <li
          v-for="(component, index) in blok.body"
          v-show="index < (max >= blok.body.length ? defaultMax : maxElements)"
          :key="component._uid"
          v-touch:swipe.stop.left="next"
          v-touch:swipe.stop.right="previous"
          :style="`background-color: ${blok.background_color_component.color};`"
          class="slider-slide slide"
        >
          <component
            :is="component.component"
            :class="`${component.component.toLowerCase()}-component max-w-max my-0 mx-auto`"
            :blok="component"
          />
        </li>
      </ul>
      <transition-group
        v-else
        tag="ul"
        enter-active-class="`in-out duration-200"
        leave-active-class="out-in duration-200"
        :enter-class="`absolute inset-0 w-full opacity-0 transform ${transitionEnter}`"
        :leave-to-class="`absolute inset-0 w-full opacity-0 transform ${transitionLeave}`"
        class="carousel grid gap-5 auto-cols-fr grid-flow-col"
      >
        <li
          v-for="(component, index) in blok.body"
          v-show="index === currentSlide"
          :key="component._uid"
          v-touch:swipe.stop.left="next"
          v-touch:swipe.stop.right="previous"
          class="carousel-slide slide"
          :style="`background-color: ${blok.background_color_component.color};`"
        >
          <component
            :is="component.component"
            :class="`${component.component.toLowerCase()}-component my-0 mx-auto`"
            :blok="component"
          />
        </li>
      </transition-group>
      <div v-if="blok.slider_mode === 'carousel'" class="dot-contaienr w-full grid grid-flow-col-dense gap-2 justify-center my-5 md:my-10">
        <span v-for="dot in blok.body.length" :key="dot" :class="`dot-${dot} h-1.5 w-1.5 rounded-full select-none text-xl transition-all ${dot === currentSlide + 1 ? 'ring-2 ring-gray-500 transform -translate-y-1 duration-200' : 'bg-black'}`" />
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

    setPrevious () {
      if (this.blok.slider_mode === 'slider') {
        this.sliderMove(-1, -this.elements.length)
      } else if (this.blok.slider_mode === 'carousel') {
        if (this.currentSlide > 0) { this.currentSlide-- } else { this.currentSlide = this.defaultMax }
        this.transitionEnter = '-translate-x-full'
        this.transitionLeave = 'translate-x-full'
      }
    },
    setNext () {
      if (this.blok.slider_mode === 'slider') {
        this.sliderMove(-this.elements.length, -1)
      } else if (this.blok.slider_mode === 'carousel') {
        if (this.defaultMax > this.currentSlide) { this.currentSlide++ } else { this.currentSlide = 0 }
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
<style scoped>
.slide.ontransition > *{
  visibility: hidden;
}
</style>
