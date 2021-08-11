<template>
  <header
    v-if="$store.state.data.windowWidth >= 768 && $device.isDesktop"
    class="header fixed w-full top-0 z-40"
  >
    <nav class="navbar">
      <div class="menu-wrapper h-0 grid grid-flow-col-dense justify-between">
        <div class="logo-home relative w-20 h-20 z-20">
          <Link
            icon-item
            class="home-link flex items-center justify-center transition-shadow duration-300 rounded-br"
            to="/"
            :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)"
            :style="`background-color: ${backgroundColors};`"
          >
            <template #icon>
              <Logo
                transition
                size="w-16"
              />
            </template>
          </Link>
        </div>
        <transition enter-active-class="duration-300" leave-active-class="duration-300" enter-class="-translate-y-full" leave-to-class="-translate-y-full">
          <div v-if="expanded" :class="`menu-expanded h-10 w-lg grid grid-flow-col gap-5 overflow-hidden transform transition bg-opacity-80 bg-gray-100 ${topPosition ? 'translate-y-3 rounded' : 'rounded-b'}`">
            <ul class="link-list grid grid-flow-col auto-cols-fr">
              <li v-for="item in $contentByName(blok.body, 'Link')" :key="item._uid" :class="`link-menu w-20 hover:shadow-sm hover:bg-opacity-50 hover:bg-white ${topPosition ? 'rounded' : 'rounded-b'}`">
                <Link class="flex items-center justify-center py-2 px-3 text-sm font-extralight truncate" :blok="item" />
              </li>
            </ul>
            <Translate
              class="translate-header grid h-full p-1"
              style-translate-list="grid grid-flow-col auto-cols-fr"
              style-translate-item="w-full flex items-center justify-center py-2 px-3 text-center rounded"
              :blok="$contentByName(blok.body, 'Translate')"
            />
          </div>
        </transition>
        <Icon
          animate-menu
          tag="button"
          class="open-menu relative w-20 h-20 z-10 cursor-pointer rounded-bl"
          size="w-5 h-5"
          :style="`background-color: ${backgroundColors};`"
          @click.native="expanded = !expanded"
        />
      </div>
    </nav>
  </header>
  <header
    v-else
    class="header flex justify-center"
  >
    <nav class="navbar-up w-full h-10 fixed flex justify-center top-0 z-40 shadow-sm" :style="`background-color: ${backgroundColors};`">
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
          class="absolute -top-0.5 right-1/2 p-1 transform translate-x-1/2 rounded-b-full filter drop-shadow-md bg-white"
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
          @mouseenter.native="$device.isDesktop ? expandStill() : '' "
          @mouseleave.native.passive="$device.isDesktop ? expandOut() : expanded = false"
        />
      </div>
    </nav>
    <nav class="navbar-down fixed w-full h-12 flex items-center justify-center bottom-0 z-40 filter drop-shadow-2xl" :style="`background-color: ${backgroundColors};`">
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
  computed: {
    backgroundColors () {
      const colors = this.blok.background_color_menu.color.split('; ')
      if (colors.length > 1) {
        if (this.$store.state.data.windowWidth >= 768 && this.$device.isDesktop) {
          return colors[0]
        } else {
          return colors.length > 1 ? colors[1] : colors[0]
        }
      } else {
        return this.blok.background_color_menu.color
      }
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
