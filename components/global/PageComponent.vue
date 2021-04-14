<template>
  <transition-group
    tag="section"
    appear
    appear-active-class="transition-opacity duration-300 out-in"
    appear-class="opacity-0"
    :class="`${blok.name.toLowerCase()}-page`"
  >
    <div
      :key="`${blok.name.toLowerCase()}-page`"
      :class="`page-content
      ${$customClass('index', 'h-full-adapted flex items-center')}
      ${$customClass('about', 'h-full-adapted flex items-center')}
      ${$customClass('portfolio', 'h-full-adapted flex items-center')}
      ${$customClass('contact', 'h-full-adapted grid grid-rows-contact grid-cols-2 gap-x-10')}`"
    >
      <component
        :is="component.component"
        v-for="component in blok.body"
        :key="component._uid"
        :blok="component"
      />
    </div>
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
