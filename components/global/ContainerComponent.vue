<template>
  <div
    v-if="blok.resolution_show ? $store.state.data.windowWidth >= Number(blok.resolution_show) : true"
    :class="`container-cover w-full self-start ${carouselMode || sliderMode || containerMode ? 'grid' : 'parent-cover'}`"
  >
    <h1
      v-if="blok.show_title && blok.title"
      :class="`container-title font-extralight ${sliderMode || carouselMode || containerMode ? 'p-5' : ' text-2xl pb-5'}`"
    >
      {{ blok.title }}
    </h1>
    <div
      :class="`container-content rounded ${blok.slider_mode === 'slider' ? 'overflow-hidden' : ''}`"
      :style="`background-color: ${blok.background_color_container.color};`"
    >
      <div
        v-if="blok.slider_mode && elements.length > 1"
        :class="`slider-wrapper relative ${sliderMode || containerMode ? 'flex justify-center' : ''}`"
      >
        <Icon
          v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop || sliderMode || carouselMode || containerMode || blok.row_container"
          previous
          :class="`previous-control control absolute z-20 transform rounded-full bg-opacity-70 shadow-sm text-white bg-gray-500 ${blok.slider_mode === 'slider' ? 'top-1/2 -translate-y-1/2' : sliderMode || carouselMode || containerMode ? 'bottom-3.5' : 'bottom-0'} ${sliderMode || carouselMode ? containerWidth > 295 ? 'left-10' : 'left-5' : 'left-3'}`"
          :size="`${sliderMode || carouselMode ? 'p-1.5 w-5' : 'p-2 w-6'}`"
          tag="button"
          @click.native="previous"
        />
        <div v-else-if="blok.slider_mode === 'carousel' && (!sliderMode || !carouselMode || !containerMode) && !blok.row_container" class="previous-control control h-full w-full absolute top-0 z-10 -left-1/2 cursor-previous" @click="previous" />
        <Icon
          v-if="blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop || sliderMode || carouselMode || containerMode || blok.row_container"
          next
          :class="`next-control control absolute z-20 transform rounded-full bg-opacity-70 shadow-sm text-white bg-gray-500 ${blok.slider_mode === 'slider' ? 'top-1/2 -translate-y-1/2' : sliderMode || carouselMode || containerMode ? 'bottom-3.5' : 'bottom-0'} ${sliderMode || carouselMode ? containerWidth > 295 ? 'right-10' : 'right-5' : 'right-3'}`"
          :size="`${sliderMode || carouselMode ? 'p-1.5 w-5' : 'p-2 w-6'}`"
          tag="button"
          @click.native="next"
        />
        <div v-else-if="blok.slider_mode === 'carousel' && (!sliderMode || !carouselMode || !containerMode) && !blok.row_container" class="next-control control h-full w-full absolute top-0 z-10 -right-1/2 cursor-next" @click="next" />
        <div :class="`slider-box w-full rounded ${blok.slider_mode === 'slider' ? 'overflow-hidden' : ''}`">
          <div v-if="blok.slider_mode === 'slider'" class="slider-container">
            <ul
              :key="sliderKey"
              :style="`transform: translateX(${-((containerWidth + spaceFix) * sliderIndex)}px); gap: ${spaceFix}px;`"
              class="slider relative grid grid-flow-col transition-transform"
            >
              <template v-for="component in elements">
                <li
                  v-if="component.resolution_show ? $store.state.data.windowWidth >= Number(component.resolution_show) : true"
                  :key="component._uid"
                  v-touch:swipe.stop.left="next"
                  v-touch:swipe.stop.right="previous"
                  :style="`width: ${containerWidth}px; background-color: ${blok.background_color_component.color};`"
                  :class="`slider-slide slide h-full flex my-0 mx-auto rounded ${sliderMode || carouselMode || containerMode ? '' : 'parent-slide'}`"
                >
                  <component
                    :is="component.component"
                    :class="`${component.name.toLowerCase()}-component my-0 mx-auto ${setTextColor ? 'text-white' : ''}`"
                    :blok="component"
                    slider-mode
                    :container-width="fullWidth"
                  />
                </li>
              </template>
            </ul>
          </div>
          <div v-else class="carousel-container">
            <transition-group
              tag="ul"
              class="carousel relative grid overflow-hidden rounded"
              enter-active-class="in-out duration-500"
              leave-active-class="out-in duration-500"
              :enter-class="`transform ${transitionEnter}`"
              :leave-to-class="`transform ${transitionLeave}`"
            >
              <template v-for="(component, index) in elements">
                <li
                  v-if="component.resolution_show ? $store.state.data.windowWidth >= Number(component.resolution_show) : true"
                  v-show="index === currentSlide"
                  :key="component._uid"
                  v-touch:swipe.stop.left="next"
                  v-touch:swipe.stop.right="previous"
                  :class="`carousel-slide slide w-full h-full flex row-start-1 row-end-1 col-start-1 col-end-1 rounded ${index === currentSlide ? 'show' : 'hidden'} ${sliderMode || carouselMode || containerMode ? '' : 'parent-slide'}`"
                  :style="`background-color: ${blok.background_color_component.color};`"
                >
                  <component
                    :is="component.component"
                    :class="`${component.name.toLowerCase()}-component my-0 mx-auto ${setTextColor ? 'text-white' : ''}`"
                    :blok="component"
                    carousel-mode
                    :container-width="fullWidth"
                  />
                </li>
              </template>
            </transition-group>
            <div v-if="blok.slider_mode === 'carousel'" class="dot-contaienr w-1/2 flex flex-wrap justify-center my-5 mx-auto">
              <span v-for="dot in elements.length" :key="dot" :class="`dot-${dot} h-1 w-1 inline-block m-1 rounded-full select-none text-xl transition-all duration-200 ${dot === currentSlide + 1 ? 'ring-1 ring-gray-400 bg-gray-500' : 'bg-gray-500'}`" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="container-components grid auto-cols-fr gap-5 rounded" :style="`${maxElements >= 1 ? `grid-template-columns: repeat(${$rangeItems(maxElements, 3)}, 1fr);` : ''}`">
        <template v-for="component in elements">
          <div
            v-if="component.resolution_show ? $store.state.data.windowWidth >= Number(component.resolution_show) : true"
            :key="component._uid"
            :style="`background-color: ${blok.background_color_component.color};`"
            :class="`${component.name.toLowerCase()}-container w-full grid rounded ${sliderMode || carouselMode || containerMode ? '' : 'parent-container'} ${component.row_container || $store.state.data.windowWidth < 768 ? '' : 'col-span-full'}`"
          >
            <component
              :is="component.component"
              :class="`${component.name.toLowerCase()}-component ${setTextColor ? 'text-white' : ''}`"
              :blok="component"
              container-mode
              :container-width="fullWidth"
            />
          </div>
        </template>
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
      max: Number(this.blok.max_slides),
      columnSet: Number(this.blok.column_container),
      sliderKey: 0,
      sliderIndex: 0,
      currentSlide: 0,
      setAutoPlay: 0,
      fullWidth: 0,
      containerWidth: 0,
      transitionEnter: '',
      transitionLeave: '',
      spaceFix: 20
    }
  },
  computed: {
    elements () {
      return this.blok.body.filter(component => component.resolution_show ? this.$store.state.data.windowWidth >= Number(component.resolution_show) : component)
    },
    rowComponent () {
      return this.elements.filter(function (item) { return item.row_container })
    },
    defaultMax () {
      if (this.fullWidth >= 1240) {
        return this.$rangeItems((this.elements.length - 1), 5)
      } else if (this.fullWidth >= 856) {
        return this.$rangeItems((this.elements.length - 1), 4)
      } else if (this.fullWidth >= 728) {
        return this.$rangeItems((this.elements.length - 1), 3)
      } return this.fullWidth >= 536 ? this.$rangeItems((this.elements.length - 1), 2) : 1
    },
    maxElements () {
      if (this.blok.slider_mode && this.elements.length > 1) {
        if (this.max && this.max <= this.defaultMax) {
          if (this.fullWidth >= 1240) {
            return this.$rangeItems(this.max, 5)
          } else if (this.fullWidth >= 856) {
            return this.$rangeItems(this.max, 4)
          } else if (this.fullWidth >= 728) {
            return this.$rangeItems(this.max, 3)
          } return this.fullWidth >= 536 ? this.$rangeItems(this.max, 2) : 1
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
      if (this.columnSet && !this.blok.slider_mode) {
        if (this.fullWidth + (this.spaceFix * this.$rangeItems(this.defaultMax, 3)) >= 1240) {
          return this.$rangeItems(this.columnSet, 3)
        } return this.fullWidth + (this.spaceFix * this.$rangeItems(this.defaultMax, 3)) >= 536 ? this.$rangeItems(this.columnSet, 2) : 1
      } else {
        if (this.fullWidth >= 1240) {
          return this.$rangeItems(this.rowComponent.length, 3)
        } return this.fullWidth >= 536 ? this.$rangeItems(this.rowComponent.length, 2) : 1
      }
    },
    setTextColor () {
      if (this.blok.background_color_component.color || this.blok.background_color_container.color) {
        if (this.blok.background_color_component.color) {
          return this.$themeColor(this.blok.background_color_component.color)
        } else if (this.blok.background_color_container.color) {
          return this.$themeColor(this.blok.background_color_container.color)
        } else { return this.$themeColor(this.blok.background_color_component.color) }
      }
      return false
    }
  },
  watch: {
    '$store.state.data.windowWidth' () {
      if (!this.sliderMode && !this.carouselMode && !this.containerMode) {
        this.fullWidth = this.$el.clientWidth
      }
      this.$nextTick(function () {
        this.getContainerWidth()
      })
      if (this.blok.slider_mode) {
        this.sliderKey++
      }
    },
    fullWidth () { if (this.sliderIndex > 0) { this.sliderIndex = 0 } }
  },
  mounted () {
    if (!this.sliderMode && !this.carouselMode && !this.containerMode) {
      this.fullWidth = this.$el.clientWidth
    }
    this.$nextTick(function () {
      this.getContainerWidth()
    })
    if (this.blok.slider_mode) {
      this.sliderKey++
      if (this.blok.auto_play) {
        this.autoPlay()
      }
    }
  },
  beforeUpdate () {
    this.getContainerWidth()
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
        if (this.currentSlide > 0) { this.currentSlide-- } else {
          this.currentSlide = (this.elements.length - 1)
          if (this.blok.auto_play) {
            this.clearAutoPlay()
          }
        }
        this.transitionEnter = '-translate-x-full'
        this.transitionLeave = 'translate-x-full'
      }
    },
    setNext () {
      if (this.blok.slider_mode === 'slider') {
        if (-((this.containerWidth + this.spaceFix) * this.sliderIndex) - this.$el.clientWidth >= -((this.containerWidth + this.spaceFix) * (this.elements.length - 1))) { this.sliderIndex++ } else {
          this.sliderIndex = 0
          if (this.blok.auto_play) {
            this.clearAutoPlay()
          }
        }
      } else if (this.blok.slider_mode === 'carousel') {
        if ((this.elements.length - 1) > this.currentSlide) { this.currentSlide++ } else {
          this.currentSlide = 0
          if (this.blok.auto_play) {
            this.clearAutoPlay()
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
          this.fullWidth = this.$el.clientWidth
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
  pointer-events: none;
  cursor: none;
}
.show {
  transition: opacity .5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
}
.show > * {
  position: relative;
  z-index: 10;
}

.parent-container > .container-cover > .container-title{
  font-size: 20px;
}
</style>
