<template>
  <transition-group tag="div" appear appear-active-class="transition-opacity duration-200 out-in" appear-class="opacity-0" class="loader-container">
    <svg
      key="loader"
      :class="`loader-svg ${size}`"
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
  </transition-group>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: ''
    }
  }
}
</script>
