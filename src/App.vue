<template>
  <v-app>
    <SiteHeader />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue'

export default {
  name: 'App',
  components: { SiteHeader }
}
</script>