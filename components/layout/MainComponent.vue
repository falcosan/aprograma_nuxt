<template>
  <transition-group
    tag="main"
    appear
    appear-active-class="page-appear-active"
    appear-class="page-appear"
    name="page"
    class="main w-full"
  >
    <Nuxt v-if="blok.view" key="page" />
    <div v-if="blok.background_media.filename" key="background-media" class="background-media flex fixed -z-10 top-1/2 right-1/2 min-w-full min-h-full w-auto h-auto transform translate-x-1/2 -translate-y-1/2">
      <img
        v-if="lookFile === 'image'"
        :src="blok.background_media.filename"
        :alt="blok.background_media.alt"
        class="media-image object-cover object-center"
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
    <div v-else key="background-color" class="background-color fixed -z-10 top-1/2 right-1/2 min-w-full min-h-full w-auto h-auto transform translate-x-1/2 -translate-y-1/2 scale-105" :style="`background-color: ${blok.background_color.color};`" />
  </transition-group>
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
  }
}
</script>
