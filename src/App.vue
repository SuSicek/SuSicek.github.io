<template>
  <v-app>
    <SiteHeader />
    <v-main>
      <router-view />
    </v-main>
    <SiteFooter />
  </v-app>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
  name: 'App',
  components: { SiteHeader, SiteFooter }
}
</script>

<style>
.v-main {
  transition: padding-top 300ms ease;
}
.header-scrolled .v-main {
  padding-top: 112px !important;
}
</style>