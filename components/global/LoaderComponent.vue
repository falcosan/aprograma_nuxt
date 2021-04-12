<template>
  <transition-group tag="div" appear-active-class="transition-opacity duration-200 out-in" appear-class="opacity-0">
    <svg
      key="loader"
      :class="size"
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
        stroke="#fff"
        stroke-width="4"
        cx="50"
        cy="50"
        r="44"
        class="opacity-30"
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
