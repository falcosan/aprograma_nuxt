<template>
  <main :class="`main overflow-x-hidden ${!$device.isDesktop ? 'pt-10' : 'pt-10 md:py-20'}`">
    <div :class="`main-wrapper min-h-screen relative overflow-hidden ${$store.state.data.error ? 'main-error' : 'main-regular'}`">
      <div
        v-if="blok.show_background_mask"
        :class="`main-background absolute max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl inset-0 my-0 mx-auto overflow-hidden rounded-b transition-colors duration-500 ${!$device.isDesktop ? '' : 'md:rounded-t'} ${blok.color_animation ? 'colorAnimation' : ''}`"
        :style="`background-color: ${randomBackgroundColorMask ? blok.transparency ? `${randomBackgroundColorMask}b3` : randomBackgroundColorMask : blok.transparency ? '#ffffffb3' : '#ffffff'};`"
      />
      <div
        v-if="!blok.background_media.filename"
        :class="`main-flat fixed min-h-full min-w-full inset-0 -z-10 transition-colors duration-500 ${blok.color_animation ? 'colorAnimation' : ''}`"
        :style="`background-color: ${randomBackgroundColor};`"
      />
      <Nuxt :class="`relative max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl my-0 mx-auto rounded-b ${!$device.isDesktop ? '' : 'md:rounded-t'}`" />
    </div>
    <NuxtImg
      v-if="blok.background_media.filename && lookFile === 'image'"
      :modifiers="{ filters: { focal: blok.background_media.focus ? blok.background_media.focus: 0 } }"
      :class="`media-image min-h-full min-w-full fixed right-0 bottom-0 -z-10 object-cover object-center ${blok.color_animation ? 'colorAnimation' : ''}`"
      :src="blok.background_media.filename"
      :alt="blok.background_media.alt"
      width="auto"
      height="auto"
      :type="`image/${imageType()}`"
    />
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
      index: {
        background: 0,
        mask: 0
      }
    }
  },
  computed: {
    lookFile () {
      return this.blok.background_media.filename ? (/(gif|jpe?g|tiff?|svg|png|webp|bmp)/gi).test(this.blok.background_media.filename.toLowerCase().split('.').pop()) ? 'image' : 'video' : ''
    },
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
      if (this.blok.background_color.color) { this.$store.commit('data/themeColorMutation', this.randomBackgroundColor) }
    }
  },
  created () {
    if (this.blok.background_color.color || this.blok.background_color_mask.color) {
      this.setBackgroundColor()
    }
    if (this.blok.background_color.color) { this.$store.commit('data/themeColorMutation', this.randomBackgroundColor) }
  },
  methods: {
    setBackgroundColor () {
      this.index.background = ~~(Math.random() * (this.blok.background_color.color.split('; ').length - 0)) + 0
      this.index.mask = ~~(Math.random() * (this.blok.background_color_mask.color.split('; ').length - 0)) + 0
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
  height: calc(100vh - 5rem);
}
@media screen and (min-width:768px){
  .main-error{
    height: calc(100vh - 10rem);
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
