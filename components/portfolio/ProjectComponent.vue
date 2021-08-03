<template>
  <div class="project grid gap-5 auto-cols-fr p-5">
    <h1 class="project-title flex justify-center lg:justify-start items-center col-start-1 col-end-4 xl:col-end-3 lg:px-5 text-2xl xs:text-3xl text-center xl:text-left font-extralight break-words">
      {{ blok.title }}
    </h1>
    <Icon
      v-if="$store.state.data.windowWidth >= 1280"
      arrow
      tag="button"
      :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
      class="project-back h-10 w-10 self-end justify-self-end rounded hover:shadow transition-shadow duration-100"
      size="p-3 w-10"
      @click.native="goBack()"
    />
    <div class="project-intro grid gap-5 auto-cols-fr col-start-1 col-end-4">
      <Modal
        v-if="blok.image.filename"
        class="modal-project w-full row-start-1 row-end-1 xl:col-start-1 xl:col-end-3"
        close-mode
        modal-style="bg-gray-200 bg-opacity-90"
      >
        <template #activator="action">
          <div class="image-container h-60 ss:h-64 xs:h-72 sm:h-80 md:h-96 lg:h-lg xl:h-lg 2xl:h-2xl my-0 mx-auto cursor-pointer" @click="action.open()">
            <img
              class="intro-image h-full border-2 object-cover rounded select-none"
              height="100%"
              width="100%"
              :src="blok.image.filename"
              :alt="blok.image.alt"
              :style="`border-color: ${blok.project_background_color.color}`"
            >
          </div>
        </template>
        <template #body>
          <img
            class="image-project select-none cursor-default"
            width="100%"
            height="100%"
            :src="blok.image.filename"
            :alt="blok.image.alt"
          >
        </template>
      </Modal>
      <div class="project-action min-w-0 flex items-center justify-between xl:row-start-2 xl:row-end-2 xl:col-start-3 xl:col-end-3">
        <component
          :is="blok.url_project ? 'a' : 'span'"
          :class="`project-url mr-5 ss:my-0 ss:mx-auto ss:pl-10 xl:pl-0 text-center text-sm sm:text-base truncate ${blok.url_project ? 'font-medium' : 'italic'}`"
          :href="blok.url_project ? blok.url_project : false"
          :target="blok.url_project ? '_blank' : false"
          :rel="blok.url_project ? 'noopener noreferrer' : false"
        >
          {{ blok.url_project ? `${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}` : $languageCase('private project', 'proyecto privado', 'progetto privato') }}
        </component>
        <Icon
          v-if="$store.state.data.windowWidth < 1280"
          arrow
          tag="button"
          :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
          class="project-back w-10 rounded hover:shadow transition-shadow duration-100"
          size="p-3 w-10"
          @click.native="goBack()"
        />
      </div>
      <span
        :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        class="intro-text p-5 rounded"
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
    <div v-if="$contentByName(blok.body, 'Detail').length > 0" class="project-details grid gap-5 col-start-1 col-end-4 mt-5">
      <h1 class="detail-title text-xl font-extralight">
        {{ $languageCase('Project details', 'Detalles del proyecto', 'Dettagli del progetto') }}
      </h1>
      <Detail
        v-for="description in blok.body"
        :key="description._uid"
        :inline-text-style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        :blok="description"
      />
    </div>
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
