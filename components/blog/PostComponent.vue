<template>
  <div class="post max-w-xl md:max-w-none md:w-9/12 2xl:max-w-7xl my-0 mx-auto py-20 md:px-6">
    <Icon
      v-if="$store.state.data.windowWidth >= 768"
      back
      :style="`background-color: ${blok.post_background_color.color}; color: ${blok.post_text_color.color};`"
      :class="`post-close fixed right-6 p-3 ${$device.isDesktop ? 'top-6' : 'top-16'}`"
      tag="button"
      size="w-6"
      @click.native="$router.push(`/${$route.name.split('-')[0]}`)"
    />
    <div class="post-head w-full">
      <Icon
        v-if="$store.state.data.windowWidth < 768"
        back
        class="post-back flex justify-center absolute p-3 transform translate-x-3 translate-y-3"
        tag="button"
        size="w-6"
        :style="`background-color: ${blok.post_background_color.color}; color: ${blok.post_text_color.color};`"
        @click.native.passive="$router.push(`/${$route.name.split('-')[0]}`)"
      />
      <component
        :is="lookFile()"
        class="post-file w-full h-full max-h-3xl object-cover object-center"
        :alt="`${blok.file.alt} project`"
        :src="blok.file.filename"
      />
    </div>
    <div class="post-body w-full flex justify-center mx-auto break-words" :style="`background-color: ${blok.post_background_color.color};`">
      <div class="post-article w-full p-5 sm:p-10 max-w-prose prose prose-sm lg:prose-lg xl:prose-xl">
        <h1
          :style="`color: ${blok.post_text_color.color};`"
          class="post-title"
          v-text="blok.title"
        />
        <h2
          :style="`color: ${blok.post_text_color.color};`"
          class="post-intro"
          v-text="blok.intro"
        />
        <h3
          :style="`color: ${blok.post_text_color.color}; border-color: ${blok.post_text_color.color};`"
          class="post-author border-t border-b py-8 italic"
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
    }
  }
}
</script>
