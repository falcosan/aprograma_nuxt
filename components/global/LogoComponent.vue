<template>
  <div :class="`logo logo-${customLogo}`" v-html="blok.logo" />
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    customLogo () {
      return this.$customClass(
        'home',
        'home absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-9xl'
      )
    }
  }
}
</script>
