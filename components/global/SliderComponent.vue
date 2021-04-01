<template>
  <transition-group
    tag="ul"
    enter-active-class="transition-all duration-500 ease-out"
    leave-active-class="transition-all duration-300 linear"
    :enter-class="`opacity-0 transform ${translation.enter}`"
    :leave-to-class="`opacity-0 transform ${translation.leave}`"
    class="slider w-full h-full-adapted flex flex-nowrap overflow-x-hidden"
  >
    <template v-for="(item, index) in blok">
      <li v-if="index === frame" :key="item.uuid" class="slide slide-item w-full flex flex-shrink-0 flex-grow-0">
        <NuxtLink :to="`${parent}/${item.slug}`" class="item-link w-full grid grid-rows-1 grid-cols-2">
          <div class="text-container flex flex-col justify-center row-start-1 row-end-1 col-start-1 col-end-1 px-5 relative z-10 bg-indigo-800">
            <h1 class="item-text text-white">
              {{ item.content.title }}
            </h1>
          </div>
          <div class="image-container flex row-start-1 row-end-1 col-start-2 col-end-2">
            <img class="item-image w-full object-cover object-center" :src="item.content.image.filename" :alt="item.content.image.alt">
          </div>
        </NuxtLink>
      </li>
    </template>
    <div :key="`${frame}-0`" class="flex items-center h-full-adapted absolute right-20">
      <span v-if="elements.length + 1 >= frame" class="cursor-pointer" @click="next">
        next
      </span>
      <span v-else class="cursor-pointer" @click="next">
        restart
      </span>
    </div>
    <div :key="`${frame}-1`" class="flex items-center h-full-adapted absolute left-20">
      <span v-if="elements.length + 1 >= frame" class="cursor-pointer" @click="prev">
        prev
      </span>
      <span v-else class="cursor-pointer" @click="next">
        restart
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
      frame: 0,
      translation: {
        enter: 'translate-x-full',
        leave: '-translate-x-full'
      },
      elements: this.blok
    }
  },
  methods: {
    next () {
      if (this.elements.length + 1 >= this.frame) {
        this.frame++
        this.translation.enter = 'translate-x-full'
        this.translation.leave = '-translate-x-full'
      } else {
        this.frame = 0
      }
    },
    prev () {
      if (this.frame !== 0) {
        this.frame--
        this.translation.enter = '-translate-x-full'
        this.translation.leave = 'translate-x-full'
      }
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar{
width: 0;
height: 0;
}
</style>
