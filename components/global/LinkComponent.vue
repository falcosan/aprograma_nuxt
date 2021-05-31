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
    <span v-if="!iconItem && !blok.icon_item" class="item-text break-words" :style="`color: ${blok.text_color.color};`">
      {{ blok.title }}
    </span>
    <Icon
      v-else
      :class="`item-icon ${iconStyle}`"
      :tag="blok.body[0].tag"
      :blok="blok.body[0]"
      :slider-mode="sliderMode"
    />
  </component>
  <component
    :is="externalLink ? 'a' : 'NuxtLink'"
    v-else
    class="item-link h-full block cursor-pointer"
    :active-class="active === 'active' ? !iconItem ? 'filter invert grayscale bg-gray-600' : 'filter invert grayscale bg-gray-300' : ''"
    :exact-active-class="active === 'exact' ? !iconItem ? 'filter invert grayscale bg-gray-600' : 'filter invert grayscale bg-gray-300' : ''"
    :to="externalLink ? false : to"
    :href="externalLink ? to : false"
    :rel="externalLink ? 'noopener noreferrer' : false"
    :target="externalLink ? '_blank' : false"
  >
    <span v-if="!iconItem" class="item-text break-words">{{ title }}</span>
    <slot v-else name="icon" />
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
    to: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: ''
    },
    iconTag: {
      type: String,
      default: ''
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
    },
    sliderMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>
