<template>
  <div :class="`logo_box ${style.logo}`" v-html="content.logo" />
</template>
            

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>
