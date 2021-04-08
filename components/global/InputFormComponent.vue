<template>
  <div class="field-item">
    <label v-if="blok.type !== 'submit'">{{ blok.name }}</label>
    <component
      :is="blok.tag"
      :name="blok.name"
      :type="blok.tag === 'textarea' ? false : blok.type"
      :placeholder="blok.value_placeholder"
      :value="fieldValue === '' ? false : fieldValue"
      @keyup="fieldEmail"
      @input="$emit('update:fieldValue', $event.target.value)"
    />
  </div>
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
  },
  methods: {
    fieldEmail () {
      if (this.blok.type === 'email') { this.$store.commit('data/emailMutation', this.fieldValue) }
    }
  }
}
</script>
