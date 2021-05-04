<template>
  <div class="post sm:w-10/12 md:w-9/12 lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl my-0 mx-auto py-16 sm:px-6 max-w-none prose prose-sm lg:prose-lg xl:prose-xl">
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
      <h1
        :style="`color: ${blok.post_text_color.color};`"
        class="post-title px-5 pt-5 lg:px-10 lg:pt-10"
        v-text="blok.title"
      />
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
        class="post-file w-full h-full max-h-2xl object-cover object-center"
        :alt="`${blok.file.alt} project`"
        :src="blok.file.filename"
      />
    </div>
    <div class="post-body w-full flex justify-center mx-auto break-words" :style="`background-color: ${blok.post_background_color.color};`">
      <div class="post-article w-full px-5 pb-10 sm:px-10 sm:pb-10 max-w-prose">
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
