<template>
  <header
    v-if="$store.state.data.windowWidth >= 768 && $device.isDesktop"
    class="header fixed w-full top-0 z-40"
  >
    <nav class="navbar">
      <div class="menu-wrapper h-0 grid grid-flow-col-dense justify-between">
        <div class="logo-home relative w-20 h-20 z-20">
          <Link icon-item class="home-link flex items-center justify-center transition-shadow duration-300 rounded-br bg-white" to="/" :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)">
            <template #icon>
              <Logo
                transition
                size="w-16"
              />
            </template>
          </Link>
        </div>
        <transition enter-active-class="duration-300" leave-active-class="duration-300" enter-class="-translate-y-full" leave-to-class="-translate-y-full">
          <div v-if="expanded" :class="`menu-expanded h-10 max-w-sm xs:max-w-md sm:max-w-lg md:max-w-md lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl w-full grid grid-flow-col overflow-hidden transform opacity-80 hover:opacity-100 transition-all ${topPosition ? 'translate-y-2 rounded' : 'rounded-b'}`">
            <ul class="link-list grid grid-flow-col auto-cols-fr" :style="`background-color: ${blok.background_color.color};`">
              <li v-for="item in $contentByName(blok.body, 'Link')" :key="item._uid" class="link-menu hover:bg-gray-300">
                <Link class="flex items-center justify-center py-2 px-3 text-sm font-light truncate" :blok="item" />
              </li>
            </ul>
            <Translate
              class="translate-header grid h-full text-sm font-light filter grayscale text-white"
              style-translate-list="grid grid-flow-col auto-cols-fr"
              style-translate-item="w-full flex items-center justify-center py-2 px-3 text-center bg-gray-800 hover:bg-gray-600"
              :blok="$contentByName(blok.body, 'Translate')"
            />
          </div>
        </transition>
        <Icon animate-menu tag="button" class="open-menu relative w-20 h-20 z-10 cursor-pointer rounded-bl bg-white" size="w-5 h-5" @click.native="expanded = !expanded" />
      </div>
    </nav>
  </header>
  <header
    v-else
    class="header flex justify-center"
  >
    <nav class="navbar-up w-full h-10 fixed flex justify-center top-0 z-40 shadow-sm" :style="`background-color: ${blok.background_color.color};`">
      <div class="menu-wrapper wrapper-up w-full h-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-md flex justify-between">
        <Link
          active="exact"
          icon-item
          class="home-link w-2/12"
          :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)"
          to="/"
        >
          <template #icon>
            <Icon
              home
              tag="button"
              size="w-5"
              class="home-link h-full w-full"
            />
          </template>
        </Link>
        <Logo
          transition
          class="absolute top-0 right-1/2 p-1 transform translate-x-1/2 rounded-b-full filter drop-shadow-md bg-white"
          size="w-11"
        />
        <Translate
          translate-transition
          class="translate-header w-2/12 bg-gray-800 text-white filter grayscale"
          :style-current-language="`h-full flex items-center justify-center relative z-10 bg-gray-800 text-white ${expanded ? 'filter drop-shadow-md' : ''}`"
          :style-translate-list="`transform transition-transform duration-200 esase-out ${expanded ? 'translate-y-0' : '-translate-y-full'} bg-gray-800`"
          style-translate-item="p-3 text-center"
          :blok="$contentByName(blok.body, 'Translate')"
          @translateListAction.passive="expanded = false"
          @currentLangAction.passive="expanded = !expanded"
          @mouseenter.native="$device.isDesktop ? expandStill() : false "
          @mouseleave.native.passive="$device.isDesktop ? expandOut() : expanded = false"
        />
      </div>
    </nav>
    <nav class="navbar-down fixed w-full h-12 flex items-center justify-center bottom-0 z-40 filter drop-shadow-2xl" :style="`background-color: ${blok.background_color.color};`">
      <ul class="menu-wrapper wrapper-down w-full h-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-md grid grid-cols-4">
        <li
          v-for="item in $contentByName(blok.body, 'Link')"
          :key="item._uid"
          class="link-menu no-underline"
        >
          <Link icon-item icon-style="w-full h-full" :blok="item" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Translate from './TranslateComponent'
export default {
  components: { Translate },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      topPosition: false,
      expanded: false,
      timer: 0
    }
  },
  watch: {
    '$device.isDesktop' () { this.expanded = false },
    '$store.state.data.windowWidth' () { if (this.$store.state.data.windowWidth < 768) { this.expanded = false } },
    expanded () { this.headerPosition() }
  },
  mounted () {
    window.addEventListener('scroll', this.headerPosition)
  },
  methods: {
    headerPosition () {
      if (window.pageYOffset === 0) {
        this.topPosition = true
      } else {
        this.topPosition = false
      }
    },
    expandOut () {
      if (this.expanded) {
        this.timer = setTimeout(() => {
          this.expanded = false
        }, 700)
      }
    },
    expandStill () {
      if (this.expanded) {
        clearTimeout(this.timer)
        this.timer = 0
      }
    }
  }
}

</script>
