<template>
  <div v-if="blok.slider_mode && blok.body.length > blok.max_slides" class="slider">
    <Icon
      class="previous-control control absolute top-1/2 -left-20 transform -translate-y-1/2"
      previous
      size="p-3 w-12"
      tag="button"
      @click.native="previous"
    />
    <slot name="slider" />
    <Icon
      class="next-control control absolute top-1/2 -right-20 transform -translate-y-1/2"
      next
      size="p-3 w-12"
      tag="button"
      @click.native="next"
    />
  </div>
  <div v-else class="no-slider">
    <slot name="no_slider" />
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

  },
  methods: {

  }
}
</script>
