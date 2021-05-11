<template>
  <div class="slider">
    <Icon
      v-if="blok.body.length > 4 && blok.slider_mode"
      class="previous-control control absolute top-1/2 -left-20 transform -translate-y-1/2"
      previous
      size="p-3 w-12"
      tag="button"
      @click.native="previous"
    />

    <Icon
      v-if="blok.body.length > 4 && blok.slider_mode"
      class="next-control control absolute top-1/2 -right-20 transform -translate-y-1/2"
      next
      size="p-3 w-12"
      tag="button"
      @click.native="next"
    />
  </div>
</template>
<script>

export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      maxSlice: 4,
      minSlice: 0
    }
  },
  computed: {
    sliderContainer () {
      return this.blok.body.length > 4 && this.blok.slider_mode ? this.blok.body.slice(this.minSlice, this.maxSlice) : this.blok.body
    }
  },
  methods: {

  }
}
</script>
