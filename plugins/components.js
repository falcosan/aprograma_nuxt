import Vue from 'vue'
import Logo from '@/components/global/LogoComponent'
import Field from '@/components/global/FieldComponent'
import Page from '@/components/global/PageComponent.vue'
import Slider from '@/components/global/SliderComponent'
import IconLink from '@/components/global/IconLinkComponent'
import PostsList from '@/components/blog/PostsListComponent'
import TextContent from '@/components/global/TextContentComponent'
import Form from '@/components/global/FormComponent'
import ProjectsList from '@/components/portfolio/ProjectsListComponent'

// GLOBAL
Vue.component('Logo', Logo)
Vue.component('Page', Page)
Vue.component('Form', Form)
Vue.component('Field', Field)
Vue.component('Slider', Slider)
Vue.component('IconLink', IconLink)
Vue.component('TextContent', TextContent)

// PORTFOLIO
Vue.component('ProjectsList', ProjectsList)

// BLOG
Vue.component('PostsList', PostsList)
