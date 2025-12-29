<template>
  <v-app-bar
    :fixed="!isAtTop"
    :absolute="isAtTop"
    flat
    :elevation="isAtTop ? 0 : 2"
    :color="isAtTop ? 'transparent' : 'primary'"
    class="responsive-header"
    :class="['header-overlay', 'header-transition', { 
      'header-transparent': isAtTop, 
      'header-scrolled': !isAtTop 
    }]"
  >
  <div v-if="!isAtTop" class="light-circle left-center"></div>
  <div v-if="!isAtTop" class="light-circle right-center"></div>
  <div v-if="!isAtTop" class="light-circle top-left"></div>
  <div v-if="!isAtTop" class="light-circle bottom-right"></div>
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
            <span :style="{ color: 'white' }" class="text-body-2 mr-2">IČO: 60734078</span>
            <v-btn icon :color="'white'" href="https://www.facebook.com/uchytilsro" target="_blank" size="small" class="mx-1">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon :color="'white'" href="https://www.instagram.com/uchytil_tzb_stavba_energetika" target="_blank" size="small" class="mx-1">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon :color="'white'" href="https://www.linkedin.com" target="_blank" size="small" class="mx-1">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </div>

          <!-- Tabs/nav row -->
          <div class="d-flex align-center" style="gap:8px;">
            <v-menu open-on-hover>
              <template #activator="{ props }">
                <v-btn v-bind="props" variant="text" style="color: white !important" append-icon="mdi-chevron-down">Naše služby</v-btn>
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

// Compute logo source: always colored logo.
// If colored variant is missing, fall back to the default colored logo.
const logoSrc = computed(() => {
  return '/fotky/logo.png'
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
  z-index: 10;
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
  background-color: #031f68 !important;
  background: #031f68 !important;
  background-image: none !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  position: relative;
  overflow: hidden;
}
.header-overlay.header-scrolled::before {
  content: '';
  position: absolute;
  top: -10%;
  left: 4%;
  width: 500px;
  height: 500px;
  background-image:
    radial-gradient(circle at 20% 28%, rgba(180,220,255,0.5) 0%, rgba(150,200,255,0.25) 30%, transparent 66%),
    radial-gradient(circle at 62% 20%, rgba(150,200,255,0.4) 0%, rgba(150,200,255,0.2) 28%, transparent 68%),
    radial-gradient(circle at 40% 60%, rgba(180,220,255,0.45) 0%, rgba(150,200,255,0.22) 35%, transparent 70%),
    radial-gradient(circle at 80% 70%, rgba(150,200,255,0.42) 0%, rgba(180,220,255,0.21) 32%, transparent 68%),
    radial-gradient(circle at 10% 80%, rgba(180,220,255,0.48) 0%, rgba(150,200,255,0.24) 30%, transparent 66%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: subtlePulse 8s ease-in-out infinite;
}
.header-overlay.header-scrolled::after {
  content: '';
  position: absolute;
  bottom: 6%;
  right: 6%;
  width: 520px;
  height: 520px;
  background-image:
    radial-gradient(circle at 12% 68%, rgba(150,200,255,0.45) 0%, rgba(150,200,255,0.22) 28%, transparent 66%),
    radial-gradient(circle at 72% 40%, rgba(180,220,255,0.38) 0%, rgba(180,220,255,0.18) 26%, transparent 66%),
    radial-gradient(circle at 30% 20%, rgba(150,200,255,0.42) 0%, rgba(180,220,255,0.2) 32%, transparent 68%),
    radial-gradient(circle at 50% 80%, rgba(180,220,255,0.4) 0%, rgba(150,200,255,0.19) 30%, transparent 70%),
    radial-gradient(circle at 85% 10%, rgba(150,200,255,0.46) 0%, rgba(180,220,255,0.23) 28%, transparent 66%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: subtlePulse 10s ease-in-out infinite;
}

.header-overlay.header-scrolled :deep(.v-toolbar__content) {
  background-color: #031f68 !important;
  background: #031f68 !important;
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

/* Ensure button contents are white in scrolled header */
.header-scrolled .v-btn__content {
  color: white !important;
}

@keyframes subtlePulse {
  0% { opacity: 0.8; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1.02); }
  100% { opacity: 0.8; transform: scale(0.98); }
}

/* Additional light circles */
.light-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: subtlePulse 9s ease-in-out infinite;
}
.light-circle.left-center {
  top: 10%;
  left: 20%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle at 50% 50%, rgba(180,220,255,0.4) 0%, rgba(150,200,255,0.35) 60%, transparent 90%);
  animation: subtlePulse 7s ease-in-out infinite;
}
.light-circle.right-center {
  top: 40%;
  right: 15%;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle at 50% 50%, rgba(150,200,255,0.45) 0%, rgba(180,220,255,0.4) 55%, transparent 95%);
  animation: subtlePulse 11s ease-in-out infinite;
}
.light-circle.top-left {
  top: -20%;
  left: 5%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle at 50% 50%, rgba(180,220,255,0.25) 0%, rgba(150,200,255,0.21) 58%, transparent 88%);
  animation: subtlePulse 6s ease-in-out infinite;
}

</style>
