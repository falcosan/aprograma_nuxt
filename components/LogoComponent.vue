<template>
  <div :class="`logo_box ${style.logo}`" v-html="blok.logo" />
</template>
            

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
};
</script>
