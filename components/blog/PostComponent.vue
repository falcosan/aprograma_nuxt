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
        :class="`post-close absolute right-0 z-10 rounded-bl rounded-tr ${!$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'}`"
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
    <div class="post-body w-full justify-center rounded" :style="`background-color: ${blok.post_background_color.color};`">
      <div class="post-article w-full max-w-prose prose-sm lg:prose-lg py-7 lg:py-14 px-5 mx-auto my-0">
        <h3
          :style="`color: ${blok.post_text_color.color};`"
          class="post-intro font-extralight"
          v-text="blok.intro"
        />
        <p
          :style="`color: ${blok.post_text_color.color};`"
          class="post-author italic underline font-medium text-sm"
        >
          {{ $languageCase('by', 'de', 'di') }} {{ blok.author ? blok.author : $languageCase('Anonymous', 'Anónimo', 'Anonimo') }}
        </p>
        <article
          :style="`color: ${blok.post_text_color.color};`"
          class="post-article block"
          v-html="$md.render(blok.long_text)"
        />
        <p
          :style="`color: ${blok.post_text_color.color};`"
          class="post-date text-right"
          v-text="changeDate(blok.date)"
        />
      </div>
      <ul class="post-categories grid grid-cols-fill-tiny gap-5 pb-5 px-5">
        <li v-for="(category, index) in sortedCategories" :key="index" :class="`post-category p-2.5 text-center font-extralight text-sm rounded shadow-sm italic filter brightness-90 transition-shadow ${!$device.isDesktop ? '' : ' hover:shadow'}`" :style="`background-color: ${blok.post_background_color.color};`">
          {{ category }}
        </li>
      </ul>
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
    },
    sortedCategories () {
      return this.blok.categories.map(category => category.toLowerCase().split(', ')[this.$languageCase(0, 1, 2)]).sort()
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
