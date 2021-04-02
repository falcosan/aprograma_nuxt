<template>
  <div class="project h-full-adapted grid grid-cols-3 p-4 gap-y-4 bg-green-600 text-white">
    <h1 class="project-title col-start-1 col-end-3 text-center">
      {{ blok.title }}
    </h1>
    <div class=" h-full flex justify-center overflow-y-hidden col-start-1 col-end-3 justify-self-center">
      <img class="project-image w-full object-cover " :src="blok.image.filename" :alt="blok.image.alt">
    </div>
    <span class="project-description flex items-center justify-end text-right text-1xl" v-html="getDescription" />
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
    <a class="project-url self-center text-center italic" :href="blok.url_project">{{ blok.url_project !== "" ? $languageCase('private project', 'proyecto privado', 'progetto privato') : $languageCase('private project', 'proyecto privado', 'progetto privato') }}</a>
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
