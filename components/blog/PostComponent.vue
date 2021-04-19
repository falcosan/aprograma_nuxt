<template>
  <div class="post">
    <Icon
      close
      class="post-back fixed top-10 right-10"
      tag="button"
      size="w-8"
      color="text-black"
      @click.native="goBack"
    />
    <div class="post-head w-8/12 h-screen my-0 mx-auto row-start-1 row-end-1 col-start-1 col-end-1">
      <component
        :is="lookFile()"
        class="post-file w-full h-full row-start-1 row-end-3 object-cover"
        :alt="`${blok.file.alt} project`"
        :src="blok.file.filename"
      />
    </div>
    <div :style="`color: ${blok.post_text_color.color}; background-color: ${blok.post_background_color.color};`" class="post-body w-8/12 mx-auto mb-10 grid gap-y-5 p-5">
      <h2
        class="post-title row-start-2 row-end-2 col-start-1 col-end-1 text-center"
        v-text="blok.title"
      />
      <h3
        class="post-intro row-start-3 row-end-3 col-start-1 col-end-1 text-center"
        v-text="blok.intro"
      />
      <p
        class="post-description row-start-4 row-end-4 col-start-1 col-end-1"
        v-html="blok.long_text.content"
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
export default {
  props: {
    blok: {
      type: Object,
      required: true
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
