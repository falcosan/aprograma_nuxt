<template>
  <div class="post h-screen  my-0 mx-auto flex flex-col">
    <Icon
      close
      class="post-back fixed top-10 right-10"
      tag="button"
      size="w-8"
      color="black"
      @click.native="goBack"
    />
    <div class="post-head h-screen row-start-1 row-end-1 col-start-1 col-end-1">
      <component
        :is="lookFile()"
        class="post-file w-full h-full row-start-1 row-end-3 object-cover"
        :alt="`${blok.file.alt} project`"
        :src="blok.file.filename"
      />
    </div>
    <div class="post-body mb-10 grid gap-y-5 text-center p-5 bg-red-400">
      <h1
        class="post-title row-start-2 row-end-2 col-start-1 col-end-1"
        v-text="blok.title"
      />
      <h3
        class="post-intro row-start-3 row-end-3 col-start-1 col-end-1"
        v-text="blok.intro"
      />
      <p
        class="post-description row-start-4 row-end-4 col-start-1 col-end-1"
        v-html="getDescription"
      />
      <h4
        class="post-date row-start-5 row-end-5 col-start-1 col-end-1 w-max whitespace-nowrap"
        v-text="changeDate(blok.date)"
      />
      <h5
        class="post-date row-start-5 row-end-5 col-start-1 col-end-1 justify-self-end italic"
        v-text="blok.author"
      />
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
  computed: {
    getDescription () {
      return DOMPurify.sanitize(marked(this.blok.long_text))
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
