<template>
  <component
    :is="blok ? blok.tag : tag"
    :key="blok ? blok._uid : false"
    :title="blok ? blok.tooltip : false"
    :href="blok ? blok.path : tag === 'a' ? to : false"
    :class="`icon-container ${!loader ? size : ''} focus:outline-none cursor-pointer`"
    :target="blok && blok.tag === 'a' || tag === 'a' ? '_blank' : false"
    :rel="blok && blok.tag === 'a' || tag === 'a' ? 'noopener' : false"
  >
    <img
      v-if="blok"
      :class="`icon ${blok.icon.filename
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, '')}-icon`"
      :src="blok.icon.filename"
      type="image/svg+xml"
    >

    <!-- BACK-->
    <svg
      v-else-if="back"
      width="24"
      height="24"
      :class="`back-icon fill-current text-${color}`"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" /></svg>

    <!--CLOSE-->
    <svg
      v-else-if="close"
      :class="`close-icon fill-current text-${color}`"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" /></svg>

    <!--NEXT-->
    <svg
      v-else-if="next"
      :class="`next-icon fill-current text-${color}`"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" /></svg>

    <!--PREVIOUS-->
    <svg
      v-else-if="previous"
      :class="`previous-icon fill-current text-${color}`"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" /></svg>

    <!--LOADER-->
    <svg
      v-else-if="loader"
      key="loader"
      :class="`loader-icon ${size}`"
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
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: false,
      default: undefined
    },
    to: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      required: true
    },
    back: {
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
    loader: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  }
}
</script>
