<template>
  <transition-group
    tag="section"
    appear
    appear-active-class="transition-opacity duration-200 out-in"
    appear-class="opacity-0"
    :class="`${blok.name.toLowerCase()}-page h-full
      ${$customClass('home', 'flex items-center')}
      ${$customClass('about', 'flex items-center')}
      ${$customClass('portfolio', 'flex items-center')}
      ${$customClass('contact', 'grid items-center grid-cols-2 gap-x-10')}`"
  >
    <component
      :is="component.component"
      v-for="component in blok.body"
      :key="component._uid"
      :blok="component"
    />
  </transition-group>
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
