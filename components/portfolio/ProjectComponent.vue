<template>
  <div class="project h-full grid grid-cols-3 grid-rows-project gap-y-4 gap-x-4 bg-green-600 text-white">
    <h2 class="project-title ml-4 self-center col-start-1 col-end-3 row-start-1 row-end-1">
      {{ blok.title }}
    </h2>
    <div class="image-container flex justify-center overflow-y-hidden col-start-1 col-end-3">
      <img class="project-image w-full object-cover" :src="blok.image.filename" :alt="blok.image.alt">
    </div>
    <span class="project-description mt-4 mr-4 row-start-1 row-end-3 flex items-center justify-end text-right text-1xl" v-html="getDescription" />
    <div class="project-date col-start-1 col-end-3 grid grid-cols-3 items-center flex-row">
      <h4 class="date-start text-right">
        {{ changeDate(blok.start_date) }}
      </h4>
      <p class="date-to text-center">
        to
      </p>
      <h4 class="date-end text-left">
        {{ !blok.current_project ? changeDate(blok.end_date) : $languageCase('present', 'presente', 'presente') }}
      </h4>
    </div>
    <a
      class="project-url self-center text-center italic"
      :href="blok.url_project"
      target="_blank"
      rel="noopener"
    >{{ blok.url_project !== "" ? `${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}` : $languageCase('private project', 'proyecto privado', 'progetto privato') }}</a>
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
    console.log(this.$route.name)
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
