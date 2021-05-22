<template>
  <main class="main overflow-x-hidden">
    <Nuxt v-if="blok.view" />
    <div v-if="blok.background_media.filename" class="background-media flex fixed -z-10 top-1/2 right-1/2 min-w-full min-h-full w-auto h-auto transform translate-x-1/2 -translate-y-1/2">
      <img
        v-if="lookFile === 'image'"
        :src="blok.background_media.filename"
        :alt="blok.background_media.alt"
        class="media-image object-cover object-center"
        :type="`image/${imageType()}`"
      >
      <video
        v-else
        class="media-video w-full h-full absolute object-cover object-center"
        playsinline
        autoplay
        muted
        loop
      >
        <source :src="blok.background_media.filename" :type="`video/${blok.background_media.filename.toLowerCase().split('.').pop()}`">
      </video>
    </div>
    <div v-else class="background-color fixed inset-0 -z-10" :style="`background-color: ${blok.background_color.color};`" />
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
