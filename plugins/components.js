import Vue from 'vue'
import Icon from '@/components/global/IconComponent'
import Logo from '@/components/global/LogoComponent'
import Page from '@/components/global/PageComponent'
import Form from '@/components/global/FormComponent'
import Field from '@/components/global/FieldComponent'
import Slider from '@/components/global/SliderComponent'
import PostsList from '@/components/blog/PostsListComponent'
import TextContent from '@/components/global/TextContentComponent'
import ProjectsList from '@/components/portfolio/ProjectsListComponent'

// GLOBAL
Vue.component('Logo', Logo)
Vue.component('Page', Page)
Vue.component('Form', Form)
Vue.component('Icon', Icon)
Vue.component('Field', Field)
Vue.component('Slider', Slider)
Vue.component('TextContent', TextContent)

// PORTFOLIO
Vue.component('ProjectsList', ProjectsList)

// BLOG
Vue.component('PostsList', PostsList)
