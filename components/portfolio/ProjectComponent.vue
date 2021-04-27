<template>
  <div class="project sm:w-10/12 max-w-7xl my-0 mx-auto py-16 px-6 grid grid-cols-3 gap-4">
    <h1 class="project-title row-start-1 row-end-1 col-start-1 col-end-3 p-5 text-xl lg:text-2xl break-words">
      {{ blok.title }}
    </h1>
    <div
      class="image-container row-start-2 row-end-2 col-start-1 col-end-4 border-4"
      :style="`border-color: ${blok.project_background_color.color};`"
    >
      <img class="project-image w-full h-full object-cover" :src="blok.image.filename" :alt="blok.image.alt">
    </div>
    <div class="project-container row-start-3 row-end-3 col-start-1 col-end-4 p-10" :style="`background-color: ${blok.project_background_color.color};`">
      <span
        :style="`color: ${blok.project_text_color.color};`"
        class="project-description text-justify text-base"
        v-text="blok.description"
      />
    </div>
    <div class="h-20 grid self-center lg:blok grid-flow-col gap-x-5 row-start-4 row-end-4 lg:row-start-1 lg:row-end-1 col-start-1 col-end-4 lg:col-start-3 lg:col-end-3">
      <Icon
        back
        tag="button"
        :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        class="project-back h-full flex justify-center items-center"
        size="w-8"
        @click.native="goBack"
      />
      <component
        :is="blok.url_project ? 'a' : 'span'"
        v-if="$store.state.data.windowWidth < 1024"
        :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        class="project-url h-full flex justify-center items-center  text-xs text-center italic"
        :href="blok.url_project ? blok.url_project : false"
        :target="blok.url_project ? '_blank' : false"
        :rel="blok.url_project ? 'noopener noreferrer' : false"
      >
        {{ blok.url_project ? `${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}` : $languageCase('private project', 'proyecto privado', 'progetto privato') }}
      </component>
    </div>
    <div class="project-date flex justify-between grid col-start-1 col-end-4 lg:col-end-3 grid-cols-3 items-center flex-row">
      <h4 class="date-start text-right">
        {{ changeDate(blok.start_date) }}
      </h4>
      <p class="date-to text-center text-xs">
        {{ $languageCase('to', 'hasta', 'al') }}
      </p>
      <h4 class="date-end text-left">
        {{ !blok.current_project ? changeDate(blok.end_date) : $languageCase('present', 'presente', 'presente') }}
      </h4>
    </div>
    <component
      :is="blok.url_project ? 'a' : 'span'"
      v-if="$store.state.data.windowWidth >= 1024"
      class="project-url col-start-2 col-end-2 lg:col-start-3 lg:col-end-3 self-center text-center font-semibold italic whitespace-nowrap"
      :href="blok.url_project ? blok.url_project : false"
      :target="blok.url_project ? '_blank' : false"
      :rel="blok.url_project ? 'noopener noreferrer' : false"
    >
      {{ blok.url_project ? `${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}` : $languageCase('private project', 'proyecto privado', 'progetto privato') }}
    </component>
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
