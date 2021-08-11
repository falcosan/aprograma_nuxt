<template>
  <span
    :class="`icon-container grid gap-5 justify-center ${blok && !blok.remove_space ? 'p-10' : ''} ${blok && blok.tag === 'button' || tag === 'button' ? 'cursor-pointer' : ''} ${sliderMode || carouselMode || carouselMode ? 'h-full content-center' : 'content-around'}`"
    @click="animateMenu ? open = !open : ''"
  >
    <component
      :is="blok ? blok.tag ? blok.tag : 'button' : tag ? tag : 'button'"
      :style="`width: ${blok && blok.size ? `${blok.size}px`: 'auto'}; height: ${blok && blok.size ? `${blok.size}px`: 'auto'}`"
      :title="blok && blok.title && !blok.show_title || tooltip ? blok ? blok.title : tooltip : ''"
      :name="blok && blok.tag === 'button' || tag === 'button' ? `icon-button` : ''"
      :aria-label="blok && blok.tag === 'button' || tag === 'button' ? `icon-button-reader` : ''"
      :class="`icon-wrapper my-0 mx-auto select-none pointer-events-none ${blok && blok.shadow ? 'filter drop-shadow-md' : ''}`"
    >
      <nuxt-img
        v-if="blok && blok.icon_image.filename"
        :class="`icon ${blok.icon_image.filename
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-icon my-0 mx-auto fill-current object-contain object-center ${size ? size : 'w-full h-full'}`"
        :src="blok.icon_image.filename"
        width="auto"
        height="auto"
        alt=""
        :name="blok.name"
        :type="`image/${lookFile()}`"
      />

      <!-- HOME-->
      <svg
        v-else-if="home"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        :class="`home-icon h-auto my-0 mx-auto fill-current ${size}`"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ><path d="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z" /></svg>

      <!-- BACK-->
      <svg
        v-else-if="arrow"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        :class="`arrow-icon h-auto my-0 mx-auto fill-current ${size}`"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" /></svg>

      <!--CLOSE-->
      <svg
        v-else-if="close"
        :class="`close-icon h-auto my-0 mx-auto fill-current ${size}`"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" /></svg>

      <!--NEXT-->
      <svg
        v-else-if="next"
        :class="`next-icon h-auto my-0 mx-auto fill-current ${size}`"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" /></svg>

      <!--PREVIOUS-->
      <svg
        v-else-if="previous"
        :class="`previous-icon h-auto my-0 mx-auto fill-current ${size}`"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" /></svg>

      <!--RESTART-->
      <svg
        v-else-if="restart"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        :class="`restart-icon h-auto my-0 mx-auto fill-current ${size}`"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ><path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" /></svg>

      <!-- MENU -->
      <div v-else-if="animateMenu" :class="`animate-menu my-0 mx-auto ${open ? 'open' : ''} ${size}`">
        <span class="absolute h-px w-full block left-0 transform rotate-0 rounded bg-black" />
        <span class="absolute h-px w-full block left-0 transform rotate-0 rounded bg-black" />
        <span class="absolute h-px w-full block left-0 transform rotate-0 rounded bg-black" />
        <span class="absolute h-px w-full block left-0 transform rotate-0 rounded bg-black" />
      </div>
      <svg
        v-else-if="menu"
        :class="`menu-icon ${size}`"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ><path d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z" fill="#1040e2" /><path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" /></svg>

      <!--EYE-->
      <svg
        v-else-if="eye"
        :class="`eye-icon h-auto my-0 mx-auto fill-current ${size}`"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ><path d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z" /></svg>
      <!--LOADER-->
      <svg
        v-else-if="loader"
        :class="`loader-icon h-auto my-0 mx-auto fill-current ${size}`"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 0 0"
        xml:space="preserve"
      >
        <circle
          fill="none"
          stroke="#c1c1c1"
          stroke-width="4"
          cx="50"
          cy="50"
          r="44"
          class="opacity-40"
        />
        <circle
          fill="#fff"
          stroke="#ccc"
          stroke-width="2"
          cx="8"
          cy="54"
          r="6"
        >
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 48"
            to="360 50 52"
            repeatCount="indefinite"
          />

        </circle>
      </svg>
    </component>
    <span
      v-if="blok && blok.title && blok.show_title || title"
      class="icon-title text-center font-extralight"
      :style="blok && blok.title && blok.show_title && blok.text_color.color ? `color: ${blok.text_color.color};` : false"
    >{{ blok ? blok.title : title }}</span>
  </span>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    tag: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    home: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: false
    },
    next: {
      type: Boolean,
      default: false
    },
    previous: {
      type: Boolean,
      default: false
    },
    restart: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Boolean,
      default: false
    },
    animateMenu: {
      type: Boolean,
      default: false
    },
    eye: {
      type: Boolean,
      default: false
    },
    loader: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
      type: Boolean,
      default: false
    },
    containerMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: false
    }
  },
  methods: {
    lookFile () {
      if (this.blok) {
        switch (this.blok.icon_image.filename.toLowerCase().split('.').pop()) {
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
.animate-menu{
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
}

.animate-menu span{
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

.animate-menu span:nth-child(1) {
  top: 6px;
}

.animate-menu span:nth-child(2),.animate-menu span:nth-child(3) {
  top: 12px;
}

.animate-menu span:nth-child(4) {
  top: 18px;
}

.animate-menu.open span:nth-child(1) {
  top: 18px;
  width: 0%;
  left: 50%;
}

.animate-menu.open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}

.animate-menu.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.animate-menu.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

</style>
