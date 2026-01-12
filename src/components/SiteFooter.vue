<template>
  <v-footer color="transparent" class="text-white footer-dark" elevation="0" padless>
    <v-container class="py-8 footer-container">
      <v-row>
        <v-col cols="12" md="4">
          <RouterLink to="/">
            <v-img
              :src="footerLogoSrc"
              alt="UCHYTIL s.r.o."
              width="200"
              height="72"
              class="mb-4"
              @error="onFooterLogoError"
            />
          </RouterLink>
          <div class="footer-note">
            UCHYTIL s.r.o. – Stavba, Energetika, TZB.
          </div>
        </v-col>

        <v-col cols="6" md="4">
          <h6 class="footer-heading">Naše služby</h6>
          <ul class="footer-links">
            <li><RouterLink :to="{ name: 'Division', params: { division: 'energetika' } }">Energetika</RouterLink></li>
            <li><RouterLink :to="{ name: 'Division', params: { division: 'prumysl' } }">TZB</RouterLink></li>
            <li><RouterLink :to="{ name: 'Division', params: { division: 'stavebnictvi' } }">Stavba</RouterLink></li>
            <li><RouterLink :to="{ name: 'Eshop' }">E‑shop</RouterLink></li>
          </ul>
        </v-col>

        <v-col cols="6" md="4">
          <h6 class="footer-heading">Společnost</h6>
          <ul class="footer-links">
            <li><RouterLink :to="{ name: 'AboutUs' }">O nás</RouterLink></li>
            <li><RouterLink :to="{ name: 'References' }">Reference</RouterLink></li>
            <li><RouterLink :to="{ name: 'Career' }">Kariéra</RouterLink></li>
            <li><RouterLink :to="{ name: 'ContactUs' }">Kontakt</RouterLink></li>
          </ul>
        </v-col>
      </v-row>

      <v-divider class="my-6" color="white" :thickness="1" style="opacity:0.16"></v-divider>

      <v-row align="center">
        <v-col cols="12" sm="6" class="text-sm-left text-center">
          <small class="text-white text-opacity-70">&copy; {{ new Date().getFullYear() }} UCHYTIL s.r.o.</small>
        </v-col>
        <v-col cols="12" sm="6" class="text-sm-right text-center">
          <div class="socials">
            <v-btn icon size="small" href="https://www.facebook.com/uchytilsro" target="_blank" variant="text" class="mx-1" color="white"><v-icon>mdi-facebook</v-icon></v-btn>
            <v-btn icon size="small" href="https://www.instagram.com/uchytil_tzb_stavba_energetika" target="_blank" variant="text" class="mx-1" color="white"><v-icon>mdi-instagram</v-icon></v-btn>
            <v-btn icon size="small" href="https://www.linkedin.com" target="_blank" variant="text" class="mx-1" color="white"><v-icon>mdi-linkedin</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const footerLogoErrored = ref(false)
const footerLogoSrc = computed(() => footerLogoErrored.value ? '/fotky/logo.png' : '/fotky/logo-white.png')
const onFooterLogoError = () => { footerLogoErrored.value = true }
</script>

<style scoped>
.footer-dark {
  background-color: #0b1220 !important; /* ensure override over Vuetify theme surface */
  background-image: none !important;
  border-top: none !important;
}

.footer-container {
  width: 75%;
  max-width: 1800px;
  margin: 0 auto;
}

.footer-heading {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 8px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin: 6px 0;
}

.footer-links a {
  color: white;
  text-decoration: none;
}

.footer-links a:hover {
  color: #ffffff;
  text-decoration: underline;
}

.footer-note {
  color: rgba(255,255,255,0.8);
  max-width: 520px;
}

@media (max-width: 1280px) {
  .footer-container { width: 92%; }
}

@media (max-width: 960px) {
  .footer-container { width: 100%; }
}
</style>