<template>
  <div class="project md:w-9/12 max-w-7xl md:h-screen my-0 mx-auto py-10 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-4">
    <h1 class="project-title p-10 md:p-0 md:self-center md:col-start-1 md:col-end-3 text-xl md:text-2xl">
      {{ blok.title }}
    </h1>
    <Icon
      v-if="!$store.state.data.mobile"
      back
      tag="button"
      :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
      class="project-back w-full flex justify-center items-center md:col-start-3 md:col-end-3 p-5"
      size="w-8"
      @click.native="goBack"
    />
    <div
      class="image-container flex items-center overflow-y-hidden md:col-start-1 md:col-end-3 md:border-4"
      :style="`border-color: ${blok.project_background_color.color};`"
    >
      <img class="project-image w-full md:h-screen object-cover" :src="blok.image.filename" :alt="blok.image.alt">
    </div>
    <div class="project-container md:col-start-3 md:col-end-3 p-5" :style="`background-color: ${blok.project_background_color.color};`">
      <span
        :style="`color: ${blok.project_text_color.color};`"
        class="project-description text-justify text-base"
        v-text="blok.description"
      />
    </div>
    <div class="project-date md:col-start-1 md:col-end-3 md:grid md:grid-cols-3 items-center flex-row">
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
