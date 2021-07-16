<template>
  <div
    :class="`container-cover w-full ${sliderMode || containerMode || carouselMode ? 'grid items-center self-center' : ''}`"
  >
    <h1 v-if="blok.show_title && blok.title" class="container-title mb-5 md:mb-10 text-2xl font-extralight">
      {{ blok.title }}
    </h1>
    <div v-if="blok.slider_mode && elements.length > 1" :class="`slider-wrapper relative rounded-md ${sliderMode || containerMode ? 'flex justify-center items-center overflow-hidden' : carouselMode ? 'overflow-hidden' :''}`" :style="`background-color: ${blok.background_color_container.color};`">
      <Icon
        v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop || sliderMode || carouselMode || containerMode || blok.row_container"
        previous
        :class="`previous-control control absolute z-20 filter invert grayscale transform rounded-full bg-opacity-70 bg-gray-300 ${blok.slider_mode === 'slider' ? 'top-1/2 -translate-y-1/2' : 'bottom-3.5'} ${sliderMode || carouselMode ? containerWidth > 295 ? 'left-10' : 'left-5' : 'left-3'}`"
        :size="`${sliderMode || carouselMode ? 'p-1.5 w-5' : 'p-2 w-6'}`"
        tag="button"
        @click.native="previous"
      />
      <div v-else-if="blok.slider_mode === 'carousel' && (!sliderMode || !carouselMode || !containerMode) && !blok.row_container" class="previous-control control h-full w-full absolute top-0 z-10 -left-1/2 cursor-previous" @click="previous" />
      <Icon
        v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop || sliderMode || carouselMode || containerMode || blok.row_container"
        next
        :class="`next-control control absolute z-20 filter invert grayscale transform rounded-full bg-opacity-70 bg-gray-300 ${blok.slider_mode === 'slider' ? 'top-1/2 -translate-y-1/2' : 'bottom-3.5'} ${sliderMode || carouselMode ? containerWidth > 295 ? 'right-10' : 'right-5' : 'right-3'}`"
        :size="`${sliderMode || carouselMode ? 'p-1.5 w-5' : 'p-2 w-6'}`"
        tag="button"
        @click.native="next"
      />
      <div v-else-if="blok.slider_mode === 'carousel' && (!sliderMode || !carouselMode || !containerMode) && !blok.row_container" class="next-control control h-full w-full absolute top-0 z-10 -right-1/2 cursor-next" @click="next" />
      <div :class="`slider-box ${blok.slider_mode === 'slider' ? 'overflow-hidden' : ''}`">
        <div v-if="blok.slider_mode === 'slider'" class="slider-container">
          <ul
            :key="sliderKey"
            :style="`transform: translateX(${-((containerWidth + spaceFix) * sliderIndex)}px); gap: ${spaceFix}px;`"
            :class="`slider relative grid grid-flow-col transition-transform ${sliderMode || carouselMode || containerMode? 'h-full' : ''}`"
          >
            <li
              v-for="component in elements"
              :key="component._uid"
              v-touch:swipe.stop.left="next"
              v-touch:swipe.stop.right="previous"
              :style="`width: ${containerWidth}px; background-color: ${blok.background_color_component.color};`"
              class="slider-slide slide flex my-0 mx-auto rounded-md"
            >
              <component
                :is="component.component"
                :class="`${component.component.toLowerCase()}-component my-0 mx-auto ${component.component.toLowerCase() === 'container' && component.slider_mode.toLowerCase() ? 'h-full' : ''}`"
                :blok="component"
                slider-mode
                :container-width="containerWidth"
              />
            </li>
          </ul>
        </div>
        <div v-else class="carousel-container">
          <transition-group
            tag="ul"
            class="carousel relative grid items-center"
            enter-active-class="in-out duration-500"
            leave-active-class="out-in duration-500"
            :enter-class="`transform ${transitionEnter}`"
            :leave-to-class="`transform ${transitionLeave}`"
            @before-enter="disabled = true"
            @after-leave="disabled = false"
          >
            <li
              v-for="(component, index) in elements"
              v-show="index === currentSlide"
              :key="component._uid"
              v-touch:swipe.stop.left="next"
              v-touch:swipe.stop.right="previous"
              :class="`carousel-slide slide w-full h-full flex row-start-1 row-end-1 col-start-1 col-end-1 rounded-md ${index === currentSlide ? 'show' : 'hidden'}`"
              :style="`background-color: ${blok.background_color_component.color};`"
            >
              <component
                :is="component.component"
                :class="`${component.component.toLowerCase()}-component my-0 mx-auto ${component.component.toLowerCase() === 'container' && component.slider_mode.toLowerCase() ? 'h-full' : ''}`"
                :blok="component"
                carousel-mode
                :container-width="containerWidth"
              />
            </li>
          </transition-group>
          <div v-if="blok.slider_mode === 'carousel'" class="dot-contaienr w-1/2 flex flex-wrap justify-center my-5 mx-auto">
            <span v-for="dot in elements.length" :key="dot" :class="`dot-${dot} h-1 w-1 inline-block m-1 rounded-full select-none text-xl transition-all duration-200 ${dot === currentSlide + 1 ? 'ring-1 ring-black bg-black' : 'bg-black'}`" />
          </div>
        </div>
      </div>
    </div>
    <div v-else :class="`container-components grid gap-5 auto-cols-fr`" :style="maxElements > 1 ? `grid-template-columns: repeat(${maxElements}, 1fr);` : false">
      <div
        v-for="component in elements"
        :key="component._uid"
        :style="`background-color: ${blok.background_color_component.color}; ${component.row_container || $store.state.data.windowWidth < 768 ? false : `grid-column-end: ${maxElements + 1}`}`"
        :class="`${component.component.toLowerCase()}-container w-full grid rounded-md ${component.row_container ? '' : 'col-start-1'}`"
      >
        <component
          :is="component.component"
          :class="`${component.component.toLowerCase()}-component`"
          :blok="component"
          container-mode
          :container-width="containerWidth"
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
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
      type: Boolean,
      default: false
    },
    containerMode: {
      type: Boolean,
      default: false
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
      fullWidth: 0,
      containerWidth: 0,
      transitionEnter: '',
      transitionLeave: '',
      spaceFix: 20,
      disabled: false
    }
  },
  computed: {
    rowComponent () {
      return this.elements.filter(function (item) { return item.row_container })
    },
    maxElements () {
      if (this.sliderMode || this.carouselMode || this.containerMode) {
        if (this.$el.clientWidth >= 1240) {
          return this.$parent.maxElements >= 3 ? 1 : this.$rangeItems(this.defaultMax, 2)
        } return this.$el.clientWidth >= 728 && this.$parent.maxElements >= 1 ? this.$rangeItems(this.defaultMax, 2) : 1
      } else if (this.blok.slider_mode && this.elements.length > 1) {
        if (this.max && this.max <= this.defaultMax) {
          if (this.fullWidth >= 1240) {
            return this.$rangeItems(Number(this.blok.max_slides), 5)
          } else if (this.fullWidth >= 856) {
            return this.$rangeItems(Number(this.blok.max_slides), 4)
          } else if (this.fullWidth >= 728) {
            return this.$rangeItems(Number(this.blok.max_slides), 3)
          } return this.fullWidth >= 536 ? this.$rangeItems(Number(this.blok.max_slides), 2) : 1
        } else {
          if (this.fullWidth >= 1240) {
            return this.$rangeItems(this.defaultMax, 5)
          } else if (this.fullWidth >= 856) {
            return this.$rangeItems(this.defaultMax, 4)
          } else if (this.fullWidth >= 728) {
            return this.$rangeItems(this.defaultMax, 3)
          } return this.fullWidth >= 536 ? this.$rangeItems(this.defaultMax, 2) : 1
        }
      }
      return this.$store.state.data.windowWidth >= 1024 ? this.$rangeItems(this.rowComponent.length, 2) : 1
    }
  },
  watch: {
    '$store.state.data.windowWidth' () {
      this.fullWidth = this.$el.clientWidth
      this.$nextTick(function () {
        this.getContainerWidth()
      })
      if (this.blok.slider_mode) {
        this.sliderKey++
      }
    },
    containerWidth () { if (this.sliderIndex > 0) { this.sliderIndex = 0 } }
  },
  mounted () {
    this.fullWidth = this.$el.clientWidth
    this.$nextTick(function () {
      this.getContainerWidth()
    })
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
    setPrevious () {
      if (this.blok.slider_mode === 'slider') {
        if (-((this.containerWidth + this.spaceFix) * this.sliderIndex) + this.containerWidth <= 1) { this.sliderIndex-- } else {
          this.sliderIndex = this.elements.length - this.maxElements
          if (this.blok.auto_play) {
            this.clearAutoPlay()
          }
        }
      } else if (this.blok.slider_mode === 'carousel') {
        if (!this.disabled) {
          if (this.currentSlide > 0) { this.currentSlide-- } else {
            this.currentSlide = this.defaultMax
            if (this.blok.auto_play) {
              this.clearAutoPlay()
            }
          }
        }
        this.transitionEnter = '-translate-x-full'
        this.transitionLeave = 'translate-x-full'
      }
    },
    setNext () {
      if (this.blok.slider_mode === 'slider') {
        if (-((this.containerWidth + this.spaceFix) * this.sliderIndex) - this.$el.clientWidth >= -(this.containerWidth * this.elements.length)) { this.sliderIndex++ } else {
          this.sliderIndex = 0
          if (this.blok.auto_play) {
            this.clearAutoPlay()
          }
        }
      } else if (this.blok.slider_mode === 'carousel') {
        if (!this.disabled) {
          if (this.defaultMax > this.currentSlide) { this.currentSlide++ } else {
            this.currentSlide = 0
            if (this.blok.auto_play) {
              this.clearAutoPlay()
            }
          }
        }
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
      this.setAutoPlay = setTimeout(this.next, this.blok.slider_time ? `${Number(this.blok.slider_time)}000` : '5000')
    },
    clearAutoPlay () {
      clearTimeout(this.setAutoPlay)
      this.setAutoPlay = 0
    },
    getContainerWidth () {
      if (this.sliderMode || this.carouselMode || this.containerMode) {
        this.$nextTick(function () {
          this.containerWidth = this.$el.clientWidth / this.maxElements - (this.spaceFix / this.maxElements) * (this.maxElements - 1)
        })
      } else {
        this.containerWidth = this.$el.clientWidth / this.maxElements - (this.spaceFix / this.maxElements) * (this.maxElements - 1)
      }
    }

  }
}
</script>
<style scoped>
.hidden{
  display: flex !important;
  opacity: 0;
}

.show {
  transition: opacity .5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
}
.show > * {
  position: relative;
  z-index: 10;
}
</style>
