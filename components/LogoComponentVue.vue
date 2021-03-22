<template>
  <div :class="`logo_box ${style.logo}`" v-html="content.logo" />
</template>
            

<script>
import setCustomStyle from "@/plugins/setCustomStyle";
export default {
  mixins: [setCustomStyle],
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>
