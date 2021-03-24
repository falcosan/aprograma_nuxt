import Vue from 'vue'
import Logo from '@/components/global/LogoComponent'
import IconLink from '@/components/global/IconLinkComponent'
import Page from '~/components/global/PageComponent.vue'
import Post from '@/components/blog/PostComponent'
import PostsList from '@/components/blog/PostsListComponent'

Vue.component('Logo', Logo)
Vue.component('IconLink', IconLink)
Vue.component('Page', Page)
Vue.component('Post', Post)
Vue.component('PostsList', PostsList)