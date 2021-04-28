<template>
  <div class="project max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl grid gap-5 my-0 mx-auto py-16 px-6">
    <h1 class="project-title flex items-center col-start-1 col-end-4 lg:col-end-3 p-5 text-xl lg:text-2xl break-words">
      {{ blok.title }}
    </h1>
    <div v-if="blok.image.filename" class="image-container col-start-1 col-end-4 border-2" :style="`border-color: ${blok.project_background_color.color}`">
      <img class="project-image w-full h-full object-cover" :src="blok.image.filename" :alt="blok.image.alt">
    </div>
    <div class="project-date flex items-center justify-between md:justify-around col-start-1 col-end-4 lg:col-end-3 grid-cols-3">
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
      :class="`project-url col-start-2 col-end-2 lg:col-start-3 lg:col-end-3 self-center text-center${blok.url_project ? ' font-semibold' : ' italic'} whitespace-nowrap`"
      :href="blok.url_project ? blok.url_project : false"
      :target="blok.url_project ? '_blank' : false"
      :rel="blok.url_project ? 'noopener noreferrer' : false"
    >
      {{ blok.url_project ? `${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}` : $languageCase('private project', 'proyecto privado', 'progetto privato') }}
    </component>
    <div :class="`project-container h-full col-start-1 col-end-4 p-5`" :style="`background-color: ${blok.project_background_color.color};`">
      <span
        :style="`color: ${blok.project_text_color.color};`"
        class="project-intro text-justify text-base"
        v-text="blok.intro"
      />
    </div>
    <ProjectDescription
      v-for="description in blok.body"
      :key="description._uid"
      :inline-text-style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
      :blok="description"
    />
    <div class="project-action h-20 grid self-center lg:blok grid-flow-col  gap-5 col-start-1 col-end-4 lg:row-end-1 lg:col-start-3 lg:col-end-3">
      <Icon
        back
        tag="button"
        :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        class="project-back h-full flex justify-center items-center px-5"
        size="w-6"
        @click.native="goBack"
      />
      <component
        :is="blok.url_project ? 'a' : 'span'"
        v-if="$store.state.data.windowWidth < 1024"
        :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        :class="`project-url h-full flex justify-center items-center px-5${blok.url_project ? ' font-semibold' : ' italic'}`"
        :href="blok.url_project ? blok.url_project : false"
        :target="blok.url_project ? '_blank' : false"
        :rel="blok.url_project ? 'noopener noreferrer' : false"
      >
        {{ blok.url_project ? `${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}` : $languageCase('private project', 'proyecto privado', 'progetto privato') }}
      </component>
    </div>
  </div>
</template>
<script>
import ProjectDescription from './ProjectDescriptionComponent'
export default {
  components: { ProjectDescription },
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
