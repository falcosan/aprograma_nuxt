<template>
  <section
    :class="`${blok.name.toLowerCase()}-page h-full
      ${$customClass('home', 'flex items-center')}
      ${$customClass('about', 'flex items-center')}
      ${$customClass('portfolio', 'flex items-center')}
      ${$customClass('contact', 'flex items-center')}`"
  >
    <component
      :is="component.component"
      v-for="component in blok.body"
      :key="component._uid"
      :blok="component"
    />
  </section>
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
