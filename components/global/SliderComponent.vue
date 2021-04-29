<template>
  <transition-group
    tag="ul"
    :enter-active-class="`${transitionActive} in-out`"
    :leave-active-class="`${transitionActive} out-in`"
    :enter-class="`opacity-0 transform ${translation.enter}`"
    :leave-to-class="`opacity-0 transform ${translation.leave}`"
    class="slider w-full h-full grid grid-cols-1 grid-rows-2 overflow-hidden"
  >
    <template v-for="(item, index) in blok">
      <li v-if="index === frame.up || index === frame.down" :key="item.uuid" :class="`slide slide-item w-full h-full flex py-5 col-start-1 col-end-1 ${index % 2 === 0 ? 'row-start-1 row-end-1 self-end' : 'row-start-2 row-end-2 self-start'}`">
        <NuxtLink :to="`${parent}/${item.slug}`" class="item-link w-full grid grid-rows-1 grid-cols-2">
          <div :class="`text-container text-xl xl:text-2xl ${index %2 == 0 ? 'col-start-1 col-end-1 text-right' : 'col-start-2 col-end-2 text-end'} flex flex-col justify-center row-start-1 row-end-1 px-5 lg:px-10`" :style="`background-color: ${item.content.teaser_background_color.color};`">
            <h2 class="item-text truncate" :style="`color: ${item.content.teaser_text_color.color};`">
              {{ item.content.title }}
            </h2>
          </div>
          <div :class="`image-container flex row-start-1 row-end-1 ${index % 2 == 0 ? 'col-start-2 col-end-2' : 'col-start-1 col-end-1'}`">
            <img class="item-image w-full object-cover object-center pointer-events-none" :src="item.content.image.filename" :alt="item.content.image.alt">
          </div>
        </NuxtLink>
      </li>
    </template>
    <li v-if="frame.down === blok.length && blok.length > 2" :key="`${indexControls}-0`" :class="`restart-control control h-full flex justify-center items-center col-start-1 col-end-1 ${blok.length % 2 == 0 ? 'row-start-1 row-end-1 self-end' : 'row-start-2 row-end-2 self-start'} cursor-pointer`">
      <Icon class="w-full h-full flex items-center justify-center" restart size="w-14" tag="button" @click.native="next" />
    </li>
    <li v-if="blok.length > 2 && frame.up + 1 < blok.length" :key="`${indexControls}-1`" class="next-control control absolute top-1/2 right-14">
      <Icon next size="w-8" tag="button" @click.native="next" />
    </li>
    <li v-if="blok.length > 2 && frame.up != 0" :key="`${indexControls}-2`" class="previous-control control absolute top-1/2 left-40">
      <Icon previous size="w-8" tag="button" @click.native="prev" />
    </li>
  </transition-group>
</template>
<script>
export default {
  props: {
    blok: {
      type: Array,
      required: true
    },
    parent: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      transitionActive: '',
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
  destroyed () {
    this.resetData()
  },
  methods: {
    next () {
      this.transitionActive = 'translation-all duration-500'
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
      this.transitionActive = 'translation-all duration-500'
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
    }
  }
}
</script>
