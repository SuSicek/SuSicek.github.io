<template>
  <section class="references-page blue-rings-bg">
    <!-- Hero slideshow with overlay title/subtitle -->
    <v-sheet class="position-relative hero-shell" color="black">
      <v-carousel
        class="hero-carousel"
        v-model="currentSlide"
        hide-delimiters
        :show-arrows="false"
        cycle
        interval="6000"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-img :src="slide.src" cover :alt="slide.alt"></v-img>
        </v-carousel-item>
      </v-carousel>
      <div class="hero-overlay d-flex flex-column justify-end">
        <div class="overlay-container">
          <h1 class="slideshow-title">Naše <span class="hero-highlight">Reference</span></h1>
          <div class="slideshow-subtitle">Výběr z našich <span class="hero-highlight">realizací</span> a projektů.</div>
        </div>
      </div>
    </v-sheet>

    <!-- Filters with enlightening effect -->
    <section class="filters-section position-relative overflow-hidden">
      <!-- Background & Highlights -->
      <div class="filters-bg"></div>
      <div class="filters-highlights">
        <span class="orb orb-1"></span>
        <span class="orb orb-2"></span>
      </div>

      <v-container class="py-10 about-container position-relative z-1">
        <v-row class="mb-0" align="center">
          <v-col cols="12" md="4">
            <v-text-field 
              v-model="search" 
              prepend-inner-icon="mdi-magnify" 
              label="Hledat" 
              dense 
              hide-details 
              clearable
              variant="solo"
              flat
              class="filter-input"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select 
              v-model="selectedDivision" 
              :items="divisionItems" 
              label="Divize" 
              dense 
              hide-details 
              clearable
              variant="solo"
              flat
              class="filter-input"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select 
              v-model="selectedYear" 
              :items="yearItems" 
              label="Rok" 
              dense 
              hide-details 
              clearable
              variant="solo"
              flat
              class="filter-input"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- References Grid -->
    <v-container class="pb-12 about-container">
      <v-row>
        <v-col cols="12" md="4" v-for="refItem in pagedReferences" :key="refItem.id">
          <v-card class="ref-card h-100" :to="{ name: 'ReferenceDetail', params: { id: refItem.id } }" hover>
            <v-img :src="refItem.image" height="180" cover :alt="refItem.title" />
            <v-card-item>
              <v-card-title class="text-h6">{{ refItem.title }}</v-card-title>
              <v-card-subtitle>{{ refItem.division }} • {{ refItem.year }}</v-card-subtitle>
            </v-card-item>
            <v-card-text>{{ refItem.short }}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn variant="text" color="primary" :to="{ name: 'ReferenceDetail', params: { id: refItem.id } }">
                Detail
                <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="!pagedReferences.length" class="text-center py-12">
          <v-icon size="48" color="grey-darken-2" class="mb-3">mdi-file-search-outline</v-icon>
          <div class="text-h6 mb-1">Nenalezeny žádné reference</div>
          <div class="text-body-2">Zkuste změnit filtr nebo vyhledávání.</div>
        </v-col>
      </v-row>

      <!-- Pagination -->
      <v-row class="mt-8" justify="center" v-if="pages > 1">
        <v-pagination v-model="page" :length="pages" color="primary" total-visible="7" />
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReferences, divisionKeyToName } from '../composables/useReferences'

// Shared references source
const { references } = useReferences()

// Hero carousel
const currentSlide = ref(0)
const slides = [
  { src: '/fotky/trubkyvykop.png', alt: 'Trubky výkop' },
  { src: '/fotky/modrozlutakotelna.png', alt: 'Modrožlutá kotelna' },
  { src: '/fotky/sedetrubky.png', alt: 'Sedé trubky' },
  { src: '/fotky/energetika.png', alt: 'Energetika' }
]

// Filters
const search = ref('')
const selectedDivision = ref(null)
const selectedYear = ref(null)

const divisionItems = computed(() => ['Všechny', ...Array.from(new Set(references.value.map(r => r.division)))])
const yearItems = computed(() => Array.from(new Set(references.value.map(r => r.year))).sort((a,b) => b-a))

// Pagination
const page = ref(1)
const perPage = 6

const filtered = computed(() => {
  return references.value.filter(r => (
    (!search.value || r.title.toLowerCase().includes(search.value.toLowerCase())) &&
    (!selectedDivision.value || selectedDivision.value === 'Všechny' || r.division === selectedDivision.value) &&
    (!selectedYear.value || r.year === selectedYear.value)
  ))
})

