<template>
  <div class="post sm:w-9/12 max-w-7xl my-0 mx-auto py-10 md:pt-0">
    <Icon
      v-if="!$store.state.data.mobile"
      close
      class="post-back fixed top-28 right-8 text-black"
      tag="button"
      size="w-8"
      @click.native="goBack"
    />
    <div class="post-head w-full xl:h-screen my-0 mx-auto row-start-1 row-end-1 col-start-1 col-end-1">
      <component
        :is="lookFile()"
        class="post-file w-full sm:h-full row-start-1 row-end-3 sm:object-cover"
        :alt="`${blok.file.alt} project`"
        :src="blok.file.filename"
      />
    </div>
    <div class="post-body w-full flex justify-center mx-auto" :style="`background-color: ${blok.post_background_color.color};`">
      <div class="post-article w-full prose-sm sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl px-5 py-5 xl:px-0 md:py-10">
        <h1
          :style="`color: ${blok.post_text_color.color};`"
          class="post-title text-center"
          v-text="blok.title"
        />
        <h2
          :style="`color: ${blok.post_text_color.color};`"
          class="post-intro text-center"
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
