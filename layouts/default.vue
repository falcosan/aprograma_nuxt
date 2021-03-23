<template>
  <div>
    <HeaderComponentVue></HeaderComponentVue>
    <Nuxt />
    <FooterComponentVue></FooterComponentVue>
  </div>
</template>


<script>
import FooterComponentVue from '@/components/FooterComponentVue'
import HeaderComponentVue from '@/components/HeaderComponentVue'
export default {
  components: { HeaderComponentVue, FooterComponentVue },
}
</script>
