<template>
  <main class="main overflow-x-hidden">
    <div :class="`main-wrapper relative overflow-hidden ${!$device.isDesktop ? 'pt-10' : 'pt-10 md:py-20'}`">
      <div
        v-if="blok.show_background_mask"
        :class="`main-background absolute max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl inset-0 my-0 mx-auto overflow-hidden rounded-b transition-colors duration-500 ${!$device.isDesktop ? '' : 'md:rounded-t'} ${blok.color_animation ? 'colorAnimation' : ''}`"
        :style="`background-color: ${randomBackgroundColorMask ? blok.transparency ? `${randomBackgroundColorMask}b3` : randomBackgroundColorMask : blok.transparency ? '#ffffffb3' : '#ffffff'};`"
      />
      <div
        v-if="!blok.background_media.filename"
        :class="`main-flat fixed w-full h-full inset-0 -z-10 transition-colors duration-500 ${blok.color_animation ? 'colorAnimation' : ''}`"
        :style="`background-color: ${randomBackgroundColor};`"
      />
      <Nuxt :class="`relative max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl my-0 mx-auto rounded-b ${!$device.isDesktop ? '' : 'md:rounded-t'}`" />
    </div>
    <transition appear appear-active-class="duration-300" appear-class="opacity-0">
      <ImageSet
        v-if="$imageValidation(blok.background_media.filename)"
        :class="`media-image w-full h-full fixed right-0 bottom-0 -z-10 object-cover object-top ${blok.color_animation ? 'colorAnimation' : ''}`"
        :src="blok.background_media.filename"
        :file="blok.background_media"
        :alt="blok.background_media.alt"
        :lazy="false"
        width="2560"
        height="1440"
        fit="in"
        sizes="xs:514px sm:711px md:804px lg:1680px xl:1920px 2xl:2560px"
      />
      <video
        v-else-if="blok.background_media.filename"
        :class="`media-video w-full h-full fixed right-0 bottom-0 -z-10 object-cover object-top ${blok.color_animation ? 'colorAnimation' : ''}`"
        playsinline
        autoplay
        muted
        loop
      >
        <source :src="blok.background_media.filename" :type="`video/${blok.background_media.filename.toLowerCase().split('.').pop()}`">
      </video>
    </transition>
  </main>
</template>

<script>
import ImageSet from '../global/ImageSetComponent.vue'
export default {
  components: { ImageSet },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      index: {
        background: 0,
        mask: 0
      }
    }
  },
  computed: {
    randomBackgroundColor () {
      return this.blok.background_color.color.split('; ')[this.index.background]
    },
    randomBackgroundColorMask () {
      return this.blok.background_color_mask.color.split('; ')[this.index.mask]
    }
  },
  watch: {
    $route () {
      if (this.blok.background_color.color || this.blok.background_color_mask.color) {
        this.setBackgroundColor()
      }
    }
  },
  async created () {
    if (this.blok.background_color.color || this.blok.background_color_mask.color) {
      await this.setBackgroundColor()
    }
  },
  methods: {
    setBackgroundColor () {
      this.index.background = ~~(Math.random() * (this.blok.background_color.color.split('; ').length - 0)) + 0
      this.index.mask = ~~(Math.random() * (this.blok.background_color_mask.color.split('; ').length - 0)) + 0
    },
    imageType () {
      if (this.$imageValidation(this.blok.background_media.filename)) {
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
<style scoped>
.main-wrapper{
  min-height: calc(100vh - 10rem);
}
.colorAnimation{
    animation: changeColor 10s infinite;
}
@keyframes changeColor {
  0%   {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
