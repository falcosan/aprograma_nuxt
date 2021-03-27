import Vue from 'vue'
import Logo from '@/components/global/LogoComponent'
import IconLink from '@/components/global/IconLinkComponent'
import TextContent from '@/components/global/TextContentComponent'

import PostsList from '@/components/blog/PostsListComponent'
import Page from '~/components/global/PageComponent.vue'

// GLOBAL
Vue.component('Logo', Logo)
Vue.component('Page', Page)
Vue.component('IconLink', IconLink)
Vue.component('TextContent', TextContent)

// BLOG
Vue.component('PostsList', PostsList)
