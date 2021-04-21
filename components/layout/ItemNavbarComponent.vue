<template>
  <NuxtLink
    :active-class="`${!$store.state.data.mobile ? 'font-semibold' : 'bg-gray-400'} `"
    :to="blok.path"
    class="item-link h-full block"
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
