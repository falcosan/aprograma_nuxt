import Vue from 'vue'
import Icon from '@/components/global/IconComponent'
import Logo from '@/components/global/LogoComponent'
import Page from '@/components/global/PageComponent'
import Form from '@/components/global/FormComponent'
import Link from '@/components/global/LinkComponent'
import Blank from '@/components/layout/BlankComponent'
import Media from '@/components/global/MediaComponent'
import Field from '@/components/global/FieldComponent'
import Modal from '@/components/global/ModalComponent'
import Input from '@/components/global/InputComponent'
import Detail from '@/components/global/DetailComponent'
import PostsList from '@/components/blog/PostsListComponent'
import ImageSet from '@/components/global/ImageSetComponent'
import Container from '@/components/global/ContainerComponent'
import TextContent from '@/components/global/TextContentComponent'
import ProjectsList from '@/components/portfolio/ProjectsListComponent'

// GLOBAL
Vue.component('Logo', Logo)
Vue.component('Page', Page)
Vue.component('Form', Form)
Vue.component('Icon', Icon)
Vue.component('Link', Link)
Vue.component('Blank', Blank)
Vue.component('Media', Media)
Vue.component('Modal', Modal)
Vue.component('Field', Field)
Vue.component('Input', Input)
Vue.component('Detail', Detail)
Vue.component('ImageSet', ImageSet)
Vue.component('Container', Container)
Vue.component('TextContent', TextContent)

// PORTFOLIO
Vue.component('ProjectsList', ProjectsList)

// BLOG
Vue.component('PostsList', PostsList)
