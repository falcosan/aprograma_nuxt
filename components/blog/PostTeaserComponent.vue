<template>
  <li
    v-if="postContent"
    class="post-teaser w-full block mx-auto"
  >
    <NuxtLink :key="postContent._uid" :to="postLink" class="teaser-link grid grid-cols-post-teaser-link h-50 ">
      <div
        class="teaser-content grid grid-cols-post-teaser-content grid-rows-2 gap-x-10 h-full row-start-1 row-end-1 col-start-1 col-end-3 bg-red-400 relative z-10"
        @mouseover="hoverIn()"
        @mouseleave="hoverOut()"
      >
        <component
          :is="lookFile()"
          class="teaser-file w-full h-full row-start-1 row-end-3 object-cover"
          :alt="postContent.file.alt"
          :src="postContent.file.filename"
        />
        <div class="teaser-text flex flex-col justify-center row-start-1 row-end-3">
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
        class="teaser-expanded row-start-1 row-end-1 col-start-2 col-end-2 w-28"
      >
        <div
          :class="`teaser-date ${hovered} row-start-2 col-start-3 self-end flex flex-col justify-center items-center h-full transition-transform duration-150 ease-in transform`"
        >
          <h1
            class="date-text h-auto transform rotate-90 w-max whitespace-nowrap text-3xl"
            v-text="changeDate(postContent.date)"
          />
        </div>
      </div>
    </NuxtLink>
  </li>
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
      hovered: 'not_moved'
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
      switch (this.postContent.file.filename.toLowerCase().split('.').pop()) {
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
    }
  }
}
</script>
