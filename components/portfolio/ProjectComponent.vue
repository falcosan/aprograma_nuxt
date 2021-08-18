<template>
  <div class="project grid gap-5 auto-cols-fr p-5">
    <h1 class="project-title col-start-1 col-end-4 xl:col-end-3 text-2xl sm:text-3xl break-words">
      {{ blok.title }}
    </h1>
    <Icon
      v-if="$store.state.data.windowWidth >= 1280"
      arrow
      tag="button"
      :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
      :class="`project-back h-10 w-10 self-end justify-self-end rounded ${!$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'}`"
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
          <div class="image-container w-full h-64 ss:h-76 xx:h-80 xs:h-88 sm:h-sm md:h-lg lg:h-xl 2xl:h-2xl my-0 mx-auto cursor-pointer" @click="action.open()">
            <NuxtImg
              :modifiers="{ filters: { focal: blok.image.focus ? blok.image.focus : 0 } }"
              class="intro-image h-full w-full border-2 object-cover rounded select-none"
              :src="blok.image.filename"
              :alt="blok.image.alt"
              width="auto"
              height="auto"
              loading="lazy"
              :style="`border-color: ${blok.project_background_color.color}`"
              :sizes="!$device.isIos ? 'xs:299px sm:380px md:514px lg:619px xl:711px 2xl:804px 3xl:883px' : null"
            />
          </div>
        </template>
        <template #body>
          <NuxtImg
            :modifiers="{ filters: { focal: blok.image.focus ? blok.image.focus : 0 } }"
            class="image-project select-none cursor-default"
            width="auto"
            height="auto"
            loading="lazy"
            :src="blok.image.filename"
            :alt="blok.image.alt"
          />
        </template>
      </Modal>
      <div
        :style="`background-color: ${blok.project_background_color.color}; color: ${blok.project_text_color.color};`"
        :class="`intro-text block self-start xl:row-start-1 xl:row-end-1 xl:col-start-3 xl:col-end-3 font-extralight rounded prose-sm lg:prose-lg ${!blok.remove_space ? 'p-5' : ''}`"
        v-html="$md.render(blok.intro)"
      />

      <div class="project-date flex flex-col ss:flex-row flex-wrap justify-evenly  items-center xl:col-start-1 xl:col-end-2 xl:mr-5">
        <h4 class="date-start mb-1 ss:mb-0 text-right">
          {{ changeDate(blok.start_date) }}
        </h4>
        <p class="date-to text-center my-1 ss:my-0 text-xs">
          {{ $languageCase('to', 'hasta', 'al') }}
        </p>
        <h4 class="date-end mt-1 ss:mt-0 text-left">
          {{ !blok.current_project ? changeDate(blok.end_date) : $languageCase('present', 'presente', 'presente') }}
        </h4>
      </div>
      <div class="project-action min-w-0 flex items-center justify-between xl:justify-end row-start-2 row-end-3 xl:col-start-2 xl:col-end-3">
        <component
          :is="blok.url_project ? 'a' : 'span'"
          class="project-url font-medium truncate"
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
          :class="`project-back w-10 rounded ${!$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'}`"
          size="p-3 w-10"
          @click.native="goBack()"
        />
      </div>
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
  mounted () {
    this.$setCodeLang()
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
.intro-text{
  word-break: break-word;
  overflow-wrap: anywhere;
}
</style>
