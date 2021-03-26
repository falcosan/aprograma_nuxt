<template>
  <a
    :key="blok._uid"
    :title="blok.tooltip"
    :href="blok.path"
    :class="`icon-link icon-link-${customIconLink}`"
    target="_blank"
    rel="noopener"
    ><span role="img" :class="`icon-container`"
      ><img
        :class="`icon ${blok.icon.filename
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-icon`"
        :alt="`${blok.icon.filename
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}-icon`"
        :src="blok.icon.filename" /></span
  ></a>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    customIconLink() {
      return (
        this.$customClass('footer', 'footer w-6 mr-4')
      )
    },
  },
}
</script>