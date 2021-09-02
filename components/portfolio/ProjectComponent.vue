<template>
  <div class="project grid gap-5 auto-cols-fr p-5">
    <h1 class="project-title col-start-1 col-end-4 xl:col-end-3 text-2xl sm:text-3xl break-words">
      {{ blok.title }}
    </h1>
    <div v-if="$store.state.data.windowWidth >= 1280" class="project-action min-w-0 flex items-center justify-end">
      <Link v-if="blok.url_project" icon-item external-link :to="blok.url_project" :title="`${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}`">
        <template #icon>
          <Icon
            link
            :class="`project-external mr-2.5 rounded ${!$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'}`"
            :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'}; color: ${blok.text_color.color};`"
            size="w-10 h-10 p-3"
          />
        </template>
      </Link>
      <span v-else class="project-private mr-5 text-xs" v-text="!blok.url_project ? $languageCase('private project', 'proyecto privado', 'progetto privato') : ''" />
      <Link v-if="blok.url_repository" icon-item external-link :to="blok.url_repository" title="repository">
        <template #icon>
          <Icon
            git
            :class="`project-repository mr-2.5 rounded ${!$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'}`"
            :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'}; color: ${blok.text_color.color};`"
            size="w-10 h-10 p-3"
          />
        </template>
      </Link>
      <Icon
        arrow
        tag="button"
        :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'}; color: ${blok.text_color.color};`"
        :class="`project-back rounded ${!$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'}`"
        size="w-10 h-10 p-3"
        @click.native="goBack()"
      />
    </div>
    <div class="project-intro grid gap-5 auto-cols-fr col-start-1 col-end-4">
      <Modal
        v-if="blok.image.filename"
        class="modal-project w-full row-start-1 row-end-1 xl:col-start-1 xl:col-end-3"
        close-mode
        modal-style="bg-gray-200 bg-opacity-90"
      >
        <template #activator="action">
          <div class="image-container w-full aspect-w-11 aspect-h-10 md:aspect-h-9 my-0 mx-auto cursor-pointer" @click="action.open()">
            <NuxtImg
              loading="lazy"
              format="webp"
              :modifiers="{ filters: { focal: blok.image.focus ? blok.image.focus : 0 } }"
              class="intro-image h-full w-full border-t-2 border-b-2 object-cover rounded select-none"
              :src="blok.image.filename"
              :alt="blok.image.alt"
              width="1366"
              height="677"
              :fit="blok.image.focus ? null : 'in'"
              :style="`border-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'}`"
              sizes="xs:299px sm:380px md:514px lg:711px xl:804px 2xl:1366px"
            />
          </div>
        </template>
        <template #body>
          <NuxtImg
            class="image-project select-none cursor-default"
            width="1920"
            height="1980"
            format="webp"
            fit="in"
            sizes="xs:380px sm:514px md:711px lg:804px xl:1680px 2xl:1920px"
            :src="blok.image.filename"
            :alt="blok.image.alt"
          />
        </template>
      </Modal>
      <div
        :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'}; color: ${blok.text_color.color};`"
        :class="`intro-text markdown block self-start xl:row-start-1 xl:row-end-1 xl:col-start-3 xl:col-end-3 rounded ${setAlignText} ${!blok.remove_space ? 'p-5' : ''}`"
        v-html="$md.render(blok.intro)"
      />

      <div class="project-date flex flex-col ss:flex-row flex-wrap justify-evenly items-center xl:col-start-1 xl:col-end-3">
        <h4 class="date-start mb-1 ss:mb-0 text-right text-sm">
          {{ changeDate(blok.start_date) }}
        </h4>
        <p class="date-to text-center my-1 ss:my-0 text-xs">
          {{ $languageCase('to', 'hasta', 'al') }}
        </p>
        <h4 class="date-end mt-1 ss:mt-0 text-left text-sm">
          {{ blok.end_date ? changeDate(blok.end_date) : $languageCase('present', 'presente', 'presente') }}
        </h4>
      </div>
      <div v-if="$store.state.data.windowWidth < 1280" class="project-action min-w-0 flex items-center justify-end row-start-2 row-end-3 xl:col-start-2 xl:col-end-3">
        <Link v-if="blok.url_project" icon-item external-link :to="blok.url_project" :title="`${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}`">
          <template #icon>
            <Icon
              link
              :class="`project-external mr-2.5 rounded ${!$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'}`"
              :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'}; color: ${blok.text_color.color};`"
              size="w-10 h-10 p-3"
            />
          </template>
        </Link>
        <span v-else class="project-private mr-5 text-xs" v-text="!blok.url_project ? $languageCase('private project', 'proyecto privado', 'progetto privato') : ''" />
        <Link v-if="blok.url_repository" icon-item external-link :to="blok.url_repository" title="repository">
          <template #icon>
            <Icon
              git
              :class="`project-repository mr-2.5 rounded ${!$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'}`"
              :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'}; color: ${blok.text_color.color};`"
              size="w-10 h-10 p-3"
            />
          </template>
        </Link>
        <Icon
          arrow
          tag="button"
          :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'}; color: ${blok.text_color.color};`"
          :class="`project-back rounded ${!$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'}`"
          size="w-10 h-10 p-3"
          @click.native="goBack()"
        />
      </div>
    </div>
    <div v-if="blok.body.length > 0" class="project-details grid gap-5 col-start-1 col-end-4 mt-10">
      <h1 class="detail-project text-xl sm:text-2xl">
        {{ $languageCase('Project details', 'Detalles del proyecto', 'Dettagli del progetto') }}
      </h1>
      <Detail
        v-for="description in blok.body"
        :key="description._uid"
        :blok="description"
      />
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
  computed: {
    setAlignText () {
      switch (this.blok.align_text) {
        case 'right':
          return 'text-right'
        case 'center':
          return 'text-center'
        case 'justify':
          return 'text-justify'
      } return ''
    }
  },
  mounted () {
    this.$markdownRules()
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
