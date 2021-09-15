<template>
  <div class="post p-5">
    <div class="post-head relative w-full mb-5">
      <h1
        :style="`color: ${blok.text_color.color};`"
        class="post-title mb-5 text-2xl sm:text-3xl"
        v-text="blok.title"
      />
      <div :class="`post-file w-full h-full aspect-w-13 aspect-h-8 overflow-hidden rounded ${blok.file.filename ? '' : 'bg-black'}`">
        <component
          :is="blok.file.filename ? lookFile() : 'NuxtImg'"
          :loading="lookFile() === 'NuxtImg' || !blok.file.filename ? 'lazy' : false"
          :format="lookFile() === 'NuxtImg' || !blok.file.filename ? 'webp' : false"
          :modifiers="lookFile() === 'NuxtImg' || !blok.file.filename ? { filters: { focal: blok.file.focus ? blok.file.focus : 0 } } : false"
          class="w-full h-full object-center select-none object-cover"
          :alt="blok.file.filename ? lookFile() === 'NuxtImg' ? blok.file.alt : false : $languageCase('quantum vacuum', 'vacío cuántico', 'vuoto quantistico')"
          :src="setFile"
          :width="lookFile() === 'NuxtImg' || !blok.file.filename ? '1366' : false"
          :height="lookFile() === 'NuxtImg' || !blok.file.filename ? '707' : false"
          :fit="(lookFile() === 'NuxtImg' || !blok.file.filename) && !blok.file.focus ? 'in' : null"
          :sizes="lookFile() === 'NuxtImg' || !blok.file.filename ? 'xs:380px sm:514px md:711px lg:804px xl:1366px' : false"
        />
      </div>
    </div>
    <div class="post-body w-full justify-center rounded" :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'};`">
      <div class="post-action flex flex-wrap justify-end pt-5 px-5">
        <Icon
          arrow
          :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'}; color: ${blok.text_color.color};`"
          class="post-close rounded shadow"
          tag="button"
          size="p-3 w-10 h-10"
          @click.native="$goBack()"
        />
      </div>
      <div class="post-article w-full max-w-prose p-5 mx-auto my-0">
        <h2
          :style="`color: ${blok.text_color.color};`"
          class="post-intro text-xl sm:text-2xl"
          v-text="blok.intro"
        />
        <div class="post-info mt-5">
          <p
            :style="`color: ${blok.text_color.color};`"
            class="post-author text-sm"
          >
            {{ $languageCase('by', 'de', 'di') }} {{ blok.author ? blok.author : $languageCase('Anonymous', 'Anónimo', 'Anonimo') }}
          </p>
          <p
            :style="`color: ${blok.text_color.color};`"
            class="post-date mt-2.5 text-xs"
            v-text="changeDate(blok.date)"
          />
          <ul class="post-categories flex flex-wrap justify-end mt-5 -mb-1.5 -mx-1.5">
            <li v-for="(category, index) in sortedCategories" :key="index" class="post-category self-start m-1.5 p-2.5 text-center text-xs rounded shadow-sm italic filter brightness-95 transition-shadow" :style="`background-color: ${blok.background_color.color ? blok.background_color.color : '#e0e0e0'};`">
              {{ category }}
            </li>
          </ul>
        </div>
        <article
          :style="`color: ${blok.text_color.color};`"
          :class="`post-article markdown block my-5 ${setAlignText}`"
          v-html="$md.render(blok.long_text)"
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
  computed: {
    setFile () {
      return this.blok.file.filename ? this.blok.file.filename : 'https://a.storyblok.com/f/106240/4067x2440/49d9d1a222/noimagedetail.png'
    },
    sortedCategories () {
      return this.blok.categories.map(category => category.toLowerCase().split('; ')[this.$languageCase(0, 1, 2)]).sort()
    },
    setAlignText () {
      switch (this.blok.align_text) {
        case 'right':
          return 'text-right'
        case 'center':
          return 'text-center'
        case 'justify':
          return 'text-justify'
      } return ''
    }
  },
  mounted () {
    this.$markdownRules()
  },
  updated () {
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
        case 'pdf':
          return 'embed'
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
        case 'webp':
        case 'bmp':
        case 'tiff':
          return 'NuxtImg'
      }
    }
  }
}
</script>
