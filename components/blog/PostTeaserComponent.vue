<template>
  <li
    v-if="postContent"
    class="post-teaser relative z-10"
  >
    <NuxtLink key="postContent._uid" :to="postLink" class="teaser-link">
      <div
        :class="`teaser-content grid grid-flow-row-dense lg:auto-rows-fr ${$parent.blok.row_container ? 'max-w-2xl lg:max-h-md my-0 mx-auto' : 'lg:h-64 lg:auto-cols-fr lg:grid-flow-col-dense'}`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <component
          :is="lookFile()"
          :class="`teaser-file w-full h-full object-cover select-none ${$parent.blok.row_container ? 'row-start-1 row-end-3' : ''}`"
          :alt="postContent.file.alt"
          :src="postContent.file.filename"
        />
        <div :class="`teaser-text w-full h-full grid gap-3 ${$parent.blok.row_container ? 'row-start-3 row-end-3 p-8 content-center' : 'p-5 lg:p-10 content-between'}`" :style="`background-color: ${postContent.teaser_background_color.color}; color: ${postContent.teaser_text_color.color};`">
          <div class="text-description">
            <span
              :class="`teaser-title mb-2 ${$route.name === 'blog' ? 'text-2xl font-medium' :'text-xl font-semibold'} overflow-hidden`"
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
            class="text-date self-center text-right text-sm font-semibold"
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
