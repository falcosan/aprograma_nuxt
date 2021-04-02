<template>
  <span class="cursor-pointer">
    {{ $languageCase('Language', 'Idioma', 'Lingua') }}
  </span>
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
