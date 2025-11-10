<template>
  <section class="reference-detail">
    <!-- Hero with slightly darkened image background -->
    <v-sheet class="ref-detail-hero d-flex align-end" height="40vh" color="black">
      <v-img :src="reference.image" cover class="hero-bg" />
      <div class="ref-hero-overlay d-flex align-end">
        <div class="hero-inner about-container">
          <h1 class="hero-title">{{ reference.title }}</h1>
          <div class="hero-sub">{{ reference.division }} • {{ reference.year }}</div>
        </div>
      </div>
    </v-sheet>

    <v-container class="py-10 about-container ref-detail">
      <v-breadcrumbs :items="breadcrumbs" class="pa-10 mb-4" />
    <v-row>
      <v-col cols="12" md="7">
        <h1 class="text-h5 text-md-h4 font-weight-bold mb-3">{{ reference.title }}</h1>
        <p class="text-body-1 mb-6">{{ reference.long }}</p>
        <v-divider class="my-4" />
        <div class="text-body-2 grey--text">Divize: <strong>{{ reference.division }}</strong> • Rok: <strong>{{ reference.year }}</strong></div>
      </v-col>
      <v-col cols="12" md="5">
        <v-card class="pa-4 mb-4" elevation="2">
          <h2 class="text-h6 font-weight-bold mb-3">Klíčové parametry</h2>
          <v-list density="compact" class="py-0">
            <v-list-item v-for="(p, i) in reference.params" :key="i" :title="p.label" :subtitle="p.value"></v-list-item>
          </v-list>
        </v-card>
        <v-card class="pa-4" elevation="2">
          <h2 class="text-h6 font-weight-bold mb-3">Technologie & řešení</h2>
          <ul class="tech-list">
            <li v-for="(t,i) in reference.tech" :key="i">{{ t }}</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-8" />

    <!-- Gallery -->
    <h2 class="text-h6 font-weight-bold mb-4">Galerie</h2>
    <v-row>
      <v-col cols="6" md="3" v-for="(img, i) in gallery" :key="i">
        <v-img :src="img" height="140" cover class="rounded-lg ref-thumb" @click="openPreview(img)" />
      </v-col>
    </v-row>

    <v-dialog v-model="preview" max-width="900">
      <v-card class="pa-2">
        <v-img :src="selectedImage" height="70vh" cover class="rounded-lg" />
      </v-card>
    </v-dialog>
    </v-container>
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
.ref-detail { padding-top: 24px; }
@media (min-width: 960px){ .ref-detail { padding-top: 40px; } }
.tech-list { margin:0; padding-left:1.1rem; }
.tech-list li { margin:4px 0; line-height:1.5; }
.ref-thumb { cursor: pointer; transition: transform .3s ease, box-shadow .3s ease; }
.ref-thumb:hover { transform: translateY(-3px); box-shadow: 0 10px 24px -10px rgba(0,0,0,0.35); }

/* Hero */
.ref-detail-hero { position: relative; overflow: hidden; }
.ref-detail-hero .hero-bg { filter: brightness(0.7); }
.ref-hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.45)); }
.hero-inner { position: relative; padding-bottom: 20px; }
.hero-title { color:#fff; font-size: clamp(2rem,4.2vw,3.2rem); font-weight: 800; margin:0 0 .4rem; }
.hero-sub { color:#e5edf5; font-size: clamp(.95rem,1.4vw,1.1rem); }
</style>
