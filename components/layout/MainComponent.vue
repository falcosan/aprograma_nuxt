<template>
  <main
    :class="`p-6 w-10/12 my-0 mx-auto
    ${$customClass('home', 'h-full-adapted')}
    ${$customClass('about', 'h-full-adapted')}
    ${$customClass('portfolio', 'h-full-adapted')}
    ${$customClass('contact', 'h-full-adapted')}`"
  >
    <Nuxt v-if="blok.view" />
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
