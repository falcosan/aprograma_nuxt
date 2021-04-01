<template>
  <transition
    tag="div"
    appear
    enter-active-class="transition-all duration-200 out-in"
    enter-class="opacity-0"
    class="logo-container"
  >
    <p :class="`logo logo-${customLogo}`">
      aprograma.
    </p>
  </transition>
</template>

<script>
export default {
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
