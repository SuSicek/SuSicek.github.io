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
:root {
  --app-header-height: 112px;
}

.v-application,
.v-application--wrap {
  --v-layout-top: 0px !important;
}

.v-main {
  padding-top: 0 !important;
  transition: padding-top 300ms ease;
}
</style>