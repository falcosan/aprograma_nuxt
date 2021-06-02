<template>
  <main class="main overflow-x-hidden">
    <div class="max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl my-10 md:my-12 mx-auto rounded-b-xl md:rounded-xl shadow-xl overflow-hidden bg-opacity-60 bg-white">
      <transition enter-active-class="duration-300 in-out" enter-class="opacity-0" mode="out-in">
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
    <div v-else class="background-main fixed inset-0 -z-10" :style="`background-color: ${blok.background_color.color};`" />
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
  computed: {
    lookFile () {
      return (/(gif|jpe?g|tiff?|png|webp|bmp)/gi).test(this.blok.background_media.filename.toLowerCase().split('.').pop()) ? 'image' : 'video'
    }
  },
  methods: {
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
