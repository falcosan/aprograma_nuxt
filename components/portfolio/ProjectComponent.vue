<template>
  <div class="project h-screen w-8/12 my-0 mx-auto p-4 grid grid-cols-3 grid-rows-project gap-y-4 gap-x-4 bg-green-600 text-white">
    <h2 class="project-title ml-4 self-center col-start-1 col-end-3 row-start-1 row-end-1">
      {{ blok.title }}
    </h2>
    <Icon
      back
      tag="button"
      class="project-back justify-self-center self-center px-2 col-start-3 col-end-3 row-start-1 row-end-1"
      size="w-8"
      color="white"
      @click.native="goBack"
    />
    <div class="image-container flex justify-center overflow-y-hidden col-start-1 col-end-3">
      <img class="project-image w-full object-cover" :src="blok.image.filename" :alt="blok.image.alt">
    </div>
    <span class="project-description col-start-3 col-end-3 row-start-2 row-end-3 text-justify text-base" v-text="blok.description" />
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
