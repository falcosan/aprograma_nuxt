<template>
  <div>
    <div v-html="getDescription" />
    <div> {{ blok.title }}</div>
    <img :src="blok.image.filename" :alt="blok.image.alt">
    <div> {{ blok.start_date }} {{ blok.end_date }}</div>
    <a :href="blok.project_url" />
  </div>
</template>
<script>
import marked from 'marked'
import DOMPurify from 'dompurify'
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    getDescription () {
      return DOMPurify.sanitize(marked(this.blok.description))
    }
  }
}
</script>
