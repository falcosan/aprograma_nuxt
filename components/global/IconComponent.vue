<template>
  <component
    :is="blok ? blok.tag : tag"
    :key="blok ? blok._uid : false"
    :title="blok ? blok.tooltip : false"
    :href="blok ? blok.path !== '' : tag === 'a' ? to : false"
    :class="`icon-container cursor-pointer`"
    :target="blok && blok.tag === 'a' || tag === 'a' ? '_blank' : false"
    :rel="blok && blok.tag === 'a' || tag === 'a' ? 'noopener noreferrer' : false"
  >
    <img
      v-if="blok"
      :class="`icon ${blok.icon.filename
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, '')}-icon ${size}`"
      :src="blok.icon.filename"
      alt=""
      :name="blok.name"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      type="image/svg+xml"
    >

    <!-- BACK-->
    <svg
      v-else-if="back"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      :class="`back-icon fill-current h-auto ${size}`"
      xmlns="http://www.w3.org/2000/svg"
      :style="`color: ${color};`"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" /></svg>

    <!--CLOSE-->
    <svg
      v-else-if="close"
      :class="`close-icon fill-current h-auto ${size}`"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      :style="`color: ${color};`"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" /></svg>

    <!--NEXT-->
    <svg
      v-else-if="next"
      :class="`next-icon fill-current h-auto ${size}`"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      :style="`color: ${color};`"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" /></svg>

    <!--PREVIOUS-->
    <svg
      v-else-if="previous"
      :class="`previous-icon fill-current h-auto ${size}`"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      :style="`color: ${color};`"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" /></svg>

    <!--RESTART-->
    <svg
      v-else-if="restart"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      :class="`restart-icon fill-current h-auto ${size}`"
      xmlns="http://www.w3.org/2000/svg"
      :style="`color: ${color};`"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ><path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" /></svg>

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
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
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
    restart: {
      type: Boolean,
      default: false
    },
    loader: {
      type: Boolean,
      default: false
    }
  }
}
</script>
