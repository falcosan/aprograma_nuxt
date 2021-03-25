import Vue from 'vue'
import Logo from '@/components/global/LogoComponent'
import IconLink from '@/components/global/IconLinkComponent'
import Page from '~/components/global/PageComponent.vue'

import AboutDescription from '@/components/about/AboutDescriptionComponent'

import PostsList from '@/components/blog/PostsListComponent'

//GLOBAL
Vue.component('Logo', Logo)
Vue.component('IconLink', IconLink)
Vue.component('Page', Page)

//ABOUT
Vue.component('AboutDescription', AboutDescription)


//BLOG
Vue.component('PostsList', PostsList)

