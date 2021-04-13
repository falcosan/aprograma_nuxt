<template>
  <div v-click-outside="outside" class="project h-full-adapted p-4 grid grid-cols-3 grid-rows-project gap-y-4 gap-x-4 bg-green-600 text-white">
    <h2 class="project-title ml-4 self-center col-start-1 col-end-3 row-start-1 row-end-1">
      {{ blok.title }}
    </h2>
    <Back class="project-back justify-self-center self-center px-2 col-start-3 col-end-3 row-start-1 row-end-1" size="w-8" color="white" @click.native="$router.push(`/${$route.name.split('-')[0]}`)" />
    <div class="image-container flex justify-center overflow-y-hidden col-start-1 col-end-3">
      <img class="project-image w-full object-cover" :src="blok.image.filename" :alt="blok.image.alt">
    </div>
    <span class="project-description col-start-3 col-end-3 row-start-2 row-end-3 flex items-center justify-end text-right text-1xl" v-html="getDescription" />
    <div class="project-date col-start-1 col-end-3 grid grid-cols-3 items-center flex-row">
      <h4 class="date-start text-right">
        {{ changeDate(blok.start_date) }}
      </h4>
      <p class="date-to text-center">
        to
      </p>
      <h4 class="date-end text-left">
        {{ !blok.current_project ? changeDate(blok.end_date) : $languageCase('present', 'presente', 'presente') }}
      </h4>
    </div>
    <a
      class="project-url self-center text-center italic"
      :href="blok.url_project"
      target="_blank"
      rel="noopener"
    >{{ blok.url_project !== "" ? `${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}` : $languageCase('private project', 'proyecto privado', 'progetto privato') }}</a>
  </div>
</template>
<script>
import marked from 'marked'
import DOMPurify from 'dompurify'
import Back from '../global/single/BackComponent'
export default {
  components: { Back },
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
      return DOMPurify.sanitize(marked(this.blok.description))
    }
  },
  methods: {
    outside () {
      this.$router.push(`/${this.$route.name.split('-')[0]}`)
    },
    changeDate (date) {
      const currentDateTime = new Date(date.replace(' ', 'T'))
      const formattedDate = `${currentDateTime.getDate()} / ${
        currentDateTime.getMonth() + 1
      } / ${currentDateTime.getFullYear()}`
      return formattedDate.toString()
    }
  }
}
</script>
