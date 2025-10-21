<template>
  <v-app-bar
    fixed
    :color="isAtTop ? 'transparent' : 'white'"
    :elevation="isAtTop ? 0 : 2"
    height="96"
    :class="['header-overlay', 'header-transition', { scrolled: !isAtTop }]"
  >
    <v-container class="py-0">
      <v-row align="center" no-gutters>
        <!-- Left: Logo -->
        <v-col cols="auto">
          <RouterLink to="/">
            <v-img
              src="/fotky/logo.png"
              alt="UCHYTIL s.r.o."
              width="180"
              height="64"
              class="my-2 logo-img"
            />
          </RouterLink>
        </v-col>

        <v-spacer />

        <!-- Right: Socials (top) + Tabs (underneath), aligned right on desktop -->
  <v-col cols="12" md="8" class="d-none d-md-flex" style="display:flex; flex-direction:column; align-items:flex-end; padding-top:6px;">
          <!-- Socials row -->
          <div class="d-flex align-center mb-1">
            <v-btn icon :color="isAtTop ? 'white' : 'primary'" href="https://www.facebook.com/uchytilsro" target="_blank" size="small" class="mx-1">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon :color="isAtTop ? 'white' : 'primary'" href="https://www.instagram.com/uchytil_tzb_stavba_energetika" target="_blank" size="small" class="mx-1">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon :color="isAtTop ? 'white' : 'primary'" href="https://www.linkedin.com" target="_blank" size="small" class="mx-1">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </div>

          <!-- Tabs/nav row -->
          <div class="d-flex align-center" style="gap:8px;">
            <v-menu open-on-hover>
              <template #activator="{ props }">
                <v-btn v-bind="props" variant="text" :color="isAtTop ? 'white' : 'primary'" append-icon="mdi-chevron-down">Naše služby</v-btn>
              </template>
              <v-list>
                <v-list-item :to="{ name: 'Division', params: { division: 'energetika' } }" title="Energetika" />
                <v-list-item :to="{ name: 'Division', params: { division: 'prumysl' } }" title="TZB" />
                <v-list-item :to="{ name: 'Division', params: { division: 'stavebnictvi' } }" title="Stavebnictví" />
                <v-list-item :to="{ name: 'Eshop' }" title="E‑shop" />
              </v-list>
            </v-menu>
            <v-divider v-if="!isAtTop" vertical class="mx-2" :color="'grey-darken-1'" />
            <v-btn variant="text" :color="isAtTop ? 'white' : 'primary'" :to="{ name: 'AboutUs' }">O nás</v-btn>
            <v-btn variant="text" :color="isAtTop ? 'white' : 'primary'" :to="{ name: 'References' }">Reference</v-btn>
            <v-btn variant="text" :color="isAtTop ? 'white' : 'primary'" :to="{ name: 'Career' }">Kariéra</v-btn>
            <v-btn variant="text" :color="isAtTop ? 'white' : 'primary'" :to="{ name: 'ContactUs' }">Kontakt</v-btn>
          </div>
        </v-col>

        <!-- Mobile menu button -->
        <v-col cols="auto" class="d-md-none">
          <v-app-bar-nav-icon :color="isAtTop ? 'white' : 'primary'" @click="drawer = true" />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Mobile drawer -->
  <v-navigation-drawer v-model="drawer" location="right" temporary>
    <v-list density="comfortable">
      <v-list-group value="sluzby">
        <template #activator="{ props }">
          <v-list-item v-bind="props" title="Naše služby" />
        </template>
        <v-list-item :to="{ name: 'Division', params: { division: 'energetika' } }" title="Energetika" />
        <v-list-item :to="{ name: 'Division', params: { division: 'prumysl' } }" title="TZB" />
        <v-list-item :to="{ name: 'Division', params: { division: 'stavebnictvi' } }" title="Stavebnictví" />
        <v-list-item :to="{ name: 'Eshop' }" title="E‑shop" />
      </v-list-group>
      <v-list-item :to="{ name: 'AboutUs' }" title="O nás" />
      <v-list-item :to="{ name: 'References' }" title="Reference" />
      <v-list-item :to="{ name: 'Career' }" title="Kariéra" />
      <v-list-item :to="{ name: 'ContactUs' }" title="Kontakt" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

const drawer = ref(false)
const isAtTop = ref(true)

const onScroll = () => {
  isAtTop.value = (window.scrollY || window.pageYOffset) < 80
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.header-overlay {
  z-index: 10000;
}
.header-transition {
  transition: background-color 160ms ease, box-shadow 160ms ease;
}
.header-overlay:not(.scrolled) {
  background-color: transparent !important;
  background-image: none !important;
  box-shadow: none !important;
  border: none !important;
}
.header-overlay.scrolled {
  background-color: #ffffff !important;
}
</style>
