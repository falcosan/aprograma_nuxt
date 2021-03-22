<template>
  <div class="social_bar flex">
    <a
      v-for="(social, index) in content"
      :key="social._uid"
      :title="social.tooltip"
      :href="social.path"
      :class="`social_link`"
      target="_blank"
      rel="noopener"
      ><span role="img" :class="`social_icon`"
        ><img
          :alt="`${social.icon.filename
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}_icon`"
          :class="`${social.icon.filename
            .split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')}_link ${style[index].social_image}`"
          :src="social.icon.filename" /></span
    ></a>
  </div>
</template>

<script>
import setCustomStyle from "@/plugins/setCustomStyle";
export default {
  mixins: [setCustomStyle],
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>