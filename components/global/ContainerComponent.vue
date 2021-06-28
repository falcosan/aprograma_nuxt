<template>
  <div
    class="container-cover"
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title mb-10 text-lg font-extralight">
      {{ blok.title }}
    </h1>
    <div v-if="blok.slider_mode && elements.length > 1" class="slider-wrapper relative" :style="`background-color: ${blok.background_color_container.color};`">
      <transition
        v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop"
        enter-active-class="duration-200"
        leave-active-class="duration-200"
        enter-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <Icon
          v-show="-((slideMeasure + spaceFix) * sliderIndex) + slideMeasure <= 1"
          previous
          :class="`previous-control control absolute z-20 filter invert grayscale left-2 transform rounded-full bg-opacity-70 bg-gray-300 ${blok.slider_mode === 'slider' ? 'top-1/2 -translate-y-1/2' : 'bottom-2 md:bottom-7'}`"
          size="p-2 w-7"
          tag="button"
          @click.native="previous"
        />
      </transition>
      <div v-else-if="blok.slider_mode === 'carousel'" class="previous-control control h-full w-full absolute top-0 z-10 -left-1/2 cursor-previous" @click="previous" />
      <Icon
        v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop"
        next
        :class="`next-control control absolute z-20 filter invert grayscale right-2 transform rounded-full bg-opacity-70 bg-gray-300 ${blok.slider_mode === 'slider' ? 'top-1/2 -translate-y-1/2' : 'bottom-2 md:bottom-7'}`"
        size="p-2 w-7"
        tag="button"
        @click.native="next"
      />
      <div v-else-if="blok.slider_mode === 'carousel'" class="next-control control h-full w-full absolute top-0 z-10 -right-1/2 cursor-next" @click="next" />
      <div class="slider-box overflow-hidden">
        <ul
          v-if="blok.slider_mode === 'slider'"
          :key="sliderKey"
          :style="`transform: translateX(${-((slideMeasure + spaceFix) * sliderIndex)}px); gap: ${spaceFix}px;`"
          class="slider relative w-max grid grid-flow-col transition-transform"
        >
          <li
            v-for="component in elements"
            :key="component._uid"
            v-touch:swipe.stop.left="next"
            v-touch:swipe.stop.right="previous"
            :style="`width: ${slideMeasure}px; background-color: ${blok.background_color_component.color};`"
            class="slider-slide slide"
          >
            <component
              :is="component.component"
              :class="`${component.component.toLowerCase()}-component max-w-max my-0 mx-auto`"
              :blok="component"
              slider-mode
            />
          </li>
        </ul>
        <div v-else class="carousel-container">
          <ul
            class="carousel relative grid"
          >
            <li
              v-for="(component, index) in elements"
              :key="component._uid"
              v-hide="index === currentSlide"
              v-touch:swipe.stop.left="next"
              v-touch:swipe.stop.right="previous"
              class="carousel-slide slide row-start-1 row-end-1 col-start-1 col-end-1 transition-opacity duration-700"
              :style="`background-color: ${blok.background_color_component.color};`"
            >
              <component
                :is="component.component"
                :class="`${component.component.toLowerCase()}-component my-0 mx-auto`"
                :blok="component"
                carousel-mode
              />
            </li>
          </ul>
          <div v-if="blok.slider_mode === 'carousel'" class="dot-contaienr w-full grid grid-flow-col-dense gap-3 justify-center my-5 md:my-10">
            <span v-for="dot in elements.length" :key="dot" :class="`dot-${dot} h-1 w-1 rounded-full select-none text-xl transition-all duration-200 ${dot === currentSlide + 1 ? 'ring-1 ring-black bg-black' : 'bg-black'}`" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container-components grid gap-5 auto-cols-fr lg:grid-cols-big" :style="maxElements > 1 ? `grid-template-columns:repeat(${maxElements}, 1fr);` : false">
      <div
        v-for="component in elements"
        :key="component._uid"
        :style="`background-color: ${blok.background_color_component.color}; ${component.row_container || $store.state.data.windowWidth < 768 ? false : `grid-column-end: ${maxElements + 1}`}`"
        :class="`${component.component.toLowerCase()}-container flex justify-center ${component.row_container ? '' : 'col-start-1'}`"
      >
        <component
          :is="component.component"
          :class="`${component.component.toLowerCase()}-component`"
          :blok="component"
          :container-mode="elements.filter(item => item.row_container).length > 1"
        />
      </div>
    </div>
  </div>
