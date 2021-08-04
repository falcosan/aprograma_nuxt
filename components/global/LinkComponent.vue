<template>
  <component
    :is="blok.external_link ? 'a' : 'NuxtLink'"
    v-if="blok"
    :class="`item-link h-full cursor-pointer ${sliderMode || carouselMode || containerMode ? 'flex items-center justify-center self-center' : 'block'}`"
    :active-class="blok.external_link ? '' : !iconItem && !blok.icon_item ? 'filter invert grayscale bg-gray-500' : 'filter invert grayscale bg-gray-300'"
    :to="blok.external_link ? '' : blok.path"
    :href="blok.external_link ? blok.path : ''"
    :rel="blok.external_link ? 'noopener noreferrer' : ''"
    :target="blok.external_link ? '_blank' : ''"
    :title="blok.title && blok.icon_item ? blok.title : ''"
  >
    <span v-if="blok.title && !iconItem && !blok.icon_item" class="item-text break-words p-10 font-extralight" :style="`color: ${blok.text_color.color};`">
      {{ blok.title }}
    </span>
    <Icon
      v-else-if="iconItem || blok.icon_item"
      :class="`item-icon ${iconStyle}`"
      :tag="blok.body[0].tag"
      :blok="blok.body[0]"
      :slider-mode="sliderMode"
      :carousel-mode="carouselMode"
      :container-mode="containerMode"
      :tooltip="blok.title ? blok.title : ''"
    />
  </component>
  <component
    :is="externalLink ? 'a' : 'NuxtLink'"
    v-else
    :class="`item-link h-full cursor-pointer ${sliderMode || carouselMode || containerMode ? 'flex items-center justify-center self-center' : 'block'}`"
    :active-class="active === 'active' ? !iconItem ? 'filter invert grayscale bg-gray-600' : 'filter invert grayscale bg-gray-300' : ''"
    :exact-active-class="active === 'exact' ? !iconItem ? 'filter invert grayscale bg-gray-600' : 'filter invert grayscale bg-gray-300' : ''"
    :to="externalLink ? '' : to"
    :href="externalLink ? to : ''"
    :rel="externalLink ? 'noopener noreferrer' : ''"
    :target="externalLink ? '_blank' : ''"
    :title="title && iconItem ? title : ''"
  >
    <span v-if="title && !iconItem" class="item-text break-words font-extralight">{{ title }}</span>
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
    containerWidth: {
      type: Number,
      default: 0
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
      type: Boolean,
      default: false
    },
    containerMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>
