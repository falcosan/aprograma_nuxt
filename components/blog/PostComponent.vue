<template>
  <div class="post grid grid-cols-8 py-5 mx-auto h-50 w-9/12">
    <div
      class="post-wrapper grid grid-cols-7 grid-rows-2 gap-x-10 h-full row-start-1 row-end-1 col-start-1 col-end-3 bg-red-400 relative z-10"
      @mouseover="hoverIn()"
      @mouseleave="hoverOut()"
    >
      <component
        :is="lookFile()"
        class="post-file w-full h-full row-start-1 row-end-3 object-cover"
        :alt="getAlt"
        :src="getFile"
      />
      <div
        class="post-text row-start-1 row-end-3 flex overflow-hidden h-full justify-center flex-col"
        v-html="getPost"
      />
    </div>
    <div class="post-expanded row-start-1 row-end-1 col-start-2 col-end-2 w-28">
      <div
        :class="`post-date ${hovered} row-start-2 col-start-3 self-end flex flex-col justify-center items-center h-full transition-transform duration-150 ease-in transform`"
      >
        <h1
          class="date-text h-auto transform rotate-90 w-max whitespace-nowrap text-3xl"
          v-text="changeDate(blok.date)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
import DOMPurify from 'dompurify'
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      getFile: '',
      getAlt: '',
      hovered: 'not-moved'
    }
  },
  computed: {
    getPost () {
      return DOMPurify.sanitize(marked(this.blok.long_text))
    }
  },
  created () {
    this.setDefaultFile()
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
      switch (this.getFile.toLowerCase().split('.').pop()) {
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
    },
    hoverIn () {
      this.hovered = 'moved translate-x-28'
    },
    hoverOut () {
      this.hovered = 'not-moved translate-x-0'
    },
    setDefaultFile () {
      if (this.blok.file.filename) {
        this.getFile = this.blok.file.filename
        this.getAlt = this.blok.file.alt
      } else {
        this.getFile =
          'https://a.storyblok.com/f/106240/470x314/fcb457a1eb/giphy.gif'
        this.getAlt = 'illegal site funny website'
      }
    }
  }
}
</script>
