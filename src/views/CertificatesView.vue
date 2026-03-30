<template>
  <div>
    <!-- Hero with static image -->
    <v-sheet class="position-relative hero-shell" color="black">
      <v-img 
        src="/fotky/jine/dronBrno.webp" 
        alt="Certifikace" 
        cover 
        class="hero-image"
        @error="handleImageError"
      />
      <div class="hero-overlay d-flex flex-column justify-end">
        <div class="overlay-container">
          <h1 class="slideshow-title">UCHYTIL <span class="hero-highlight">s.r.o.</span></h1>
          <div class="slideshow-subtitle">Kvalita, na kterou se můžete <span class="hero-highlight">spolehnout</span>.</div>
        </div>
      </div>
    </v-sheet>
    
    <v-container class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-h3 font-weight-bold mb-4">Certifikace a kvalita</h2>
        <div style="max-width: 900px; margin: 0 auto;">
          <p class="text-h6 font-weight-regular text-grey-darken-1 mb-8">
            Důvěra a odbornost jsou pro nás klíčové. Naše společnost drží řadu významných certifikátů, které potvrzují kvalitu naší práce, dodržování bezpečnostních norem a šetrný přístup k životnímu prostředí.
          </p>
        </div>
      </div>

      <!-- Policy Text Section -->
      <v-card class="mb-16 pa-6 pa-md-10 bg-grey-lighten-5" elevation="1" border>
        <div class="d-flex flex-column gap-4">
          <div class="d-flex align-top mb-4">
            <v-icon color="primary" size="large" class="mr-4 mt-1">mdi-medal-outline</v-icon>
            <div>
              <p class="text-body-1 mb-2">
                Firma zavedla a používá integrovaný systém řízení, který odpovídá 
                <strong>ČSN EN ISO 9001:2016, ČSN EN ISO 14001:2016, ČSN ISO 45001:2018</strong>, politika společnosti.
              </p>
            </div>
          </div>
          
          <div class="d-flex align-top mb-4">
            <v-icon color="primary" size="large" class="mr-4 mt-1">mdi-factory</v-icon>
            <div>
               <p class="text-body-1 mb-2">
                Společnost je certifikována pro výrobu a montáž, opravy a rekonstrukce energetických zařízení 
                a ocelových konstrukcí dle normy <strong>ČSN EN ISO 3834-2:2022</strong>, pro výrobu a montáž 
                ocelových konstrukcí energetických zařízení a staveb dle normy <strong>ČSN EN 1090-2+A1:2024</strong>.
              </p>
            </div>
          </div>

           <div class="d-flex align-top">
            <v-icon color="primary" size="large" class="mr-4 mt-1">mdi-fire</v-icon>
            <div>
              <p class="text-body-1 mb-0">
                Společnost je certifikována pro výkon společných činností v plynárenství ČR firmou <strong>GAS s.r.o.</strong>
              </p>
            </div>
          </div>
          
          <div class="d-flex align-top">
            <v-icon color="primary" size="large" class="mr-4 mt-1">mdi-shield-check</v-icon>
            <div>
              <p class="text-body-1 mb-0">
                Společnosti <strong>UCHYTIL s.r.o.</strong> má osvědčení o odborné způsobilosti k provádění vnějších kontaktních tepelně izolačních systémů s omítkou <strong>ETICS</strong>.
              </p>
            </div>
          </div>
          
          <div class="d-flex align-top">
            <v-icon color="primary" size="large" class="mr-4 mt-1">mdi-security</v-icon>
            <div>
              <p class="text-body-1 mb-0">
                Informační systém společnosti je certifikován od <strong>NÚKIB</strong> k nakládání s utajovanou informací do a včetně štupně utajení <strong>VYHRAZENÉ</strong>.
              </p>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Certificates PDF Grid -->
      <h3 class="text-h4 font-weight-bold mb-8 text-center">Naše certifikáty</h3>
      
      <v-row class="mb-12">
        <v-col v-for="(cert, i) in certificates" :key="i" cols="12" sm="6" md="4" lg="3">
          <v-card 
            class="fill-height d-flex flex-column text-center pdf-card cursor-pointer" 
            elevation="2" 
            hover
            :href="cert.path" 
            target="_blank"
          >
            <div class="certificate-image-wrapper">
              <v-img 
                :src="cert.image" 
                :alt="cert.name"
                height="200"
                cover
                class="certificate-image"
              />
            </div>
            <v-card-text class="flex-grow-1 d-flex align-center justify-center">
              <div class="font-weight-bold text-h6" style="line-height: 1.3;">{{ cert.name }}</div>
            </v-card-text>
            <v-card-actions class="justify-center pb-4 pt-0">
              <v-btn variant="text" color="primary" append-icon="mdi-open-in-new">
                Zobrazit PDF
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const certificates = ref([
  { name: 'ISO 9001', path: '/fotky/certifikace/ISO 9001.pdf', image: '/fotky/certifikace/iso9001.png' },
  { name: 'ISO 14001', path: '/fotky/certifikace/ISO 14001.pdf', image: '/fotky/certifikace/ISO 14001.png' },
  { name: 'ISO 45001', path: '/fotky/certifikace/ISO 45001.pdf', image: '/fotky/certifikace/ISO 45001.png' },
  { name: 'Certifikát NÚKIB', path: '/fotky/certifikace/NÚKIB_certifikát.pdf', image: '/fotky/certifikace/nukib.png' },
  { name: 'Certifikát GAS', path: '/fotky/certifikace/certifikat_gas_perina.pdf', image: '/fotky/certifikace/gas.png' },
  { name: 'TAZUS', path: '/fotky/certifikace/TAZUS.pdf', image: '/fotky/certifikace/TAZUS.png' },
  { name: 'Svařování (Qualiform)', path: '/fotky/certifikace/Qualiform_svařování pří výrobě, montáži,  opravách a rekonstrukcí.pdf', image: '/fotky/certifikace/svarovani.png' },
  { name: 'Ocelové konstrukce (Qualiform)', path: '/fotky/certifikace/Qualiform_výroba a montáž ocel konstr a energ zařízení staveb.pdf', image: '/fotky/certifikace/konstrukce.png' },
])

const handleImageError = (event) => {
  const img = event.target
  const currentSrc = img.src
  
  // If current image is WebP, switch to fallback
  if (currentSrc.includes('.webp')) {
    const fallbackSrc = currentSrc.replace('.webp', '.png')
    img.src = fallbackSrc
  }
}
</script>

<style scoped>
.hero-shell {
  min-height: 400px;
  height: 50vh;
  max-height: 500px;
  border-radius: 0;
  overflow: hidden;
}
.hero-image {
  height: 100%;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.7));
}
.overlay-container {
  max-width: 1100px;
  margin-left: clamp(16px, 8vw, 120px);
  margin-bottom: clamp(40px, 8vh, 80px);
}
.slideshow-title {
  color: #fff;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: 0.015em;
  margin: 0 0 0.5rem 0;
}
.slideshow-subtitle {
  color: #fff;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 400;
  line-height: 1.4;
}
.hero-highlight {
  color: #ffffff;
}
.pdf-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
}
.pdf-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15) !important;
}
.certificate-image-wrapper {
  overflow: hidden;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}
.certificate-image {
  transition: transform 0.3s ease;
}
.pdf-card:hover .certificate-image {
  transform: scale(1.05);
}
</style>