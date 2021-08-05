<template>
  <div class="post p-5">
    <div class="post-head relative w-full mb-5">
      <h1
        :style="`color: ${blok.post_text_color.color};`"
        class="post-title mb-5 text-2xl sm:text-3xl font-extralight"
        v-text="blok.title"
      />
      <Icon
        arrow
        :style="`background-color: ${blok.post_background_color.color}; color: ${blok.post_text_color.color};`"
        class="post-close absolute right-0 z-10 rounded-bl rounded-tr hover:shadow transition-shadow duration-100"
        tag="button"
        size="p-3 w-10"
        @click.native="goBack()"
      />
      <div v-show="!wait" :class="`post-file w-full h-60 ss:h-64 xs:h-72 sm:h-80 md:h-96 lg:h-lg xl:h-lg 2xl:h-2xl overflow-hidden rounded ${blok.file.filename ? '' : 'p-5 bg-black'}`">
        <component
          :is="blok.file.filename ? lookFile() : 'img'"
          :class="`w-full h-full object-center select-none object-cover ${blok.file.filename ? '' : 'ml-2.5'}`"
          :alt="`${blok.file.alt} project`"
          :src="setFile"
          :width="lookImage || !blok.file.filename ? '100%' : ''"
          :height="lookImage || !blok.file.filename ? '100%' : ''"
          @load="wait = false"
        />
      </div>
      <Skeleton class="w-full h-72 xs:h-xs sm:h-sm md:h-md lg:h-xl xl:h-xl 2xl:h-3xl" :wait="wait" />
    </div>
    <div class="post-body w-full flex justify-center rounded" :style="`background-color: ${blok.post_background_color.color};`">
      <div class="post-article w-full max-w-prose prose-sm lg:prose-lg py-8 lg:py-16 px-5">
        <h2
          :style="`color: ${blok.post_text_color.color};`"
          class="post-intro"
          v-text="blok.intro"
        />
        <h4
          :style="`color: ${blok.post_text_color.color};`"
          class="post-author py-3 border-b-2 border-dotted font-medium italic"
        >
          {{ $languageCase('by', 'de', 'di') }} {{ blok.author }}
        </h4>
        <article
          :style="`color: ${blok.post_text_color.color};`"
          class="post-article flex flex-col"
          v-html="$md.render(blok.long_text)"
        />
        <h5
          :style="`color: ${blok.post_text_color.color};`"
          :class="`post-date text-right ${blok.long_text ? 'pt-5 lg:pt-8 border-t-2 border-dotted' : ''}`"
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
      return this.blok.file.filename ? !!(/(gif|jpe?g|tiff?|png|webp|bmp)/gi).test(this.blok.file.filename.toLowerCase().split('.').pop()) : true
    },
    setFile () {
      return this.blok.file.filename ? this.blok.file.filename : 'https://a.storyblok.com/f/106240/4067x2440/49d9d1a222/noimagedetail.png'
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
.post-article{
  overflow-wrap: anywhere;
}
.post-article *::-webkit-scrollbar {
 display: none;
}
.post-article * {
 -ms-overflow-style: none;
 scrollbar-width: none;
}
</style>
