<template>
  <NuxtLink :to="postLink" class="block w-9/12 mx-auto">
    <div class="post-teaser grid grid-cols-8 h-50">
      <div
        class="teaser-head grid grid-cols-7 grid-rows-2 gap-x-10 h-full row-start-1 row-end-1 col-start-1 col-end-3 bg-red-400 relative z-10"
        @mouseover="hoverIn()"
        @mouseleave="hoverOut()"
      >
        <component
          :is="lookFile()"
          class="post_file w-full h-full row-start-1 row-end-3 object-cover"
          :alt="getAlt"
          :src="getFile"
        />
        <div class="teaser-body flex flex-col justify-center row-start-1 row-end-3">
          <h3
            class="post_text overflow-hidden"
          >
            {{ postContent.title }}
          </h3>
          <h5
            class="post_text overflow-hidden"
          >
            {{ postContent.intro }}
          </h5>
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
  </nuxtlink>
</template>

<script>
export default {
  props: {
    postContent: {
      type: Object,
      required: true
    },
    postLink: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      getFile: '',
      getAlt: '',
      hovered: 'not_moved'
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
      this.hovered = 'not_moved translate-x-0'
    },
    setDefaultFile () {
      if (this.postContent.file.filename) {
        this.getFile = this.postContent.file.filename
        this.getAlt = this.postContent.file.alt
      } else {
        this.getFile =
          'https://a.storyblok.com/f/106240/470x314/fcb457a1eb/giphy.gif'
        this.getAlt = 'illegal site funny website'
      }
    }
  }
}
</script>
