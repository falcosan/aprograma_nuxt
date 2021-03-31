<template>
  <ul class="slider h-full-adapted flex flex-nowrap overflow-x-auto">
    <li v-for="item in blok" :key="item._uid" class="slide slide-item w-full flex flex-shrink-0 flex-grow-0 bg-indigo-800">
      <NuxtLink :to="`${parent}/${item.slug}`" class="item-link w-full grid grid-rows-1 grid-cols-2">
        <div class="text-container flex flex-col justify-center row-start-1 row-end-1 col-start-1 col-end-1 px-5 relative z-10 ">
          <h1 class="item-text text-white">
            {{ item.content.title }}
          </h1>
        </div>
        <div class="image-container flex row-start-1 row-end-1 col-start-2 col-end-2">
          <img class="item-image w-full object-cover object-center" :src="item.content.image.filename" :alt="item.content.image.alt">
        </div>
      </NuxtLink>
    </li>
  </ul>
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
      slide: 0,
      element: this.blok
    }
  },
  created () {
    document.addEventListener('scroll', this.scroll)
  },

  methods: {
    scroll () {
      this.slide += 1
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
width: 0;
height: 0;
}
</style>
