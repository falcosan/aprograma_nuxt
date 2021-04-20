<template>
  <div class="project h-screen w-8/12 my-0 mx-auto p-7 grid grid-cols-3 gap-y-4 gap-x-4">
    <h3 class="project-title self-center col-start-1 col-end-3">
      {{ blok.title }}
    </h3>
    <Icon
      back
      tag="button"
      :style="`background-color: ${blok.project_background_color.color};`"
      class="project-back w-full flex justify-center items-center col-start-3 col-end-3 p-5"
      size="w-8"
      :color="blok.project_text_color.color"
      @click.native="goBack"
    />
    <div
      class="image-container flex items-center overflow-y-hidden col-start-1 col-end-3 border-4"
      :style="`border-color: ${blok.project_background_color.color};`"
    >
      <img class="project-image w-full h-screen object-cover" :src="blok.image.filename" :alt="blok.image.alt">
    </div>
    <div class="project-container col-start-3 col-end-3 p-5" :style="`background-color: ${blok.project_background_color.color};`">
      <span
        :style="`color: ${blok.project_text_color.color};`"
        class="project-description text-justify text-base"
        v-text="blok.description"
      />
    </div>
    <div class="project-date col-start-1 col-end-3 grid grid-cols-3 items-center flex-row">
      <h4 class="date-start text-right">
        {{ changeDate(blok.start_date) }}
      </h4>
      <p class="date-to text-center">
        {{ $languageCase('to', 'hasta', 'al') }}
      </p>
      <h4 class="date-end text-left">
        {{ !blok.current_project ? changeDate(blok.end_date) : $languageCase('present', 'presente', 'presente') }}
      </h4>
    </div>
    <a
      class="project-url self-center text-center italic  "
      :href="blok.url_project !== '' ? blok.url_project : false"
      target="_blank"
      rel="noopener noreferrer"
    >{{ blok.url_project !== "" ? `${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}` : $languageCase('private project', 'proyecto privado', 'progetto privato') }}</a>
  </div>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  methods: {
    goBack () {
      this.$router.push(`/${this.$route.name.split('-')[0]}`)
    },
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
