<template>
  <li
    v-if="postContent"
    class="post-teaser"
  >
    <NuxtLink :key="postContent._uid" :to="postLink" class="teaser-link grid">
      <div
        class="teaser-content h-60 w-full relative z-10 flex row-start-1 row-end-1 col-start-1 col-end-3 bg-red-400"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <component
          :is="lookFile()"
          class="teaser-file w-96 object-cover"
          :alt="postContent.file.alt"
          :src="postContent.file.filename"
        />
        <div class="teaser-text w-full h-full flex flex-col justify-center px-5 overflow-hidden">
          <h3
            class="teaser-title"
          >
            {{ postContent.title }}
          </h3>
          <h5
            class="teaser-intro"
          >
            {{ postContent.intro }}
          </h5>
        </div>
      </div>
      <transition
        enter-active-class="duration-200 linear"
        leave-active-class="duration-200 linear"
        enter-class="-translate-x-full"
        leave-to-class="-translate-x-full"
      >
        <h1
          v-if="expanded"
          class="date-text justify-self-end row-start-1 row-end-1 col-start-2 col-end-2 -mr-10 transform rotate-90 whitespace-nowrap text-3xl pointer-events-none"
          v-text="changeDate(postContent.date)"
        />
      </transition>
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
      expanded: false
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
    }
  }
}
</script>
