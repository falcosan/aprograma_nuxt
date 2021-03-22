<template>
  <main class="main px-5">
    <template v-for="page in content.body">
      <component :is="page.component" :key="page._uid" :content="page" />
    </template>
  </main>
</template>

<script>
import HomePageVue from "@/pages/HomePageVue";
import AboutPageVue from "@/pages/AboutPageVue";
import ProjectsPageVue from "@/pages/ProjectsPageVue";
import BlogPageVue from "@/pages/BlogPageVue";
import BadPageVue from "@/pages/BadPageVue";
export default {
  components: {
    HomePageVue,
    AboutPageVue,
    ProjectsPageVue,
    BlogPageVue,
    BadPageVue,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>

