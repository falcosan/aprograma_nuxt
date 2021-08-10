<template>
  <main :class="`main pt-10 overflow-x-hidden ${!$device.isDesktop ? '' : 'md:py-16'} ${blok.background_media.filename ? 'mb-10' : 'bg-white'}`">
    <div :class="`main-wrapper relative min-h-screen overflow-hidden ${$store.state.data.error ? 'main-error' : 'main-regular'}`">
      <div
        v-if="blok.show_background_mask || blok.background_media.filename"
        :class="`main-background absolute max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl inset-0 my-0 mx-auto overflow-hidden rounded-b transition-colors duration-500 backdrop-filter backdrop-blur ${!$device.isDesktop ? '' : 'md:rounded-t'}`"
        :style="`background-color: ${blok.background_media.filename ? 'transparent' : randomBackgroundColor};`"
      >
        <div :class="`main-mask h-full w-full bg-white ${blok.background_media.filename ? 'bg-opacity-60' : blok.show_background_mask ? 'bg-opacity-65' : ''}`" />
      </div>
      <transition enter-active-class="duration-300 in-out" enter-class="opacity-0" mode="out-in">
        <Nuxt :class="`relative max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl my-0 mx-auto rounded-b ${!$device.isDesktop ? '' : 'md:rounded-t'}`" />
      </transition>
    </div>
    <img
      v-if="blok.background_media.filename && lookFile === 'image'"
      :class="`media-image min-h-full min-w-full fixed right-0 bottom-0 -z-10 object-cover object-center ${blok.color_animation ? 'colorAnimation' : ''}`"
      :src="blok.background_media.filename"
      :alt="blok.background_media.alt"
      width="100%"
      height="100%"
      :type="`image/${imageType()}`"
    >
    <video
      v-else-if="blok.background_media.filename"
      :class="`media-video min-h-full min-w-full fixed right-0 bottom-0 -z-10 object-cover object-center ${blok.color_animation ? 'colorAnimation' : ''}`"
      playsinline
      autoplay
      muted
      loop
    >
      <source :src="blok.background_media.filename" :type="`video/${blok.background_media.filename.toLowerCase().split('.').pop()}`">
    </video>
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
      return this.blok.background_media.filename ? (/(gif|jpe?g|tiff?|png|webp|bmp)/gi).test(this.blok.background_media.filename.toLowerCase().split('.').pop()) ? 'image' : 'video' : ''
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
<style scoped>

.main-error{
  min-height: unset;
  height: calc(100vh - 4.5rem);
}
@media screen and (min-width:768px){
  .main-error{
    min-height: unset;
    height: calc(100vh - 9rem);
  }
}
.colorAnimation{
    -webkit-animation: changeColor 10s infinite;
    -moz-animation:    changeColor 10s infinite;
    -o-animation:      changeColor 10s infinite;
    animation:         changeColor 10s infinite;
}

@-webkit-keyframes changeColor {
  0%   {
    -webkit-filter: hue-rotate(0deg);
    -moz-filter: hue-rotate(0deg);
    -o-filter: hue-rotate(0deg);
    filter: hue-rotate(0deg);
  }

  100% {
    -webkit-filter: hue-rotate(360deg);
    -moz-filter: hue-rotate(360deg);
    -o-filter: hue-rotate(360deg);
    filter: hue-rotate(360deg);
  }
}

@-moz-keyframes changeColor {
  0%   {
    -webkit-filter: hue-rotate(0deg);
    -moz-filter: hue-rotate(0deg);
    -o-filter: hue-rotate(0deg);
    filter: hue-rotate(0deg);
  }

  100% {
    -webkit-filter: hue-rotate(360deg);
    -moz-filter: hue-rotate(360deg);
    -o-filter: hue-rotate(360deg);
    filter: hue-rotate(360deg);
  }
}

@-o-keyframes changeColor {
  0%   {
    -webkit-filter: hue-rotate(0deg);
    -moz-filter: hue-rotate(0deg);
    -o-filter: hue-rotate(0deg);
    filter: hue-rotate(0deg);
  }

  100% {
    -webkit-filter: hue-rotate(360deg);
    -moz-filter: hue-rotate(360deg);
    -o-filter: hue-rotate(360deg);
    filter: hue-rotate(360deg);
  }
}

@keyframes changeColor {
  0%   {
    -webkit-filter: hue-rotate(0deg);
    -moz-filter: hue-rotate(0deg);
    -o-filter: hue-rotate(0deg);
    filter: hue-rotate(0deg);
  }

  100% {
    -webkit-filter: hue-rotate(360deg);
    -moz-filter: hue-rotate(360deg);
    -o-filter: hue-rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
</style>
