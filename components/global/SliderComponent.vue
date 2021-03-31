<template>
  <ul class="flex flex-row flex-nowrap overflow-x-auto">
    <li v-for="item in blok" :key="item._uid" class="flex flex-shrink-0 flex-grow-0">
      <NuxtLink :to="`${parent}/${item.slug}`" class="w-full h-full-adapted mr-5 bg-blue-500">
        <div> {{ item.content.title }}</div>
        <img class="w-auto object-contain" :src="item.content.image.filename" :alt="item.content.image.alt">
        <div> {{ item.content.start_date }} {{ item.content.end_date }}</div>
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
