<template>
  <li
    v-if="postContent"
    class="post-teaser"
  >
    <NuxtLink key="postContent._uid" :to="postLink" class="teaser-link h-full grid">
      <div
        :class="`teaser-content flex flex-col ${$parent.blok.row_container ? '' : 'md:flex-row md:h-56 lg:h-64 md:relative md:z-10'} row-start-1 row-end-1 col-start-1 col-end-3`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <component
          :is="lookFile()"
          :class="`teaser-file h-full w-full ${$parent.blok.row_container ? '' : 'md:w-64 lg:w-96 xl:max-w-sm'} object-cover select-none`"
          :alt="postContent.file.alt"
          :src="postContent.file.filename"
        />
        <div :class="`teaser-text w-full grid gap-5 auto-rows-min content-center p-5 ${$parent.blok.row_container ? '' : 'md:p-10'}`" :style="`background-color: ${postContent.teaser_background_color.color}; color: ${postContent.teaser_text_color.color};`">
          <div class="text-description">
            <span
              class="teaser-title mb-5 text-2xl text-center md:text-left font-medium overflow-hidden"
            >
              {{ postContent.title }}
            </span>
            <span
              :style="`-webkit-line-clamp: ${$device.isDesktop ? '3' : '2'};`"
              class="teaser-intro text-lg text-center md:text-left overflow-hidden"
            >
              {{ postContent.intro }}
            </span>
          </div>
          <span
            v-if="$store.state.data.windowWidth < 768 || !$device.isDesktop || $parent.blok.row_container"
            class="text-date text-right text-base lg:text-lg"
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
          v-if="expanded && $store.state.data.windowWidth >= 768 && $device.isDesktop && !$parent.blok.row_container"
          class="date-text justify-self-end row-start-1 row-end-1 col-start-2 col-end-2 -mr-5 lg:-mr-10 text-xl lg:text-3xl transform rotate-90 whitespace-nowrap pointer-events-none"
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
