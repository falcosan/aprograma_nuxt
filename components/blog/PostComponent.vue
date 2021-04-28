<template>
  <div class="post sm:w-10/12 max-w-lg sm:max-w-max relative my-0 mx-auto py-16 2xl:pt-0 px-6">
    <Icon
      back
      class="post-back flex justify-center absolute p-3 transform translate-x-3 translate-y-3"
      tag="button"
      size="w-6"
      :style="`background-color: ${blok.post_background_color.color}; color: ${blok.post_text_color.color};`"
      @click.native.passive="goBack"
    />
    <div class="post-head w-full h-screen max-h-80 sm:h-full sm:max-h-full 2xl:h-screen my-0 mx-auto row-start-1 row-end-1 col-start-1 col-end-1">
      <component
        :is="lookFile()"
        class="post-file w-full h-full  row-start-1 row-end-3 object-cover"
        :alt="`${blok.file.alt} project`"
        :src="blok.file.filename"
      />
    </div>
    <div class="post-body w-full flex justify-center mx-auto" :style="`background-color: ${blok.post_background_color.color};`">
      <div class="post-article w-full max-w-prose prose-sm lg:prose-lg p-10">
        <h1
          :style="`color: ${blok.post_text_color.color};`"
          class="post-title font-medium"
          v-text="blok.title"
        />
        <h2
          :style="`color: ${blok.post_text_color.color};`"
          class="post-intro text-justify"
          v-text="blok.intro"
        />
        <h3
          :style="`color: ${blok.post_text_color.color};`"
          class="post-author border-t border-b py-8 border-black italic"
        >
          {{ $languageCase('by', 'de', 'di') }} {{ blok.author }}
        </h3>
        <article
          :style="`color: ${blok.post_text_color.color};`"
          class="post-description"
          v-html="blok.long_text.content"
        />
        <h4
          :style="`color: ${blok.post_text_color.color};`"
          class="post-date text-right"
          v-text="changeDate(blok.date)"
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
    },
    lookFile () {
      switch (this.blok.file.filename.toLowerCase().split('.').pop()) {
        case 'jpg':
        case 'png':
        case 'gif':
        case 'svg':
          return 'img'
        case 'pdf':
          return 'embed'
        case 'mp4':
          return 'video'
      }
    }
  }
}
</script>
