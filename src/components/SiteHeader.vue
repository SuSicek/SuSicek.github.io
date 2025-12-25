<template>
  <v-app-bar
    :fixed="!isAtTop"
    :absolute="isAtTop"
    flat
    :elevation="isAtTop ? 0 : 2"
    :color="isAtTop ? 'transparent' : 'white'"
    class="responsive-header blue-rings-bg"
    :class="['header-overlay', 'header-transition', { 
      'header-transparent': isAtTop, 
      'header-scrolled': !isAtTop 
    }]"
  >
  <v-container fluid class="py-0 px-0 header-container">
      <v-row align="center" no-gutters>
        <!-- Left: Logo -->
        <v-col cols="auto" class="logo-col pa-0">
          <RouterLink to="/">
            <v-img
              :src="logoSrc"
              alt="UCHYTIL s.r.o."
              class="logo-img"
              :class="{ 'logo-fade': true }"
              @error="onLogoError"
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
                <v-list-item
                  v-for="divKey in divisionOrder"
                  :key="divKey"
                  :title="divisions[divKey].title"
                  :to="{ name: 'Division', params: { division: divKey } }"
                />
                <v-divider class="my-1" />
                <v-list-item :to="{ name: 'Eshop' }" title="E‑shop" />
              </v-list>
            </v-menu>
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
        <v-list-item
          v-for="divKey in divisionOrder"
          :key="divKey"
          :title="divisions[divKey].title"
          :to="{ name: 'Division', params: { division: divKey } }"
        />
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
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { divisions, divisionOrder } from '../data/divisions'

const drawer = ref(false)
const isAtTop = ref(true)
const whiteLogoError = ref(false)
const blueLogoError = ref(false)

// Compute logo source: white logo on transparent (top), blue logo on scrolled.
// If a variant is missing, fall back to the default colored logo.
const logoSrc = computed(() => {
  if (isAtTop.value) {
    return whiteLogoError.value ? '/fotky/logo.png' : '/fotky/logo-white.png'
  } else {
    return blueLogoError.value ? '/fotky/logo.png' : '/fotky/logo.blue.png'
  }
})

const onLogoError = () => {
  // Mark the currently intended variant as failed and fall back automatically
  if (isAtTop.value) {
    whiteLogoError.value = true
  } else {
    blueLogoError.value = true
  }
}

const onScroll = () => {
  isAtTop.value = (window.scrollY || window.pageYOffset) < 50
}

const updateScrollState = () => {
  document.body.classList.toggle('header-scrolled', !isAtTop.value)
}

onMounted(() => {
  onScroll()
  updateScrollState()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.classList.remove('header-scrolled')
})

watch(isAtTop, () => {
  updateScrollState()
})
</script>

<style scoped>
.header-overlay {
  z-index: 10000;
}

/* Responsive header height */
.responsive-header {
  height: clamp(80px, 8vw, 120px) !important;
}
.responsive-header :deep(.v-toolbar__content) {
  height: 100% !important;
}

/* Even taller on smaller screens */
@media (max-width: 960px) {
  .responsive-header {
    height: clamp(100px, 10vw, 140px) !important;
  }
}

@media (max-width: 600px) {
  .responsive-header {
    height: clamp(120px, 12vw, 160px) !important;
  }
}

/* Logo scales with header - larger on smaller resolutions */
.logo-img {
  width: clamp(120px, 12vw, 180px) !important;
  height: auto !important;
}

/* Even larger on very small screens */
@media (max-width: 600px) {
  .logo-img {
    width: clamp(140px, 15vw, 200px) !important;
  }
}

/* Logo column spacing */
.logo-col {
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 100% !important;
}

/* Add padding to logo on smaller resolutions */
@media (max-width: 960px) {
  .logo-col {
    padding: 8px !important;
  }
  .logo-col a {
    padding: 8px !important;
    display: block !important;
  }
  .logo-img {
    padding: 8px !important;
    margin: 0 !important;
  }
}

@media (max-width: 600px) {
  .logo-col {
    padding: 12px !important;
  }
  .logo-col a {
    padding: 12px !important;
    display: block !important;
  }
  .logo-img {
    padding: 12px !important;
    margin: 0 !important;
  }
}

.header-transition {
  transition: all 300ms ease;
}

/* Transparent state - completely remove any background */
.header-overlay.header-transparent {
  background-color: transparent !important;
  background-image: none !important;
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

.header-overlay.header-transparent :deep(.v-toolbar__content) {
  background-color: transparent !important;
  background-image: none !important;
  background: transparent !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.header-overlay.header-transparent :deep(.v-app-bar) {
  background-color: transparent !important;
  background-image: none !important;
  background: transparent !important;
}

.header-overlay.header-transparent::before,
.header-overlay.header-transparent::after {
  display: none !important;
}

.header-overlay.header-transparent :deep(.v-theme--light),
.header-overlay.header-transparent :deep(.v-theme--dark) {
  background-color: transparent !important;
  background-image: none !important;
  background: transparent !important;
}

/* Override any Vuetify theme colors */
.header-overlay.header-transparent :deep(*) {
  background-color: transparent !important;
}

/* Scrolled state - solid blueish background */
.header-overlay.header-scrolled {
  background-color: #e0f0ff !important;
  background: #e0f0ff !important;
  background-image: none !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.header-overlay.header-scrolled :deep(.v-toolbar__content) {
  background-color: #e0f0ff !important;
  background: #e0f0ff !important;
  background-image: none !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Slight inset width for header content */
.header-container {
  width: 75%; /* slightly shorter than previous 92% */
  max-width: 1800px; /* tighten max width a bit */
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 1280px) {
  .header-container { width: 92%; }
}

@media (max-width: 960px) {
  .header-container { width: 100%; }
}

/* Legacy support for old class names */
.header-overlay:not(.scrolled) {
  background-color: transparent !important;
  background-image: none !important;
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

.header-overlay.scrolled {
  background-color: white !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

/* Logo transition */
.logo-img.logo-fade {
  transition: opacity 300ms ease, filter 300ms ease;
}

/* If you choose a single colored logo and want it to appear white at top without separate asset,
   uncomment the filter rule below instead of providing /fotky/logo-white.png
   .header-overlay.header-transparent .logo-img { filter: brightness(0) invert(1); } */
</style>

<style>
body:not(.header-scrolled) .v-main {
  background-color: transparent !important;
}

body:not(.header-scrolled) .v-application,
body:not(.header-scrolled) .v-application--wrap {
  background-color: transparent !important;
}
</style>
