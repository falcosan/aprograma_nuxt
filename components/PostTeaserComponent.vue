<template>
  <nuxt-link :to="postLink" class="block w-9/12 mx-auto">
    <div class="post grid grid-cols-8 h-50">
      <div
        @mouseover="hoverIn()"
        @mouseleave="hoverOut()"
        class="post_wrapper grid grid-cols-7 grid-rows-2 gap-x-10 h-full row-start-1 row-end-1 col-start-1 col-end-3 bg-red-400 relative z-10"
      >
        <component
          :is="lookFile()"
          class="post_file w-full h-full row-start-1 row-end-3 object-cover"
          :alt="getAlt"
          :src="getFile"
        />
        <div
          class="post_text row-start-1 row-end-3 flex overflow-hidden h-full justify-center flex-col"
        >
          {{ postContent.title }}
        </div>
      </div>
      <div
        class="post_expanded row-start-1 row-end-1 col-start-2 col-end-2 w-28"
      >
        <div
          :class="`post_date ${hovered} row-start-2 col-start-3 self-end flex flex-col justify-center items-center h-full transition-transform duration-150 ease-in transform`"
        >
          <h1
            class="date_text h-auto transform rotate-90 w-max whitespace-nowrap text-3xl"
            v-text="changeDate(postContent.date)"
          />
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
 
<script>
export default {
  props: {
    postContent: {
      type: Object,
      required: true,
    },
    postLink: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      getFile: '',
      getAlt: '',
      hovered: 'not_moved',
    }
  },
  methods: {
    changeDate(date) {
      let current_datetime = new Date(date.replace(' ', 'T'))
      let formatted_date = `${current_datetime.getDate()} / ${
        current_datetime.getMonth() + 1
      } / ${current_datetime.getFullYear()}`
      return formatted_date.toString()
    },
    lookFile() {
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
    hoverIn() {
      this.hovered = 'moved translate-x-28'
    },
    hoverOut() {
      this.hovered = 'not_moved translate-x-0'
    },
    setDefaultFile() {
      if (this.postContent.file.filename) {
        this.getFile = this.postContent.file.filename
        this.getAlt = this.postContent.file.alt
      } else {
        this.getFile =
          'https://a.storyblok.com/f/106240/470x314/fcb457a1eb/giphy.gif'
        this.getAlt = 'illegal site funny website'
      }
    },
  },
  created() {
    this.setDefaultFile()
  },
}
</script>
