<template>
  <main :class="`main my-10 overflow-x-hidden ${!$device.isDesktop ? '' : 'md:my-14'} ${blok.background_media.filename ? '' : 'bg-white'}`">
    <div :class="`main-wrapper relative ${$store.state.data.error ? 'main-error' : 'main-regular'}`">
      <div :class="`main-background absolute max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl inset-0 overflow-hidden my-0 mx-auto shadow-md rounded-b-md transition-colors duration-500 backdrop-filter backdrop-blur ${!$device.isDesktop ? '' : 'md:rounded-t-md'}`" :style="`background-color: ${blok.background_media.filename ? 'transparent' : randomBackgroundColor};`">
        <div class="main-mask h-full w-full bg-opacity-70 bg-white" />
      </div>
      <transition enter-active-class="duration-500 in-out" enter-class="opacity-0" mode="out-in">
        <Nuxt :class="`relative max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl my-0 mx-auto rounded-b-md ${!$device.isDesktop ? '' : 'md:rounded-t-md'}`" />
      </transition>
    </div>
    <div v-if="blok.background_media.filename" :class="`background-media fixed inset-0 -z-10 ${blok.color_animation ? 'colorAnimation' : ''}`">
      <img
        v-if="lookFile === 'image'"
        class="media-image w-full h-full object-cover object-center"
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
<style scoped>
.main-regular{
    min-height: calc(100vh - 4.5rem);
  }
@media screen and (min-width:768px){
.main-regular{
    min-height: calc(100vh - 3.5rem);
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
