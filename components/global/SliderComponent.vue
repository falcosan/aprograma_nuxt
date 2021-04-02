<template>
  <transition-group
    tag="ul"
    appear
    enter-active-class="transition-all duration-400 in-out"
    leave-active-class="transition-all duration-200 out-in"
    :enter-class="`opacity-0 transform ${translation.enter}`"
    :leave-to-class="`opacity-0 transform ${translation.leave}`"
    class="slider w-full h-full-adapted grid grid-cols-1 grid-rows-2 overflow-x-hidden"
  >
    <template v-for="(item, index) in blok">
      <li v-if="index === frame.up || index === frame.down" :key="item.uuid" :class="`slide slide-item w-full h-2/3 flex p-5 col-start-1 col-end-1 ${index % 2 === 0 ? 'row-start-1 row-end-1 self-end' : 'row-start-2 row-end-2 self-start'}`">
        <NuxtLink :to="`${parent}/${item.slug}`" class="item-link w-full grid grid-rows-1 grid-cols-2">
          <div :class="`text-container ${index %2 == 0 ? 'col-start-1 col-end-1 text-right' : 'col-start-2 col-end-2 text-end'} flex flex-col justify-center row-start-1 row-end-1 px-5 relative z-10 ${customTextContainer}`">
            <h1 class="item-text text-white">
              {{ item.content.title }}
            </h1>
          </div>
          <div :class="`image-container flex row-start-1 row-end-1 ${index % 2 == 0 ? 'col-start-2 col-end-2' : 'col-start-1 col-end-1'}`">
            <img class="item-image w-full object-cover object-center" :src="item.content.image.filename" :alt="item.content.image.alt">
          </div>
        </NuxtLink>
      </li>
    </template>
    <div v-if="frame.down === blok.length && blok.length > 1" :key="`${indexControls}-0`" :class="`restart-control control h-2/3 flex justify-center items-center col-start-1 col-end-1 ${blok.length % 2 == 0 ? 'row-start-1 row-end-1 self-end' : 'row-start-2 row-end-2 self-start'} cursor-pointer`" @click="next">
      <h1>restart</h1>
    </div>
    <div :key="`${indexControls}-1`" class="next-control control flex items-center h-full-adapted absolute right-20">
      <span v-if="frame.up + 1 < blok.length" class="next-text cursor-pointer" @click="next">
        next
      </span>
    </div>
    <div :key="`${indexControls}-2`" class="previous-control control flex items-center h-full-adapted absolute left-20">
      <span v-if="frame.up != 0" class="previous-text cursor-pointer" @click="prev">
        prev
      </span>
    </div>
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
  computed: {
    customTextContainer () {
      return this.$customClass('portfolio', 'bg-green-600')
    }
  },
  destroyed () {
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
      this.translation.enter = ''
      this.translation.leave = ''
    }
  }
}
</script>
