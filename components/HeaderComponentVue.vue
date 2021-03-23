<template>
  <header class="header top-0 z-10 fixed h-20 w-auto justify-between mt-0">
    <nav class="navbar">
      <ul class="menu_wrapper">
        <li>
          <nuxt-link class="text-teal-600 hover:underline" to="/">
            Home
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="text-teal-600 hover:underline" to="/en/blog">
            Blog
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="flex-1">
      <a href="/" class="block w-56 mx-auto">
        <img
          src="http://a.storyblok.com/f/42016/1096x313/0353bf6654/logo2.png"
        />
      </a>
    </div>
    <nav>
      <ul>
        <li>
          <nuxt-link class="text-teal-600 hover:underline" to="/en/blog">
            English
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="text-teal-600 hover:underline" to="/de/blog">
            German
          </nuxt-link>
        </li>
        <!-- <template
            v-for="(link, index) in contentByName('ItemNavbarComponentVue')"
          >
            <ItemNavbarComponentVue
              :key="link._uid"
              :content="contentByName('ItemNavbarComponentVue')[index]"
            />
          </template> -->
      </ul>
    </nav>
  </header>
</template>

<script>
import ItemNavbarComponentVue from './ItemNavbarComponentVue'
import setContentByName from '@/plugins/setContentByName'
export default {
  components: { ItemNavbarComponentVue },
  mixins: [setContentByName],
  // props: {
  //   content: {
  //     type: Object,
  //     required: true,
  //   },
  // },
}
</script>

