<template>
  <li class="field-item">
    <label v-if="blok.type !== 'submit'">{{ blok.name }}</label>
    <input
      v-if="blok.type === 'submit'"
      :type="blok.type"
      :value="blok.value_placeholder"
    >
    <input
      :is="blok.tag"
      v-else
      :name="blok.name"
      :type="blok.tag === 'textarea' ? false : blok.type"
      :placeholder="blok.value_placeholder"
      :value="fieldValue"
      @input="$emit('update:fieldValue', $event.target.value)"
    />
  </li>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    },
    fieldValue: {
      type: String,
      default: ''
    }
  }
}
</script>
