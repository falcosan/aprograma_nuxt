<template>
  <footer
    @mouseleave="expandOut()"
    @mouseover="expandIn()"
    :class="`footer ${expanded} w-full fixed z-50 bottom-0 bg-gray-200 transition-height duration-200 ease-in-out`"
  >
    <div class="input_footer flex justify-center transform -translate-y-10">
      <span class="input_text text-center animate-bounce text-4xl">.</span>
    </div>
    <div class="footer_content grid items-center">
      <h3 class="row-start-1 row-end-1 col-start-1 col-end-1 ml-4 text-sm">
        hey
      </h3>
      <h4
        class="footer_copyright text-sm text-center w-full row-start-1 row-end-1 col-start-1 col-end-3"
      >
        © 2020 - {{ currentYear }}, aprograma
      </h4>
      <div
        class="social_links flex row-start-1 row-end-1 col-start-2 col-end-2 w-max justify-self-end"
      >
        <IconLink
          v-for="iconLink in $contentByName(blok.body, 'IconLink')"
          :key="iconLink._uid"
          :blok="iconLink"
        />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      expanded: 'not_expanded h-0',
      currentYear: new Date().getFullYear(),
    }
  },
  created() {
    this.setElementName()
  },
  methods: {
    expandIn() {
      this.expanded = 'expandend h-28'
    },
    expandOut() {
      this.expanded = 'not_expanded h-0'
    },
    setElementName() {
      return this.$store.dispatch('values/setElementsName', this.blok.component)
    },
  },
}
</script>


