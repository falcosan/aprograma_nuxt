<template>
  <div class="project-slider relative">
    <transition-group
      tag="ul"
      :enter-active-class="`${transitionActive} in-out`"
      :leave-active-class="`${transitionActive} out-in`"
      :enter-class="`opacity-0 transform ${translation.enter}`"
      :leave-to-class="`opacity-0 transform ${translation.leave}`"
      class="slider-wrapper relative w-full grid grid-cols-1 grid-rows-2 gap-y-5 z-10 overflow-hidden"
    >
      <template v-for="(project, index) in blok">
        <li
          v-if="index === frame.up || index === frame.down"
          ref="slide"
          :key="project.uuid"
          tabindex="0"
          :class="`slide slide-project w-full h-80 flex col-start-1 col-end-1 ${index % 2 === 0 ? 'row-start-1 row-end-1 self-end' : 'row-start-2 row-end-2 self-start'} outline-none`"
          @keydown.right.prevent="next"
          @keydown.left.prevent="prev"
        >
          <NuxtLink v-click-outside="focusSlide" :to="`${$route.path}/${project.slug}`" class="project-link w-full grid grid-rows-1 grid-cols-2">
            <div :class="`text-container ${index %2 == 0 ? 'col-start-1 col-end-1 text-right' : 'col-start-2 col-end-2 text-end'} flex flex-col justify-center row-start-1 row-end-1`" :style="`background-color: ${project.content.teaser_background_color.color};`">
              <h2 class="project-text text-xl xl:text-2xl px-5 lg:px-10 overflow-hidden" :style="`color: ${project.content.teaser_text_color.color};`">
                {{ project.content.title }}
              </h2>
            </div>
            <div :class="`image-container flex row-start-1 row-end-1 ${index % 2 == 0 ? 'col-start-2 col-end-2' : 'col-start-1 col-end-1'}`">
              <img class="project-image w-full object-cover object-center pointer-events-none select-none" :src="project.content.image.filename" :alt="project.content.image.alt">
            </div>
          </NuxtLink>
        </li>
      </template>
      <li v-if="frame.down === blok.length && blok.length > 2" :key="`${indexControls}-0`" :class="`restart-control control h-full projects-center col-start-1 col-end-1 ${blok.length % 2 == 0 ? 'row-start-1 row-end-1 self-end' : 'row-start-2 row-end-2 self-start'} cursor-pointer`">
        <Icon class="w-full h-full" restart size="w-14" tag="button" @click.native="next" />
      </li>
    </transition-group>
    <transition-group
      tag="div"
      enter-active-class="duration-300 in-out"
      leave-active-class="duration-300 out-in"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
      class="controls w-full h-full absolute inset-0"
    >
      <span v-if="blok.length > 2 && frame.up + 1 < blok.length" :key="`${indexControls}-1`" class="next-control absolute -right-2 top-1/2 transform -translate-y-1/2 translate-x-full">
        <Icon next class="next" size="p-3 w-12" tag="button" @click.native="next" />
      </span>
      <span v-if="blok.length > 2 && frame.up != 0" :key="`${indexControls}-2`" class="previous-control absolute -left-2 top-1/2 transform -translate-y-1/2 -translate-x-full">
        <Icon previous class="previous" size="p-3 w-12" tag="button" @click.native="prev" />
      </span>
    </transition-group>
  </div>
</template>
<script>
export default {
  directives: {
    'click-outside': {
      bind (el, binding) {
        const handler = (e) => {
          if (binding.modifiers.bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.outsideClick = handler
        document.addEventListener('click', handler)
      },

      unbind (el) {
        document.removeEventListener('click', el.outsideClick)
        el.outsideClick = null
      }
    }
  },
  props: {
    blok: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      transitionActive: 'translation-all duration-500',
      indexControls: 0,
      frame: {
        up: 0,
        down: 1
      },
      translation: {
        enter: '',
        leave: ''
      }
    }
  },
  updated () {
    this.focusSlide()
  },
  beforeDestroy () {
    this.resetData()
  },
  methods: {
    next () {
      if (this.blok.length - 1 > this.frame.up && this.blok.length > this.frame.down) {
        this.indexControls++
        this.frame.up++
        this.frame.down++
        this.translation.enter = 'translate-x-full'
        this.translation.leave = '-translate-x-full'
      } else {
        this.indexControls = 0
        this.frame.up = 0
        this.frame.down = 1
        this.translation.enter = ''
        this.translation.leave = ''
      }
    },
    prev () {
      if (this.frame.up !== 0 && this.frame.down !== 1) {
        this.indexControls--
        this.frame.up--
        this.frame.down--
        this.translation.enter = '-translate-x-full'
        this.translation.leave = 'translate-x-full'
      }
    },
    resetData () {
      this.indexControls = 0
      this.frame.up = 0
      this.frame.data = 1
      this.transitionActive = ''
      this.translation.enter = ''
      this.translation.leave = ''
    },
    focusSlide () {
      this.$nextTick(function () {
        this.$refs.slide[0].focus({ preventScroll: true })
      })
    }
  }
}
</script>
<style scoped>

.project-text{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

</style>
