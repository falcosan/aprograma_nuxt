<template>
  <li
    v-if="postContent"
    class="post-teaser"
  >
    <NuxtLink key="postContent._uid" :to="postLink" class="teaser-link h-full grid">
      <div
        :class="`teaser-content flex flex-col ${$parent.blok.row_container ? '' : 'lg:flex-row lg:h-60 lg:relative lg:z-10'} row-start-1 row-end-1 col-start-1 col-end-3`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <component
          :is="lookFile()"
          :class="`teaser-file w-full h-full ${$parent.blok.row_container ? '' : 'lg:w-80 xl:max-w-sm'} object-cover select-none`"
          :alt="postContent.file.alt"
          :src="postContent.file.filename"
        />
        <div :class="`teaser-text w-full h-full grid gap-3 p-5 auto-rows-min content-evenly ${$parent.blok.row_container ? '' : 'lg:p-10'}`" :style="`background-color: ${postContent.teaser_background_color.color}; color: ${postContent.teaser_text_color.color};`">
          <div class="text-description">
            <span
              class="teaser-title mb-2 text-xl font-bold overflow-hidden"
            >
              {{ postContent.title }}
            </span>
            <span
              class="teaser-intro text-lg overflow-hidden"
            >
              {{ postContent.intro }}
            </span>
          </div>
          <span
            class="text-date self-center text-right text-base font-semibold"
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
  -webkit-line-clamp: 3;
}
</style>
