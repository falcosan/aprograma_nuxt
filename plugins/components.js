import Vue from 'vue'
import Logo from '@/components/global/LogoComponent'
import Form from '@/components/global/FormComponent'
import Page from '@/components/global/PageComponent.vue'
import Slider from '@/components/global/SliderComponent'
import IconLink from '@/components/global/IconLinkComponent'
import PostsList from '@/components/blog/PostsListComponent'
import InputForm from '@/components/global/InputFormComponent'
import TextContent from '@/components/global/TextContentComponent'
import ProjectsList from '@/components/portfolio/ProjectsListComponent'

// GLOBAL
Vue.component('Logo', Logo)
Vue.component('Form', Form)
Vue.component('Page', Page)
Vue.component('Slider', Slider)
Vue.component('IconLink', IconLink)
Vue.component('InputForm', InputForm)
Vue.component('TextContent', TextContent)

// PORTFOLIO
Vue.component('ProjectsList', ProjectsList)

// BLOG
Vue.component('PostsList', PostsList)
