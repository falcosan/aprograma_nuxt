<template>
  <div v-if="blok.slider_mode && blok.body.length > blok.max_slides && hasSlot('slider')" class="slider">
    <Icon
      class="previous-control control absolute top-1/2 -left-20 transform -translate-y-1/2"
      previous
      size="p-3 w-12"
      tag="button"
      @click.native="previous"
    />
    <div
      v-for="component in blok.body"
      :key="component._uid"
    >
      <slot name="slider" :component="component" />
    </div>
    <Icon
      class="next-control control absolute top-1/2 -right-20 transform -translate-y-1/2"
      next
      size="p-3 w-12"
      tag="button"
      @click.native="next"
    />
  </div>
  <div v-else-if="hasSlot('no_slider')" class="no-slider">
    <div
      v-for="component in blok.body"
      :key="component._uid"
    >
      <slot name="no_slider" :component="component" />
    </div>
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
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    }
  }
}
</script>
