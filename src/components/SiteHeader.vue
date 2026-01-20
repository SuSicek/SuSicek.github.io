<template>
  <v-app-bar
    :fixed="!isAtTop"
    :absolute="isAtTop"
    flat
    :elevation="0"
    color="transparent"
    :height="headerHeight"
    class="responsive-header"
    :class="['header-overlay', 'header-transition', {  
      'header-transparent': isAtTop, 
      'header-scrolled': !isAtTop 
    }]"
  >
  <div v-if="!isAtTop" class="header-bg-container">
    <div class="light-circle left-center"></div>
    <div class="light-circle right-center"></div>
    <div class="light-circle top-left"></div>
    <div class="light-circle bottom-right"></div>
  </div>
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
          <v-app-bar-nav-icon
            :color="(isAtTop && !drawer) ? 'white' : 'primary'"
            class="mobile-nav-icon"
            @click="drawer = !drawer"
            style="z-index: 10001; position: relative;"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Mobile drawer -->
  <v-navigation-drawer v-model="drawer" location="right" temporary class="mobile-menu-drawer">
    <v-list density="comfortable" class="pt-14">
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
import { useDisplay } from 'vuetify'
import { divisions, divisionOrder } from '../data/divisions'

const { mobile } = useDisplay()
const drawer = ref(false)
const isAtTop = ref(true)
const whiteLogoError = ref(false)
const blueLogoError = ref(false)

const headerHeight = computed(() => {
  // Mobile/small screens
  if (mobile.value) return 110 
  // Desktop: Large when at top, smaller (sticky) when scrolled
  return isAtTop.value ? 210 : 130
})

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
  isAtTop.value = (window.scrollY || window.pageYOffset) < 100
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

/* Responsive header height - allow prop to control it, but ensure minimums */
.responsive-header {
  /* height handled by v-app-bar prop normally */
}
.responsive-header :deep(.v-toolbar__content) {
  height: 100% !important;
}

/* On mobile, ensure we don't accidentally force it too tall via other rules 
@media (max-width: 960px) {
  /* Reset any potential legacy overrides 
  .responsive-header {
     height: auto !important;
  }
}*/


/* Logo scales with header - larger on smaller resolutions */
.logo-img {
  width: clamp(120px, 12vw, 180px) !important;
  height: auto !important;
  max-height: 80%; /* Ensure it doesn't touch edges */
  z-index: 10;
}

/* Smaller logo on mobile to fit reduced header height */
@media (max-width: 600px) {
  .logo-img {
    width: 100px !important;
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
    padding: 4px !important;
  }
  .logo-col a {
    padding: 4px !important;
    display: block !important;
  }
  .logo-img {
    padding: 4px !important;
    margin: 0 !important;
  }
}

@media (max-width: 600px) {
  .logo-col {
    padding: 2px !important;
  }
  .logo-col a {
    padding: 2px !important;
    display: block !important;
  }
  .logo-img {
    padding: 2px !important;
    margin: 0 !important;
  }
}

.header-transition {
  transition: all 150ms ease;
}

/* Safe area support for iPhone notch etc. */
.responsive-header :deep(.v-toolbar__content) {
  /* Increase padding to ensure "empty header space" covers top of display securely */
  padding-top: env(safe-area-inset-top, 10px) !important;
  align-items: center;
  transition: padding 150ms ease;
}
@media (min-width: 960px) {
  .responsive-header :deep(.v-toolbar__content) {
    padding-top: 0 !important;
  }
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
  /* background styles moved to container */
}

.header-bg-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: #031f68;
  background: #031f68;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* Slightly fade the bottom edge for a smooth transition */
  -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
}

.header-bg-container::before {
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
.header-bg-container::after {
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
  background-color: transparent !important;
  background: transparent !important;
  background-image: none !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Slight inset width for header content */
.header-container {
  position: relative;
  z-index: 10;
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
  transition: opacity 150ms ease, filter 150ms ease;
}

.mobile-menu-drawer {
  z-index: 9000 !important;
  top: 0 !important;
  height: 100vh !important;
}

.header-overlay {
  z-index: 10000 !important;
}
</style>

<style>
body:not(.header-scrolled) .v-main {
  background-color: transparent !important;
}

body:not(.header-scrolled) .v-application,
body:not(.header-scrolled) .v-application--wrap {
  background-color: transparent !important;
}

/* Ensure button contents are white in scrolled header - SCOPED TO HEADER ONLY */
.header-overlay.header-scrolled .v-btn__content,
.header-overlay.header-scrolled .v-icon {
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

@media (max-width: 960px) {
  .light-circle.left-center,
  .light-circle.right-center {
    display: none;
  }
}

</style>