const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const pagedReferences = computed(() => {
  const start = (page.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

watch([search, selectedDivision, selectedYear], () => { page.value = 1 })

// Preselect division from query (?division=Stavba or ?division=stavba)
const route = useRoute()
const router = useRouter()

const applyDivisionFromQuery = () => {
  const q = route.query.division
  if (!q || Array.isArray(q)) return
  const raw = q.toString().toLowerCase()
  if (['all','vse','vsechny'].includes(raw)) {
    selectedDivision.value = 'Všechny'
    return
  }
  let candidate = q
  const slug = raw
  if (['energetika', 'stavba', 'tzb'].includes(slug)) {
    candidate = divisionKeyToName(slug)
  }
  if (divisionItems.value.includes(candidate)) {
    selectedDivision.value = candidate
  }
}

watch(() => route.query.division, applyDivisionFromQuery, { immediate: true })

// When user picks 'Všechny', remove division from query for clean URL
watch(selectedDivision, (val) => {
  if (val === 'Všechny') {
    if (route.query.division) {
      const q = { ...route.query }
      delete q.division
      router.replace({ name: 'References', query: q })
    }
  } else if (val && route.query.division !== val) {
    router.replace({ name: 'References', query: { ...route.query, division: val } })
  }
})
</script>

<style scoped>
.hero-shell {
  min-height: 520px;
  height: clamp(520px, 75vh, 720px);
  border-radius: 0;
  overflow: hidden;
}
.hero-shell :deep(.v-carousel),
.hero-shell :deep(.v-window),
.hero-shell :deep(.v-carousel-item),
.hero-shell :deep(.v-img) {
  height: 100% !important;
}
.hero-carousel {
  height: 100%;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3));
}
.overlay-container {
  max-width: 1100px;
  margin-left: clamp(16px, 8vw, 120px);
  margin-bottom: clamp(40px, 8vh, 80px);
}
.slideshow-title {
  color: #fff;
  font-size: clamp(3.2rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: 0.015em;
  margin: 0 0 0.8rem 0;
}
.slideshow-subtitle {
  color: #fff;
  font-size: clamp(1.4rem, 2.8vw, 2.2rem);
  font-weight: 600;
  line-height: 1.3;
}
.hero-highlight {
  color: #ffffff;
}

@media (max-width: 960px) {
  .hero-shell {
    height: clamp(460px, 70vh, 640px);
  }
}

@media (max-width: 600px) {
  .hero-shell {
    height: clamp(420px, 65vh, 520px);
  }
  .hero-shell :deep(.v-carousel),
  .hero-shell :deep(.v-window),
  .hero-shell :deep(.v-carousel-item),
  .hero-shell :deep(.v-img) {
    min-height: 420px;
  }
  .overlay-container {
    margin-left: clamp(16px, 5vw, 32px);
    margin-bottom: clamp(24px, 8vh, 48px);
  }
  .slideshow-title {
    font-size: clamp(2.2rem, 9vw, 3rem);
  }
  .slideshow-subtitle {
    font-size: clamp(1rem, 5vw, 1.4rem);
    line-height: 1.2;
  }
}

.about-container { width: 75%; max-width: 1700px; margin: 0 auto; }
@media (max-width: 1280px){ .about-container { width: 92%; } }
@media (max-width: 960px){ .about-container { width: 100%; } }
.references-page { background: #fff; }

.ref-card { transition: box-shadow .3s, transform .3s; border-radius: 18px; }
.ref-card:hover { transform: translateY(-4px); box-shadow: 0 10px 26px -6px rgba(0,0,0,0.25); }
.ref-card .v-img__img { transition: transform .6s ease; }
.ref-card:hover .v-img__img { transform: scale(1.06); }

/* Filters Section with Enlightening Effect */
.filters-section {
  position: relative;
  background-color: #031f68;
}
.filters-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #031f68 0%, #1E3A8A 100%);
  z-index: 0;
}
.filters-highlights {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}
.filters-highlights .orb {
  position: absolute;
  border-radius: 50%;
  background-repeat: no-repeat;
  mix-blend-mode: overlay;
  opacity: 0.9;
  animation: subtlePulse 5s ease-in-out infinite;
}
.filters-highlights .orb-1 {
  top: -30%; left: -10%; width: 600px; height: 600px;
  background: radial-gradient(circle at 50% 50%, rgba(180,220,255,0.3) 0%, rgba(180,220,255,0.1) 40%, transparent 70%);
}
.filters-highlights .orb-2 {
  bottom: -30%; right: -5%; width: 500px; height: 500px;
  background: radial-gradient(circle at 50% 50%, rgba(150,200,255,0.25) 0%, rgba(150,200,255,0.08) 40%, transparent 70%);
}
.z-1 { position: relative; z-index: 1; }

@keyframes subtlePulse {
  0% { opacity: 0.7; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1.02); }
  100% { opacity: 0.7; transform: scale(0.98); }
}

/* Filter inputs - Light theme on dark background */
.filter-input :deep(.v-field) {
  background-color: rgba(255, 255, 255, 0.95) !important;
  color: #031f68 !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-radius: 8px;
  transition: all 0.3s ease;
}
.filter-input :deep(.v-field):hover {
  background-color: #ffffff !important;
}
.filter-input :deep(.v-field__input) {
  color: #031f68 !important;
  font-weight: 600;
}
.filter-input :deep(.v-label) {
  color: #475569 !important;
  font-weight: 500;
}
.filter-input :deep(.v-icon) {
  color: #031f68 !important;
  opacity: 0.8;
}
.filter-input :deep(.v-field--focused .v-label) {
  color: #031f68 !important;
}

@media (max-width: 960px){
  .hero-title { font-size: clamp(2rem,6vw,3rem); }
}
</style>