<template>
  <NuxtLink
    :active-class="`${!iconItem ? 'bg-gray-300' : 'filter invert grayscale bg-gray-300'}`"
    :to="blok.path"
    class="item-link h-full block font-light"
  >
    <span v-if="!iconItem" class="item-text" :style="`color: ${blok.text_color.color};`">{{ blok.title }}</span>
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
