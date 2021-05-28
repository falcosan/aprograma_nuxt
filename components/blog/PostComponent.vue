<template>
  <div class="post max-w-xl md:max-w-none md:w-9/12 2xl:max-w-7xl my-0 mx-auto pb-10 pt-20 px-6 prose prose-sm lg:prose-lg">
    <Icon
      v-if="$store.state.data.windowWidth >= 768"
      arrow
      :style="`background-color: ${blok.post_background_color.color}; color: ${blok.post_text_color.color};`"
      :class="`post-close fixed right-0 ${$device.isDesktop ? 'top-0' : 'top-10'}`"
      tag="button"
      size="w-12 p-3"
      @click.native="goBack()"
    />
    <div class="post-head relative w-full">
      <h1
        :style="`color: ${blok.post_text_color.color};`"
        class="post-title"
        v-text="blok.title"
      />
      <Icon
        v-if="$store.state.data.windowWidth < 768"
        arrow
        class="post-back absolute bottom-0 right-0"
        tag="button"
        size="w-9 p-2"
        :style="`background-color: ${blok.post_background_color.color}; color: ${blok.post_text_color.color};`"
        @click.native.passive="goBack()"
      />
      <component
        :is="lookFile()"
        class="post-file w-full h-full max-h-3xl object-cover object-center select-none"
        :alt="`${blok.file.alt} project`"
        :src="blok.file.filename"
      />
    </div>
    <div class="post-body w-full flex justify-center" :style="`background-color: ${blok.post_background_color.color};`">
      <div class="post-article w-full pb-14 px-5 pt-0 max-w-prose">
        <h2
          :style="`color: ${blok.post_text_color.color};`"
          class="post-intro"
          v-text="blok.intro"
        />
        <h3
          :style="`color: ${blok.post_text_color.color};`"
          class="post-author border-b-4 border-dotted py-3 italic"
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
          class="post-date pt-5 lg:pt-8 border-t-4 border-dotted text-right"
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
      }
    },
    goBack () {
      this.$nuxt.context.from ? this.$router.go(-1) : this.$router.push(`/${this.$route.name.split('-')[0]}`)
    }
  }
}
</script>
