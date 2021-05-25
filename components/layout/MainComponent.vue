<template>
  <main class="main overflow-x-hidden">
    <Nuxt v-if="blok.view" />
    <div v-if="blok.background_media.filename" class="background-media fixed inset-0 -z-10">
      <img
        v-if="lookFile === 'image'"
        :src="blok.background_media.filename"
        :alt="blok.background_media.alt"
        class="media-image fixed w-full h-full inset-0 -z-10 object-cover object-center"
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
    <div v-else class="fixed inset-0 -z-10">
      <div v-if=" $store.state.data.windowWidth < 768" class="background-main w-full h-full max-w-xl md:max-w-none md:w-9/12 2xl:max-w-7xl my-0 mx-auto border-r border-l shadow-xl" :style="`border-color: ${blok.background_color.color};`" />
      <div class="background-color relative h-full w-full" :style="`background-color: ${blok.background_color.color};`" />
    </div>
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
