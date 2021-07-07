<template>
  <div class="post">
    <div class="post-head relative w-full mb-5 md:mb-10">
      <h1
        :style="`color: ${blok.post_text_color.color};`"
        class="post-title p-5 font-bold text-lg sm:text-2xl lg:text-3xl xl:text-4xl"
        v-text="blok.title"
      />
      <Icon
        arrow
        :style="`background-color: ${blok.post_background_color.color}; color: ${blok.post_text_color.color};`"
        class="post-close absolute right-0 z-10 rounded-bl-md"
        tag="button"
        size="p-3 w-10"
        @click.native="goBack()"
      />
      <component
        :is="blok.file.filename ? lookFile() : 'img'"
        v-show="!wait"
        class="post-file w-full h-72 xs:h-xs sm:h-sm md:h-md lg:h-xl xl:h-xl 2xl:h-3xl object-cover object-center select-none"
        :alt="`${blok.file.alt} project`"
        :src="setFile"
        :width="lookImage || !blok.file.filename ? '100%' : false"
        :height="lookImage || !blok.file.filename ? '100%' : false"
        @load="wait = false"
      />
      <Skeleton class="w-full h-72 xs:h-xs sm:h-sm md:h-md lg:h-xl xl:h-xl 2xl:h-3xl" :wait="wait" />
    </div>
    <div class="post-body w-full flex justify-center rounded-b-md" :style="`background-color: ${blok.post_background_color.color};`">
      <div class="post-article w-full prose prose-sm lg:prose-lg py-10 md:py-14 px-5">
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
          class="post-article"
          v-html="$md.render(blok.long_text)"
        />
        <h4
          :style="`color: ${blok.post_text_color.color};`"
          :class="`post-date text-right ${blok.long_text ? 'pt-5 lg:pt-8 border-t-4 border-dotted' : ''}`"
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
  data () {
    return {
      wait: true
    }
  },
  computed: {
    lookImage () {
      return !!(/(gif|jpe?g|tiff?|png|webp|bmp)/gi).test(this.blok.file.filename.toLowerCase().split('.').pop())
    },
    setFile () {
      return this.blok.file.filename ? this.blok.file.filename : 'https://picsum.photos/896/576'
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
<style>
.post-article img{
  margin: 0 auto;
  max-width: 24rem;
}
.post-article *::-webkit-scrollbar {
 display: none;
}
.post-article * {
 -ms-overflow-style: none;
 scrollbar-width: none;
}
</style>
