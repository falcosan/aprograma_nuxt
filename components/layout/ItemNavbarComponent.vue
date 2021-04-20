<template>
  <NuxtLink
    :to="blok.path"
    class="item-link"
  >
    <span v-if="!iconItem" class="item-text">{{ blok.title }}</span>
    <Icon
      v-else
      :class="`item-icon ${iconStyle}`"
      :tag="blok.body[0].tag"
      :blok="blok.body[0]"
      :size="iconSize"
    />
  </NuxtLink>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    },
    iconItem: {
      type: Boolean,
      required: true
    },
    iconStyle: {
      type: String,
      default: ''
    },
    iconSize: {
      type: String,
      default: ''
    }
  }
}
</script>
