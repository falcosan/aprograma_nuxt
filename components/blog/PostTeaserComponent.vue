<template>
  <li
    v-if="postContent"
    class="post-teaser relative z-10 "
  >
    <NuxtLink key="postContent._uid" :to="postLink" class="teaser-link">
      <div
        :class="`teaser-content h-full grid grid-flow-row ${$parent.blok.row_container ? '' : 'lg:grid-flow-col auto-rows-fr lg:auto-cols-fr lg:h-64'}`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <component
          :is="lookFile()"
          class="teaser-file h-full w-full object-cover object-center select-none"
          :alt="postContent.file.alt"
          :src="postContent.file.filename"
        />
        <div class="teaser-text w-full h-full flex flex-col justify-between p-5 md:p-10" :style="`background-color: ${postContent.teaser_background_color.color}; color: ${postContent.teaser_text_color.color};`">
          <div class="text-description">
            <span
              class="teaser-title mb-2 text-xl font-semibold overflow-hidden"
              :style="`-webkit-line-clamp: ${$parent.blok.row_container ? '1' : '2'};`"
            >
              {{ postContent.title }}
            </span>
            <span
              class="teaser-intro overflow-hidden"
              :style="`-webkit-line-clamp: ${$parent.blok.row_container ? '2' : '3'};`"
            >
              {{ postContent.intro }}
            </span>
          </div>
          <span
            v-if="$route.name === 'blog'"
            class="text-date w-full text-right text-sm font-semibold"
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
}
.teaser-intro{
   display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
