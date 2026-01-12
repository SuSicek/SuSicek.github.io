<template>
  <section class="reference-detail-page">
    <!-- Top Stripe: Navigation & Header Info -->
    <div class="ref-header-stripe position-relative py-8">
      <!-- Background Image with Overlay -->
      <div class="ref-stripe-bg">
        <v-img :src="reference.image" cover class="fill-height">
          <div class="fill-height" style="background: rgba(14, 25, 60, 0.85);"></div>
        </v-img>
      </div>

      <v-container class="about-container position-relative">
        <!-- Breadcrumbs -->
        <v-breadcrumbs :items="breadcrumbs" class="px-0 py-0 mb-6 text-body-2 text-grey-lighten-2" density="compact">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right" size="small"></v-icon>
          </template>
        </v-breadcrumbs>

        <v-row align="end">
          <v-col cols="12" md="8">
            <h1 class="text-h3 font-weight-bold text-white mb-2">{{ reference.title }}</h1>
            <div class="d-flex align-center text-subtitle-1 text-grey-lighten-4">
              <v-chip color="white" variant="flat" label size="small" class="mr-3 font-weight-bold text-primary text-uppercase">{{ reference.division }}</v-chip>
              <span class="text-h6 font-weight-regular">{{ reference.year }}</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Large Main Photo -->
    <div class="ref-main-photo">
      <v-container class="about-container py-0 pb-8">
         <v-img :src="reference.image" cover height="500" class="rounded-xl elevation-3 mt-n8" />
      </v-container>
    </div>

    <!-- Info Section: Description, Price, Year -->
    <v-container class="about-container py-12">
      <v-row>
        <!-- Description -->
        <v-col cols="12" md="8">
          <h2 class="text-h5 font-weight-bold mb-4 text-primary">Popis stavby</h2>
          <p class="text-body-1 text-grey-darken-3" style="line-height: 1.8;">
            {{ reference.long }}
          </p>
        </v-col>
        
        <!-- Key Data Side -->
        <v-col cols="12" md="4">
          <v-card variant="outlined" class="pa-6 rounded-lg" style="border-color: #e0e0e0;">
            <div class="mb-6">
              <div class="text-overline text-grey-darken-1 mb-1">Finanční objem</div>
              <div class="text-h4 font-weight-bold text-primary">{{ reference.price }}</div>
            </div>
            
            <div>
              <div class="text-overline text-grey-darken-1 mb-1">Rok realizace</div>
               <div class="text-h5 font-weight-bold text-primary">{{ reference.year }}</div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-12" />

      <!-- Gallery -->
      <h2 class="text-h4 font-weight-bold mb-8 text-center text-primary">Galerie</h2>
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="(img, i) in gallery" :key="i">
          <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props" class="gallery-card rounded-lg" :elevation="isHovering ? 8 : 2" @click="openPreview(img)">
              <v-img :src="img" height="260" cover class="transition-swing">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </div>
                </template>
                <div v-if="isHovering" class="gallery-overlay d-flex align-center justify-center">
                  <v-icon color="white" size="48">mdi-magnify-plus-outline</v-icon>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>

    <!-- Image Preview Modal -->
    <v-dialog v-model="preview" max-width="1200" scrim="black">
      <v-card class="bg-black">
        <v-toolbar density="compact" color="black">
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" color="white" @click="preview = false"></v-btn>
        </v-toolbar>
        <v-img :src="selectedImage" max-height="85vh" contain />
      </v-card>
    </v-dialog>

  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Reuse mock data from ReferencesPage (keep in sync or refactor to shared store later)
const mock = [
  {
    id: '1',
    title: 'Administrativní centrum Delta',
    division: 'Stavba',
    year: 2024,
    image: '/fotky/stavba.png',
    short: 'Komplexní výstavba admin centra, 8 000 m² podlahové plochy.',
    long: 'Projekt zahrnoval kompletní generální dodávku od zemních prací přes konstrukční systémy až po finální povrchy a technická zařízení budov. Důraz byl kladen na energetickou efektivitu, komfort uživatelů a flexibilitu prostor.',
    price: '120 mil. Kč',
    params: [
      { label: 'Podlahová plocha', value: '8 000 m²' },
      { label: 'Doba realizace', value: '14 měsíců' },
      { label: 'Energetická třída', value: 'A' }
    ],
    tech: ['Prefabrikované konstrukce', 'Energeticky úsporné fasády', 'Inteligentní řízení HVAC']
  },
  {
    id: '2',
    title: 'Modernizace kotelny EnergoPlant',
    division: 'Energetika',
    year: 2023,
    image: '/fotky/energetika.png',
    short: 'Instalace vysoce účinných kotlů a optimalizace distribuce.',
    long: 'Modernizace zahrnovala výměnu zastaralých kotlů za vysokoučinné jednotky, optimalizaci rozvodů tepla a implementaci systému pro vzdálený monitoring a řízení výkonu.',
    price: '45 mil. Kč',
    params: [
      { label: 'Instalovaný výkon', value: '5 MW' },
      { label: 'Úspora energie', value: '23 % ročně' },
      { label: 'Snížení emisí', value: '18 % CO₂' }
    ],
    tech: ['Kondenzační kotle', 'Optimalizace rozvodů', 'Systém vzdáleného monitoringu']
  }
]

const route = useRoute()
const reference = computed(() => mock.find(r => r.id === route.params.id) || mock[0])

const breadcrumbs = computed(() => [
  { title: 'Domů', to: { name: 'Home' } },
  { title: 'Reference', to: { name: 'References' } },
  { title: reference.value.title, disabled: true }
])

// Simple randomized gallery per project from available reference images
const galleryPool = [
  '/fotky/references/stavba.png',
  '/fotky/references/energetika.png',
  '/fotky/references/prodejna.png',
  '/fotky/references/tzb.png'
]
const gallery = ref([])
const preview = ref(false)
const selectedImage = ref('')

function openPreview(src){ selectedImage.value = src; preview.value = true }

onMounted(() => {
  // pick up to 4 random distinct images
  const pool = [...galleryPool]
  const picks = []
  while (pool.length && picks.length < 4) {
    const idx = Math.floor(Math.random() * pool.length)
    picks.push(pool.splice(idx, 1)[0])
  }
  gallery.value = picks
})
</script>

<style scoped>
.about-container { width: 75%; max-width: 1700px; margin:0 auto; }
@media (max-width:1280px){ .about-container { width:92%; } }
@media (max-width:960px){ .about-container { width:100%; } }

.ref-header-stripe {
  /* Padding top added to clear fixed header if necessary, depending on global layout */
  padding-top: 140px !important; 
}
.ref-stripe-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
@media (max-width: 960px) {
    .ref-header-stripe {
        padding-top: 100px !important;
    }
}

.gallery-card {
    cursor: pointer;
    overflow: hidden;
}
.gallery-overlay {
    position: absolute;
    inset: 0;
    background: rgba(3, 31, 104, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease;
}
.v-card:hover .gallery-overlay {
    opacity: 1;
}
</style>
