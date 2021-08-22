<template>
  <div class="post p-5">
    <div class="post-head relative w-full mb-5">
      <h1
        :style="`color: ${blok.text_color.color};`"
        class="post-title mb-5 text-2xl sm:text-3xl"
        v-text="blok.title"
      />
      <div :class="`post-file w-full h-56 xx:h-60 xs:h-72 sm:h-80 md:h-96 lg:h-md xl:h-xl 2xl:h-2xl overflow-hidden rounded ${blok.file.filename ? '' : 'p-5 bg-black'}`">
        <component
          :is="blok.file.filename ? lookFile() : 'NuxtImg'"
          :loading="lookFile() === 'NuxtImg' || !blok.file.filename ? 'lazy' : ''"
          :format="lookFile() === 'NuxtImg' || !blok.file.filename ? 'webp' : false"
          :modifiers="lookFile() === 'NuxtImg' || !blok.file.filename ? { focal: blok.file.focus ? blok.file.focus : 0 } : false"
          :class="`w-full h-full object-center select-none object-cover ${blok.file.filename ? '' : 'ml-2.5'}`"
          :alt="`${blok.file.alt} project`"
          :src="setFile"
          :sizes="lookFile() === 'NuxtImg' || !blok.file.filename ? 'xs:299px sm:380px md:514px lg:619px xl:1240' : null"
        />
      </div>
    </div>
    <div class="post-body w-full justify-center rounded" :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'};`">
      <div class="post-action flex flex-wrap-reverse sm:flex-wrap justify-end -m-2.5 py-2.5 px-5 ">
        <ul class="post-categories flex flex-wrap self-center m-1">
          <li v-for="(category, index) in sortedCategories" :key="index" class="post-category self-start m-1.5 p-2.5 text-center text-xs rounded shadow-sm italic font-extralight filter brightness-95 transition-shadow" :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'};`">
            {{ category }}
          </li>
        </ul>
        <Icon
          arrow
          :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'}; color: ${blok.text_color.color};`"
          class="post-close rounded shadow m-2.5"
          tag="button"
          size="p-3 w-10 h-10"
          @click.native="goBack()"
        />
      </div>
      <div class="post-article markdown w-full max-w-prose prose-sm lg:prose-lg py-7 px-5 mx-auto my-0">
        <h3
          :style="`color: ${blok.text_color.color};`"
          class="post-intro"
          v-text="blok.intro"
        />
        <article
          :style="`color: ${blok.text_color.color};`"
          class="post-article block pb-2.5"
          v-html="$md.render(blok.long_text)"
        />
        <p
          :style="`color: ${blok.text_color.color};`"
          class="post-date text-right"
          v-text="changeDate(blok.date)"
        />
        <p
          :style="`color: ${blok.text_color.color};`"
          class="post-author italic text-sm"
        >
          {{ $languageCase('by', 'de', 'di') }} {{ blok.author ? blok.author : $languageCase('Anonymous', 'Anónimo', 'Anonimo') }}
        </p>
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
  computed: {
    lookImage () {
      return this.blok.file.filename ? !!(/(gif|jpe?g|tiff?|png|svg|webp|bmp)/gi).test(this.blok.file.filename.toLowerCase().split('.').pop()) : true
    },
    setFile () {
      return this.blok.file.filename ? this.blok.file.filename : 'https://a.storyblok.com/f/106240/4067x2440/49d9d1a222/noimagedetail.png'
    },
    sortedCategories () {
      return this.blok.categories.map(category => category.toLowerCase().split('; ')[this.$languageCase(0, 1, 2)]).sort()
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
    lookFile () {
      switch (this.blok.file.filename.toLowerCase().split('.').pop()) {
        case 'jpg':
        case 'png':
        case 'gif':
        case 'svg':
          return 'NuxtImg'
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
