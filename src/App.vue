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

/* Blue ring background pattern for white sections */
.blue-rings-bg {
  background-image:
    radial-gradient(circle at 20% 80%, rgba(34, 86, 161, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(34, 86, 161, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(34, 86, 161, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 60% 70%, rgba(34, 86, 161, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 90% 10%, rgba(34, 86, 161, 0.05) 0%, transparent 50%);
  background-size: 300px 300px, 400px 400px, 250px 250px, 350px 350px, 280px 280px;
  background-position: 0% 0%, 100% 100%, 50% 50%, 75% 25%, 25% 75%;
  background-repeat: no-repeat;
  position: relative;
}

.blue-rings-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 70% 30%, rgba(34, 86, 161, 0.03) 0%, transparent 60%),
    radial-gradient(circle at 10% 90%, rgba(34, 86, 161, 0.04) 0%, transparent 55%),
    radial-gradient(circle at 85% 85%, rgba(34, 86, 161, 0.02) 0%, transparent 45%);
  background-size: 500px 500px, 320px 320px, 380px 380px;
  background-position: 30% 70%, 80% 20%, 60% 40%;
  background-repeat: no-repeat;
  pointer-events: none;
}
</style>