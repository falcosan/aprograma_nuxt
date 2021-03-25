<template>
  <a
    :key="blok._uid"
    :title="blok.tooltip"
    :href="blok.path"
    :class="`icon_link ${blok.style}`"
    target="_blank"
    rel="noopener"
    ><span role="img" :class="`icon_container`"
      ><img
        :alt="`${blok.icon.filename
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}_icon`"
        :class="`icon ${blok.icon.filename
          .split(/[\\/]/)
          .pop()
          .replace(/\.[^/.]+$/, '')}_icon`"
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
}
</script>