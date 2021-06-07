<template>
  <main class="main pb-10 md:pb-32">
    <div class="main-wrapper max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl min-h-screen overflow-hidden mt-10 md:mt-14 mx-auto rounded-b-xl md:rounded-xl shadow-xl bg-opacity-60 bg-white">
      <transition enter-active-class="duration-500 in-out" leave-active-class="duration-0 in-out" leave-to-class="opacity-0" enter-class="opacity-0" mode="out-in">
        <Nuxt v-if="blok.view" />
      </transition>
    </div>
    <div v-if="blok.background_media.filename" class="background-media fixed inset-0 -z-10">
      <img
        v-if="lookFile === 'image'"
        class="media-image fixed inset-0 -z-10 object-cover object-center"
        :src="blok.background_media.filename"
        :alt="blok.background_media.alt"
        width="100%"
        height="100%"
        :type="`image/${imageType()}`"
      >
      <video
        v-else
        class="media-video w-full h-full object-cover object-center"
        playsinline
        autoplay
        muted
        loop
      >
        <source :src="blok.background_media.filename" :type="`video/${blok.background_media.filename.toLowerCase().split('.').pop()}`">
      </video>
    </div>
    <div v-else class="background-main fixed inset-0 -z-10 transition-colors duration-700" :style="`background-color: ${randomBackgroundColor};`" />
  </main>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      index: 0
    }
  },
  computed: {
    lookFile () {
      return this.blok.background_media.filename ? (/(gif|jpe?g|tiff?|png|webp|bmp)/gi).test(this.blok.background_media.filename.toLowerCase().split('.').pop()) ? 'image' : 'video' : false
    },
    randomBackgroundColor () {
      return this.blok.background_color.color.split('; ')[this.index]
    }
  },
  watch: {
    $route () { this.setBackgroundColor() }
  },
  created () {
    this.setBackgroundColor()
  },
  methods: {
    setBackgroundColor () {
      this.index = ~~(Math.random() * (this.blok.background_color.color.split('; ').length - 0)) + 0
      this.$store.commit('data/themeColorMutation', this.randomBackgroundColor)
    },
    imageType () {
      if (this.lookFile === 'image') {
        switch (this.blok.background_media.filename.toLowerCase().split('.').pop()) {
          case 'jpg':
            return 'jpeg'
          case 'png':
            return 'png'
          case 'svg':
            return 'svg+xml'
          case 'gif':
            return 'gif'
        }
      }
    }
  }
}
</script>
