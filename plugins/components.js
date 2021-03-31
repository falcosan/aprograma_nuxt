import Vue from 'vue'
import Logo from '@/components/global/LogoComponent'
import Page from '@/components/global/PageComponent.vue'
import Slider from '@/components/global/SliderComponent'
import PostsList from '@/components/blog/PostsListComponent'
import IconLink from '@/components/global/IconLinkComponent'
import TextContent from '@/components/global/TextContentComponent'
import ProjectsList from '@/components/portfolio/ProjectsListComponent'

// GLOBAL
Vue.component('Logo', Logo)
Vue.component('Page', Page)
Vue.component('Slider', Slider)
Vue.component('IconLink', IconLink)
Vue.component('TextContent', TextContent)

// PORTFOLIO
Vue.component('ProjectsList', ProjectsList)

// BLOG
Vue.component('PostsList', PostsList)
