<template>
  <div>
    <div v-html="getDescription" />
    <div> {{ blok.title }}</div>
    <img :src="blok.image.filename" :alt="blok.image.alt">
    <h4> {{ changeDate(blok.start_date) }}</h4> <h4>
      {{ !blok.current_project ? changeDate(blok.end_date) : 'current project' }}
    </h4>
    <a :href="blok.url_project" />
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
  },
  created () {
    console.log(this.$store.state.data.language)
  },
  methods: {
    changeDate (date) {
      const currentDateTime = new Date(date.replace(' ', 'T'))
      const formattedDate = `${currentDateTime.getDate()} / ${
        currentDateTime.getMonth() + 1
      } / ${currentDateTime.getFullYear()}`
      return formattedDate.toString()
    }
  }
}
</script>
