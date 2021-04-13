<template>
  <div class="post relative my-0 mx-auto grid grid-rows-post grid-cols-1 transform -translate-y-6">
    <Icon
      back
      class="post-back absolute self-center left-full transform translate-x-full"
      tag="button"
      size="w-8"
      color="black"
      @click.native="backTo"
    />
    <div class=" post-head h-full row-start-1 row-end-1 col-start-1 col-end-1">
      <component
        :is="lookFile()"
        class="post-file w-full h-full row-start-1 row-end-3 object-cover"
        :alt="`${blok.file.alt} project`"
        :src="blok.file.filename"
      />
    </div>
    <div class="post-body bg-red-400 grid gap-y-5 text-center p-5">
      <h1
        class="post-title row-start-2 row-end-2 col-start-1 col-end-1"
        v-text="blok.title"
      />
      <h3
        class="post-intro row-start-3 row-end-3 col-start-1 col-end-1"
        v-text="blok.intro"
      />
      <p
        class="post-description row-start-4 row-end-4 col-start-1 col-end-1"
        v-html="getDescription"
      />
      <h4
        class="post-date row-start-5 row-end-5 col-start-1 col-end-1 w-max whitespace-nowrap"
        v-text="changeDate(blok.date)"
      />
      <h5
        class="post-date row-start-5 row-end-5 col-start-1 col-end-1 justify-self-end italic"
        v-text="blok.author"
      />
    </div>
  </div>
</template>
<script>
import marked from 'marked'
import DOMPurify from 'dompurify'
export default {
  directives: {
    'click-outside': {
      bind (el, binding) {
        const handler = (e) => {
          if (binding.modifiers.bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.outsideClick = handler
        document.addEventListener('click', handler)
      },

      unbind (el) {
        document.removeEventListener('click', el.outsideClick)
        el.outsideClick = null
      }
    }
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    getDescription () {
      return DOMPurify.sanitize(marked(this.blok.long_text))
    }
  },
  methods: {
    backTo () {
      this.$router.push(`/${this.$route.name.split('-')[0]}`)
    },
    changeDate (date) {
      const currentDateTime = new Date(date.replace(' ', 'T'))
      const formattedDate = `${currentDateTime.getDate()} / ${
        currentDateTime.getMonth() + 1
      } / ${currentDateTime.getFullYear()}`
      return formattedDate.toString()
    },
    lookFile () {
      switch (this.blok.file.filename.toLowerCase().split('.').pop()) {
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
