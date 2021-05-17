<template>
  <li
    v-if="postContent"
    class="post-teaser"
  >
    <NuxtLink key="postContent._uid" :to="postLink" class="teaser-link h-full grid">
      <div
        :class="`teaser-content lg:relative lg:z-10 flex flex-col lg:flex-row row-start-1 row-end-1 col-start-1 col-end-3`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <component
          :is="lookFile()"
          :class="`teaser-file h-full lg:max-w-xs lg:w-screen xl:max-w-sm object-cover select-none`"
          :alt="postContent.file.alt"
          :src="postContent.file.filename"
        />
        <div class="teaser-text w-full grid gap-5 auto-rows-min content-center p-5 md:p-10" :style="`background-color: ${postContent.teaser_background_color.color}; color: ${postContent.teaser_text_color.color};`">
          <div class="text-description">
            <span
              class="teaser-title mb-5 text-xl md:text-3xl font-medium overflow-hidden"
            >
              {{ postContent.title }}
            </span>
            <span
              :style="`-webkit-line-clamp: ${$device.isDesktop ? '3' : '2'};`"
              class="teaser-intro text-base md:text-md overflow-hidden"
            >
              {{ postContent.intro }}
            </span>
          </div>
          <span
            v-if="$store.state.data.windowWidth < 1024 || !$device.isDesktop"
            class="text-date text-right text-lg"
            v-text="changeDate(postContent.date)"
          />
        </div>
      </div>
      <transition
        enter-active-class="duration-200 linear"
        leave-active-class="duration-200 linear"
        enter-class="-translate-x-full"
        leave-to-class="-translate-x-full"
      >
        <span
          v-if="expanded && $store.state.data.windowWidth >= 1024 && $device.isDesktop"
          class="date-text justify-self-end row-start-1 row-end-1 col-start-2 col-end-2 -mr-10 text-3xl transform rotate-90 whitespace-nowrap pointer-events-none"
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
      }
    }
  }
}
</script>
<style scoped>

.teaser-title{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.teaser-intro{
   display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
