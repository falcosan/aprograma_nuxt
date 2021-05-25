<template>
  <component
    :is="blok.external_link ? 'a' : 'NuxtLink'"
    v-if="blok"
    class="item-link h-full block cursor-pointer"
    :active-class="blok.external_link ? false : !iconItem && !blok.icon_item ? 'filter invert grayscale bg-gray-600' : 'filter invert grayscale bg-gray-300'"
    :to="blok.external_link ? false : blok.path"
    :href="blok.external_link ? blok.path : false"
    :rel="blok.external_link ? 'noopener noreferrer' : false"
    :target="blok.external_link ? '_blank' : false"
  >
    <p v-if="!iconItem && !blok.icon_item" class="item-text break-words" :style="`color: ${blok.text_color.color};`">
      {{ blok.title }}
    </p>
    <Icon
      v-else
      :class="`item-icon ${iconStyle}`"
      :tag="blok.body[0].tag"
      :blok="blok.body[0]"
    />
  </component>
  <component
    :is="externalLink ? 'a' : 'NuxtLink'"
    v-else
    class="item-link h-full block cursor-pointer"
    :active-class="externalLink ? false : !iconItem ? 'filter invert grayscale bg-gray-600' : 'filter invert grayscale bg-gray-300'"
    :to="externalLink ? false : path"
    :href="externalLink ? path : false"
    :rel="externalLink ? 'noopener noreferrer' : false"
    :target="externalLink ? '_blank' : false"
  >
    <span v-if="!iconItem" class="item-text break-words">{{ title }}</span>
    <Icon
      v-else
      :class="`item-icon ${iconStyle}`"
      :tag="iconTag"
    />
  </component>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    externalLink: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: ''
    },
    iconTag: {
      type: String,
      default: 'a'
    },
    title: {
      type: String,
      default: ''
    },
    iconItem: {
      type: Boolean,
      default: false
    },
    iconStyle: {
      type: String,
      default: ''
    }
  }
}
</script>