</template>
<script>

export default {
  directives: {
    hide (el, bind) {
      el.style.visibility = (bind.value) ? 'visible' : 'hidden'
      el.style.opacity = (bind.value) ? '1' : '0'
    }
  },
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
      sliderKey: 0,
      sliderIndex: 0,
      currentSlide: 0,
      setAutoPlay: 0,
      slideMeasure: 0,
      transitionEnter: '',
      transitionLeave: '',
      spaceFix: 20
    }
  },
  computed: {
    rowComponent () {
      return this.elements.filter(function (item) { return item.row_container })
    },
    maxElements () {
      if (this.blok.slider_mode && this.elements.length > 1) {
        if (this.max) {
          if (this.$store.state.data.windowWidth >= 1536) {
            return this.$rangeItems(Number(this.blok.max_slides), 5)
          } else if (this.$store.state.data.windowWidth >= 1280) {
            return this.$rangeItems(Number(this.blok.max_slides), 4)
          } else if (this.$store.state.data.windowWidth >= 1024) {
            return this.$rangeItems(Number(this.blok.max_slides), 3)
          } return this.$store.state.data.windowWidth >= 640 ? this.$rangeItems(Number(this.blok.max_slides), 2) : 1
        } else {
          if (this.$store.state.data.windowWidth >= 1536) {
            return this.$rangeItems(this.defaultMax, 5)
          } else if (this.$store.state.data.windowWidth >= 1280) {
            return this.$rangeItems(this.defaultMax, 4)
          } else if (this.$store.state.data.windowWidth >= 1024) {
            return this.$rangeItems(this.defaultMax, 3)
          } return this.$store.state.data.windowWidth >= 640 ? this.$rangeItems(this.defaultMax, 2) : 1
        }
      } else {
        if (this.$store.state.data.windowWidth >= 1536) {
          return this.$rangeItems(this.rowComponent.length, 3)
        } return this.$store.state.data.windowWidth >= 768 ? this.$rangeItems(this.rowComponent.length, 2) : 1
      }
    }
  },
  watch: {
    '$store.state.data.windowWidth' () {
      if (this.blok.slider_mode && this.blok.slider_mode === 'slider') {
        this.getSliderWidth(); this.sliderKey++
      }
    },
    slideMeasure () { if (this.sliderIndex > 0) { this.sliderIndex = 0 } }
  },
  mounted () {
    if (this.blok.slider_mode) {
      if (this.blok.auto_play) {
        this.autoPlay()
      }
      if (this.blok.slider_mode === 'slider') {
        this.getSliderWidth()
      }
    }
  },
  beforeDestroy () {
    if (this.blok.slider_mode && this.blok.auto_play) {
      this.clearAutoPlay()
    }
  },
  methods: {
    setPrevious () {
      if (this.blok.slider_mode === 'slider') {
        if (-((this.slideMeasure + this.spaceFix) * this.sliderIndex) + this.slideMeasure <= 1) { this.sliderIndex-- } else { this.sliderIndex = 0 }
      } else if (this.blok.slider_mode === 'carousel') {
        if (this.currentSlide > 0) { this.currentSlide-- } else { this.currentSlide = this.defaultMax }
      }
    },
    setNext () {
      if (this.blok.slider_mode === 'slider') {
        if (-((this.slideMeasure + this.spaceFix) * this.sliderIndex) - this.$el.clientWidth >= -(this.slideMeasure * this.elements.length)) { this.sliderIndex++ } else { this.sliderIndex = 0 }
      } else if (this.blok.slider_mode === 'carousel') {
        if (this.defaultMax > this.currentSlide) { this.currentSlide++ } else { this.currentSlide = 0 }
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
      this.setAutoPlay = setTimeout(this.next, this.blok.slider_time ? `${Number(this.blok.slider_time)}000` : '5000')
    },
    clearAutoPlay () {
      clearTimeout(this.setAutoPlay)
      this.setAutoPlay = 0
    },
    getSliderWidth () {
      this.slideMeasure = this.$el.clientWidth / this.maxElements - (this.spaceFix / this.maxElements) * (this.maxElements - 1)
    }
  }
}
</script>
<style scoped>
.carousel::-webkit-scrollbar {
 display: none;
}
.carousel {
 -ms-overflow-style: none;
 scrollbar-width: none;
}
</style>
