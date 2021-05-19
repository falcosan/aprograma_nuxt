<template>
  <li
    v-if="postContent"
    class="post-teaser relative z-10"
  >
    <NuxtLink key="postContent._uid" :to="postLink" class="teaser-link">
      <div
        :class="`teaser-content h-full grid grid-flow-row-dense ${$parent.blok.row_container ? '' : 'lg:auto-cols-fr lg:grid-flow-col-dense lg:auto-rows-fr lg:h-64'}`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <component
          :is="lookFile()"
          class="teaser-file w-full h-full object-cover select-none"
          :alt="postContent.file.alt"
          :src="postContent.file.filename"
        />
        <div class="teaser-text w-full h-full grid gap-3 p-5 lg:p-10 content-between" :style="`background-color: ${postContent.teaser_background_color.color}; color: ${postContent.teaser_text_color.color};`">
          <div class="text-description">
            <span
              :style="`-webkit-line-clamp: ${$parent.blok.row_container ? '1' : '2'};`"
              class="teaser-title mb-2 text-xl font-bold overflow-hidden"
            >
              {{ postContent.title }}
            </span>
            <span
              :style="`-webkit-line-clamp: ${$parent.blok.row_container ? '2' : '3'};`"
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
}
.teaser-intro{
   display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
