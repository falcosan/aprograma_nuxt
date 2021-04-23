<template>
  <main
    class="main font-body"
  >
    <transition appear appear-active-class="page-appear-active" appear-class="page-appear" name="page">
      <Nuxt v-if="blok.view" />
    </transition>
  </main>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
