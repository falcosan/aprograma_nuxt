<template>
  <transition-group
    tag="div"
    appear
    enter-active-class="transition-opacity duration-200 out-in"
    enter-class="opacity-0"
    :class="`logo-container ${styleLogoContainer}`"
  >
    >
    <svg
      id="logo"
      key="logo"
      class="logo-svg w-full h-auto"
      version="1.1"
      baseProfile="basic"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="680.2879px"
      height="680.2879px"
      viewBox="0 0 680.2879 680.2879"
      xml:space="preserve"
      @mouseenter="playOn()"
      @mouseout="playOff()"
    >
      <g id="a" :class="moved.a">
        <path
          fill="#999999"
          d="M240.5651,156.3804c-83.65,0-151.46,69.77-151.46,153.42c7.93,200.81,294.93,200.96,302.93,0
		C392.0351,226.1504,324.2151,156.3804,240.5651,156.3804z M268.4908,346.4025c-9.6113,9.6113-23.8872,15.5234-37.4767,15.5234
		c-14.3604,0-27.1071-6.0043-37.4766-15.5234c-10.4069-9.5533-14.9094-23.7696-15.5234-37.4766
		c-0.5913-13.2023,6.3309-28.2842,15.5234-37.4767c9.6112-9.6113,23.8871-15.5233,37.4766-15.5233
		c14.3604,0,27.1071,6.0043,37.4767,15.5233c10.4069,9.5533,14.9094,23.7696,15.5233,37.4767
		C284.6054,322.1282,277.6832,337.2101,268.4908,346.4025z"
        />
        <path
          id="a-center"
          display="none"
          fill="#FFFFFF"
          d="M347.1085,308.7604c0,29.68-24.06,53.75-53.75,53.75
		c-71.29-2.83-71.27-104.67,0-107.49C323.0485,255.0104,347.1085,279.0704,347.1085,308.7604z"
        />
        <path
          id="a-line"
          fill="#999999"
          d="M344.9809,449.8557h-8.3663c-26.463,0-47.9154-21.4525-47.9154-47.9155V189.743
		c0-26.463,21.4525-47.9155,47.9154-47.9155h8.3663c26.463,0,47.9154,21.4525,47.9154,47.9155v212.1973
		C392.8963,428.4033,371.4438,449.8557,344.9809,449.8557z"
        />
      </g>
      <g id="p" :class="moved.p">
        <path
          d="M591.1785,305.3604c-1.74-92.04-73.03-151.92-149.27-151.91c-25.41,0-51.38,6.65-75.5,20.98
          c-29.91,16.88-66.75,59.3-73.21,110.97c-0.93,7-1.22,13.5-1.22,19.95c0,106.41,1.15,188.93,1.84,229.28
          c0.05,2.7,0.96,3.83,2.32,3.83c1.46,0,3.43-1.3,5.42-3.37c84.64-88.55,212.92-45.87,270.31-151.0899
          C590.7085,349.4604,591.2485,313.3404,591.1785,305.3604z M482.6597,346.4025c-9.6112,9.6113-23.8871,15.5234-37.4766,15.5234
          c-14.3604,0-27.1071-6.0043-37.4767-15.5234c-10.4069-9.5533-14.9094-23.7696-15.5233-37.4766
          c-0.5914-13.2023,6.3309-28.2842,15.5233-37.4767c9.6113-9.6113,23.8872-15.5233,37.4767-15.5233
          c14.3604,0,27.1071,6.0043,37.4766,15.5233c10.4069,9.5533,14.9094,23.7696,15.5234,37.4767
          C498.7744,322.1282,491.8522,337.2101,482.6597,346.4025z"
        />
        <path
          id="p-center"
          display="none"
          fill="#FFFFFF"
          d="M498.768,308.7604c0,29.68-24.06,53.75-53.75,53.75
          c-71.29-2.83-71.27-104.67,0-107.49C474.708,255.0104,498.768,279.0704,498.768,308.7604z"
        />
      </g>
    </svg>
  </transition-group>
</template>

<script>
export default {
  props: {
    styleLogoContainer: String,
    styleLogo: String
  },
  data () {
    return {
      moved: {
        a: 'transition-logo',
        p: 'transition-logo'
      }
    }
  },
  methods: {
    playOn () {
      this.moved.a = 'origin-center-left transform translate rotate-360 transition duration-700 ease-out'
      this.moved.p = 'origin-center transform translate rotate-360 transition duration-700 ease-out'
    },
    playOff () {
      document.getElementById('a').ontransitionend = () => {
        this.moved.p = 'transition-logo'
        this.moved.a = 'transition-logo'
      }
    }
  }
}
</script>
