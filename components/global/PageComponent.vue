<template>
  <section
    :class="`${blok.name.toLowerCase()}-page w-8/12 my-0 mx-auto
      ${$customClass('index', 'h-screen flex items-center ')}
      ${$customClass('about', 'h-screen flex items-center ')}
      ${$customClass('portfolio', 'h-screen flex items-center ')}
      ${$customClass('contact', 'h-screen grid grid-cols-2 content-center gap-x-10')}
      ${$customClass('blog', 'p-6')}`"
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
