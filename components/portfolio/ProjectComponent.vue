<template>
  <div class="project grid gap-5 p-5">
    <h1 class="project-title flex justify-center lg:justify-start items-center col-start-1 col-end-4 lg:col-end-3 text-xl lg:text-2xl text-center lg:text-left break-words">
      {{ blok.title }}
    </h1>
    <div class="project-intro grid gap-5 col-start-1 col-end-4">
      <Modal
        v-if="blok.image.filename"
        class="modal-project w-full row-start-1 row-end-1 xl:col-start-1 xl:col-end-3"
        close-mode
        modal-style="bg-gray-200 bg-opacity-90"
      >
        <template #activator="action">
          <div class="image-container max-w-xs md:max-w-xl xl:max-w-full my-0 mx-auto cursor-pointer" @click="action.open()">
            <img
              class="intro-image border-2 object-contain select-none"
              height="auto"
              width="100%"
              :src="blok.image.filename"
              :alt="blok.image.alt"
              :style="`border-color: ${blok.project_background_color.color}`"
            >
          </div>
        </template>
        <template #body>
          <img class="image-project select-none cursor-default" height="auto" width="auto" :src="blok.image.filename" :alt="blok.image.alt">
        </template>
      </Modal>
      <component
        :is="blok.url_project ? 'a' : 'span'"
        v-if="$store.state.data.windowWidth >= 1024"
        :class="`project-url xl:row-start-2 xl:row-end-2 xl:col-start-3 xl:col-end-3 ${blok.url_project ? ' font-semibold' : ' italic'} text-center truncate`"
        :href="blok.url_project ? blok.url_project : false"
        :target="blok.url_project ? '_blank' : false"
        :rel="blok.url_project ? 'noopener noreferrer' : false"
      >
        {{ blok.url_project ? `${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}` : $languageCase('private project', 'proyecto privado', 'progetto privato') }}
      </component>
      <span
        :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        class="intro-text max-w-none p-5 rounded-md"
        v-html="$md.render(blok.intro)"
      />
      <div class="project-date flex items-baseline justify-around xl:col-start-1 xl:col-end-3">
        <h4 class="date-start text-right text-sm sm:text-base">
          {{ changeDate(blok.start_date) }}
        </h4>
        <p class="date-to text-center text-xs">
          {{ $languageCase('to', 'hasta', 'al') }}
        </p>
        <h4 class="date-end text-left text-sm sm:text-base">
          {{ !blok.current_project ? changeDate(blok.end_date) : $languageCase('present', 'presente', 'presente') }}
        </h4>
      </div>
    </div>
    <div v-if="$contentByName(blok.body, 'Detail').length > 0" class="project-details col-start-1 col-end-4 mt-5 border-t-4 border-dotted">
      <h1 class="detail-title mb-10 pt-10 text-lg font-light">
        {{ $languageCase('Project details', 'Detalles del proyecto', 'Dettaglio del progetto') }}
      </h1>
      <Detail
        v-for="(description, index) in blok.body"
        :key="description._uid"
        :class="`${index === blok.body.length - 1 ? '' : 'border-b-4 border-dotted pb-10 mb-10'}`"
        :inline-text-style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        :blok="description"
      />
    </div>
    <div class="project-action w-auto lg:w-60 grid self-center lg:justify-self-end lg:blok grid-flow-col gap-5 col-start-1 col-end-4 lg:row-end-1 lg:col-start-3 lg:col-end-3">
      <Icon
        arrow
        tag="button"
        :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        class="project-back h-full rounded-md hover:shadow transition-shadow duration-100"
        size="w-16 p-5"
        @click.native="goBack()"
      />
      <component
        :is="blok.url_project ? 'a' : 'span'"
        v-if="$store.state.data.windowWidth < 1024"
        :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        :class="`project-url p-5 rounded-md text-center truncate ${blok.url_project ? ' font-semibold' : ' italic'}`"
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
import Modal from '../global/ModalComponent'
export default {
  components: { Modal },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeDate (date) {
      const currentDateTime = new Date(date.replace(' ', 'T'))
      const formattedDate = `${currentDateTime.getDate()} / ${
        currentDateTime.getMonth() + 1
      } / ${currentDateTime.getFullYear()}`
      return formattedDate.toString()
    },
    goBack () {
      this.$nuxt.context.from ? this.$router.go(-1) : this.$router.push(`/${this.$route.name.split('-')[0]}`)
    }
  }
}
</script>
<style scoped>
.intro-text img{
  margin: 0 auto;
  max-width: 28rem;
}
</style>
