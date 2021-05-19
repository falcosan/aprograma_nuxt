<template>
  <header
    v-if="$store.state.data.windowWidth >= 768 && $device.isDesktop"
    class="header fixed z-40"
  >
    <nav class="navbar">
      <ul class="menu-wrapper">
        <li class="logo-home">
          <NuxtLink class="home-link flex items-center" to="/" :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)">
            <Logo
              :transition-a="moved.a"
              :transition-p="moved.p"
              size="w-24"
              :blok="blok.body[blok.body.component === 'Logo']"
              @click.native="play"
            />
          </NuxtLink>
        </li>
        <li
          v-for="item in $contentByName(blok.body, 'Link')"
          :key="item._uid"
          class="link-menu"
        >
          <Link class="py-2 px-3" :icon-item="false" :blok="item" />
        </li>
      </ul>
    </nav>
    <nav class="language-navbar">
      <Translate
        translate-transition
        class="translate-header"
        style-current-language="p-3 transition-all bg-gray-800 text-white filter grayscale"
        :style-translate-list="`transform transition-transform duration-200 esase-out ${expanded ? 'translate-x-0' : '-translate-x-full'} bg-gray-800 filter grayscale text-white`"
        style-translate-item="w-full p-3"
        :blok="$contentByName(blok.body, 'Translate')"
        @mouseleave.native="expandOut"
        @mouseover.native="expandStill"
        @currentLangAction="expanded = !expanded"
        @translateListAction="expanded = false"
      />
    </nav>
  </header>
  <header
    v-else
    class="header flex justify-center"
  >
    <nav class="navbar-up w-full h-10 fixed flex justify-center top-0 z-40 drop-shadow-2xl" :style="`background-color: ${blok.background_color.color};`">
      <div class="menu-wrapper wrapper-up w-full h-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl flex justify-between">
        <NuxtLink exact-active-class="filter invert grayscale bg-gray-300" class="home-link w-2/12" to="/" :aria-label="$config.projectName.charAt(0).toUpperCase() + $config.projectName.slice(1)">
          <Icon
            home
            tag="button"
            size="w-5"
            class="home-link h-full w-full"
          />
        </NuxtLink>
        <Logo
          class="absolute top-0 right-1/2 p-1 transform translate-x-1/2 rounded-b-full drop-shadow-2xl bg-white"
          size="w-14"
          :transition-a="moved.a"
          :transition-p="moved.p"
          style-logo-container="w-14"
          @click.native="play"
        />

        <Translate
          translate-transition
          class="translate-header w-2/12 bg-gray-800 text-white filter grayscale"
          :style-current-language="`h-full flex items-center justify-center relative z-10 bg-gray-800 text-white ${expanded ? 'drop-shadow-2xl' : ''}`"
          :style-translate-list="`absolute w-full transform transition-transform duration-200 esase-out ${expanded ? 'translate-y-0' : '-translate-y-full'} bg-gray-800`"
          style-translate-item="p-3 text-center"
          :blok="$contentByName(blok.body, 'Translate')"
          @translateListAction.passive="expanded = false"
          @currentLangAction.passive="expanded = !expanded"
          @mouseleave.native.passive="$device.isDesktop ? expandOut() : expanded = false"
        />
      </div>
    </nav>
    <nav class="navbar-down w-full h-12 flex items-center justify-center fixed bottom-0 z-40 drop-shadow-2xl" :style="`background-color: ${blok.background_color.color};`">
      <ul class="menu-wrapper wrapper-down w-full h-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl grid grid-cols-4">
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
      expanded: false,
      timer: 0,
      moved: {
        a: '',
        p: ''
      }
    }
  },
  methods: {
    expandStill () {
      clearTimeout(this.timer)
      this.timer = 0
    },
    expandOut () {
      this.timer = setTimeout(() => {
        this.expanded = false
      }, 700)
    },
    play () {
      this.moved.a = 'transform origin-center-left translate rotate-360 transition duration-700 ease-out'
      this.moved.p = 'transform origin-center translate rotate-360 transition duration-700 ease-out'
      this.$store.commit('data/moveMutation', true)
      document.getElementById('logo').ontransitionend = () => {
        this.moved.p = ''
        this.moved.a = ''
        this.$store.commit('data/moveMutation', false)
      }
    }
  }
}

</script>
