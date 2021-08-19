<template>
  <div
    v-if="elements.length > 0"
    :class="`container-cover w-full self-start ${carouselMode || sliderMode || containerMode ? 'grid' : 'parent-cover'}`"
  >
    <h1
      v-if="blok.title"
      :class="`container-title break-words ${sliderMode || carouselMode || containerMode ? 'm-5 text-xl' : 'mb-5 text-xl xs:text-2xl'}`"
      :style="`color: ${blok.title_color.color};`"
    >
      {{ blok.title }}
    </h1>
    <div
      :class="`container-content rounded ${blok.slider_mode === 'slider' ? 'overflow-hidden' : ''}`"
      :style="`background-color: ${blok.background_color_container.color};`"
    >
      <div
        v-if="blok.slider_mode === 'slider' || blok.slider_mode === 'carousel'"
        :class="`slider-wrapper relative ${sliderMode || containerMode ? 'flex justify-center' : ''} ${!blok.remove_space ? !blok.background_color_container.color && blok.title ? 'px-5 mb-5' : 'm-5': ''}`"
      >
        <Icon
          v-if="(blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop || sliderMode || carouselMode || blok.row_container) && !blok.hide_controllers"
          previous
          :class="`previous-control control absolute z-20 transform rounded-full bg-opacity-70 shadow-sm text-white bg-gray-500 ${blok.slider_mode === 'slider' ? 'top-1/2 -translate-y-1/2' : sliderMode || carouselMode ? 'bottom-3.5' : 'bottom-7'} ${sliderMode ? fullWidth > 295 ? 'left-10' : 'left-5' : 'left-2'}`"
          :size="`${sliderMode || carouselMode ? 'p-1.5 w-5' : 'p-2 w-6'}`"
          tag="button"
          @click.native="previous"
        />
        <div v-else-if="blok.slider_mode === 'carousel' && (!sliderMode || !carouselMode) && !blok.row_container && !blok.hide_controllers" class="previous-control control h-full w-full absolute top-0 z-10 -left-1/2 cursor-previous" @click="previous" />
        <Icon
          v-if="(blok.slider_mode === 'slider' || $store.state.data.windowWidth < 640 || !$device.isDesktop || sliderMode || carouselMode || blok.row_container) && !blok.hide_controllers"
          next
          :class="`next-control control absolute z-20 transform rounded-full bg-opacity-70 shadow-sm text-white bg-gray-500 ${blok.slider_mode === 'slider' ? 'top-1/2 -translate-y-1/2' : sliderMode || carouselMode ? 'bottom-3.5' : 'bottom-7'} ${sliderMode ? fullWidth > 295 ? 'right-10' : 'right-5' : 'right-2'}`"
          :size="`${sliderMode || carouselMode ? 'p-1.5 w-5' : 'p-2 w-6'}`"
          tag="button"
          @click.native="next('translate-x-full', '-translate-x-full')"
        />
        <div v-else-if="blok.slider_mode === 'carousel' && (!sliderMode || !carouselMode) && !blok.row_container && !blok.hide_controllers" class="next-control control h-full w-full absolute top-0 z-10 -right-1/2 cursor-next" @click="next('translate-x-full', '-translate-x-full')" />
        <div ref="sliderBox" :class="`slider-box w-full rounded ${blok.slider_mode ? 'overflow-hidden' : ''}`">
          <div v-if="blok.slider_mode === 'slider'" class="slider-container">
            <ul
              :key="sliderKey"
              :style="`transform: translateX(${-((containerWidth + spaceFix) * sliderIndex)}px); gap: ${spaceFix}px;`"
              class="slider relative grid grid-flow-col-dense transition-transform"
            >
              <template v-for="component in elements">
                <li
                  :key="component._uid"
                  v-touch:swipe.stop.left="!blok.hide_controllers ? next : null"
                  v-touch:swipe.stop.right="!blok.hide_controllers ? previous : null"
                  :style="`width: ${containerWidth}px; background-color: ${blok.background_color_component.color};`"
                  :class="`slider-slide slide flex my-0 mx-auto rounded ${setAlignContent} ${sliderMode || carouselMode || containerMode ? '' : 'parent-slide'}`"
                >
                  <component
                    :is="component.component"
                    :class="`${component.name.toLowerCase()}-component my-0 mx-auto`"
                    :blok="component"
                    slider-mode
                    :container-width="containerWidth"
                  />
                </li>
              </template>
            </ul>
          </div>
          <div v-else class="carousel-container">
            <transition-group
              tag="ul"
              class="carousel relative grid rounded"
              enter-active-class="in-out duration-500"
              leave-active-class="out-in duration-500"
              :enter-class="`transform ${transitionEnter}`"
              :leave-to-class="`transform ${transitionLeave}`"
            >
              <template v-for="(component, index) in elements">
                <li
                  v-show="index === currentSlide"
                  :key="component._uid"
                  v-touch:swipe.stop.left="!blok.hide_controllers ? next : null"
                  v-touch:swipe.stop.right="!blok.hide_controllers ? previous : null"
                  :class="`carousel-slide slide w-full flex row-start-1 row-end-1 col-start-1 col-end-1 rounded ${setAlignContent} ${index === currentSlide ? 'show' : 'hidden'} ${sliderMode || carouselMode || containerMode ? '' : 'parent-slide'}`"
                  :style="`background-color: ${blok.background_color_component.color};`"
                >
                  <component
                    :is="component.component"
                    :class="`${component.name.toLowerCase()}-component my-0 mx-auto`"
                    :blok="component"
                    carousel-mode
                    :container-width="fullWidth"
                  />
                </li>
              </template>
            </transition-group>
            <div v-if="!blok.hide_dots" class="dot-contaienr relative w-max max-w-1/2 flex flex-wrap justify-center z-20 my-7 mx-auto">
              <span v-for="dot in elements.length" :key="dot" :class="`dot-number_${dot} w-3.5 h-3.5 inline-block m-1.5 rounded-full shadow-inner select-none cursor-pointer transform scale-90 transition-all duration-200 ${!$device.isDesktop ? '' : 'dot-desktop'} ${dot === currentSlide + 1 ? 'ring-2 ring-gray-400 bg-gray-500 bg-opacity-70' : 'bg-gray-400 bg-opacity-70'}`" @click="changeDot(dot)">
                <span v-if="$device.isDesktop" class="dot-text absolute w-5 h-5 flex justify-center items-center left-1/2 top-0 rounded-full text-xs text-white bg-opacity-70 bg-gray-500">{{ dot }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else :class="`container-components flex flex-wrap rounded ${sliderMode || carouselMode || containerMode ? '-m-2.5' : `-mx-2.5 ${blok.background_color_container.color ? '' : '-mt-2.5'}`} ${!blok.remove_space ? !blok.background_color_container.color && blok.title ? 'px-5 mb-5' : 'p-5': ''}`">
        <template v-for="component in elements">
          <div
            :key="component._uid"
            :style="`flex: ${component.row_container ? `1 ${(100 - (maxElements > 1 ? spaceFix : 0)) / maxElements}%` : '100%'}; background-color: ${blok.background_color_component.color};`"
            :class="`${component.name.toLowerCase()}-container m-2.5 rounded ${setAlignContent} ${sliderMode || carouselMode || containerMode ? '' : 'parent-container'}`"
          >
            <component
              :is="component.component"
              :class="`${component.name.toLowerCase()}-component`"
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
      if (this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') {
        return this.blok.body
      } else {
        return this.blok.body.filter(component => component.resolution_show ? this.fullWidth >= Number(component.resolution_show.split('; ')[0]) : component)
      }
    },
    rowComponent () {
      return this.elements.filter(function (item) { return item.row_container })
    },
    defaultMax () {
      if (this.fullWidth >= 1239) {
        return this.$rangeItems((this.elements.length - 1), 5)
      } else if (this.fullWidth >= 983) {
        return this.$rangeItems((this.elements.length - 1), 4)
      } else if (this.fullWidth >= 727) {
        return this.$rangeItems((this.elements.length - 1), 3)
      } return this.fullWidth >= 535 ? this.$rangeItems((this.elements.length - 1), 2) : 1
    },
    maxElements () {
      if ((this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') && this.elements.length > 1) {
        if (this.max && this.max <= this.defaultMax) {
          if (this.fullWidth >= 1239) {
            return this.$rangeItems(this.max, 5)
          } else if (this.fullWidth >= 983) {
            return this.$rangeItems(this.max, 4)
          } else if (this.fullWidth >= 727) {
            return this.$rangeItems(this.max, 3)
          } return this.fullWidth >= 535 ? this.$rangeItems(this.max, 2) : 1
        } else {
          if (this.fullWidth >= 1239) {
            return this.$rangeItems(this.defaultMax, 5)
          } else if (this.fullWidth >= 983) {
            return this.$rangeItems(this.defaultMax, 4)
          } else if (this.fullWidth >= 727) {
            return this.$rangeItems(this.defaultMax, 3)
          } return this.fullWidth >= 535 ? this.$rangeItems(this.defaultMax, 2) : 1
        }
      } else if (this.columnSet && this.elements.length > 1) {
        return this.$rangeItems(this.columnSet, this.elements.length)
      } else {
        if (this.fullWidth >= 983) {
          return this.$rangeItems(this.rowComponent.length, 3)
        } return this.fullWidth >= 535 ? this.$rangeItems(this.rowComponent.length, 2) : 1
      }
    },
    setAlignContent () {
      switch (this.blok.align_content) {
        case 'start':
          return 'self-start'
        case 'center':
          return 'self-center'
        case 'end':
          return 'self-end'
      } return ''
    }
  },
  watch: {
    '$store.state.data.windowWidth' () {
      this.getContainerWidth()
      if (this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') {
        this.sliderKey++
      }
    },
    fullWidth () { if (this.sliderIndex > 0) { this.sliderIndex = 0 } }
  },
  async mounted () {
    await this.getContainerWidth()
    if (this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') {
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
    if ((this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') && this.blok.auto_play) {
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
    setNext (setEnterMove = 'opacity-0', setLeaveMove = 'opacity-0') {
      if (this.blok.slider_mode === 'slider') {
        if (-((this.containerWidth + this.spaceFix) * this.sliderIndex) - this.$refs.sliderBox.clientWidth >= -((this.containerWidth + this.spaceFix) * (this.elements.length - 1))) { this.sliderIndex++ } else {
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
        this.transitionEnter = setEnterMove
        this.transitionLeave = setLeaveMove
      }
    },
    next (enterMove, leaveMove) {
      if ((this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') && this.blok.auto_play) {
        this.setNext(enterMove, leaveMove)
        this.clearAutoPlay()
        this.autoPlay()
      } else {
        this.setNext(enterMove, leaveMove)
      }
    },
    previous () {
      if ((this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') && this.blok.auto_play) {
        this.setPrevious()
        this.clearAutoPlay()
        this.autoPlay()
      } else {
        this.setPrevious()
      }
    },
    changeDot (input) {
      this.currentSlide = input - 1
      this.transitionEnter = 'opacity-0'
      this.transitionLeave = 'opacity-0'
    },
    autoPlay () {
      this.setAutoPlay = setTimeout(this.next, this.blok.slider_time ? `${Number(this.blok.slider_time)}` : '5000')
    },
    clearAutoPlay () {
      clearTimeout(this.setAutoPlay)
      this.setAutoPlay = 0
    },
    getContainerWidth () {
      if (this.sliderMode || this.carouselMode || this.containerMode) {
        this.$nextTick(function () {
          this.fullWidth = this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel' ? this.$refs.sliderBox.clientWidth : this.$el.clientWidth
          this.containerWidth = (this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel' ? this.$refs.sliderBox.clientWidth : this.$el.clientWidth) / this.maxElements - (this.spaceFix / this.maxElements) * (this.maxElements - 1)
        })
      } else {
        this.containerWidth = (this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel' ? this.$refs.sliderBox.clientWidth : this.$el.clientWidth) / this.maxElements - (this.spaceFix / this.maxElements) * (this.maxElements - 1)
        this.fullWidth = this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel' ? this.$refs.sliderBox.clientWidth : this.$el.clientWidth
      }
    }
  }
}
</script>
<style scoped>
.slider-box .slider .slider-slide {
  -webkit-transform:translate3d(0, 0, 0);
  -moz-transform:translate3d(0, 0, 0);
  -o-transform:translate3d(0, 0, 0);
  -ms-transform:translate3d(0, 0, 0);
  transform:translate3d(0, 0, 0);
}

.hidden{
  display: flex !important;
  opacity: 0;
  pointer-events: none;
  cursor: none;
}
.show {
  transition: opacity .3s cubic-bezier(0.77, 0, 0.175, 1);
  opacity: 1;
}
.show > * {
  position: relative;
  z-index: 10;
}
.parent-cover > .container-content{
    margin: .1px;
    padding: .1px;
}
.parent-cover > .container-content > .container-components {
  position: relative;
  top: 10px;
  margin-top: -20px;
}
.dot-desktop .dot-text{
  opacity: 0;
  transform: translate(-10.5px, -25px);
  -webkit-transition: opacity .2s ease;
  -moz-transition: opacity .2s ease;
  -o-transition: opacity .2s ease;
  transition: opacity .2s ease;
}
.dot-desktop:hover .dot-text{
  opacity: 1;
}
</style>
