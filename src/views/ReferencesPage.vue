<template>
  <section class="references-page">
    <!-- Hero / Header -->
    <v-sheet class="ref-hero d-flex align-center" height="42vh" color="black">
      <v-img src="/fotky/references/back.png" cover class="hero-bg" />
      <div class="ref-hero-overlay d-flex align-center">
        <div class="hero-inner about-container">
          <h1 class="hero-title">Reference</h1>
          <p class="hero-sub">Výběr z našich realizací a projektů.</p>
        </div>
      </div>
    </v-sheet>

    <!-- Filters -->
    <v-container class="py-6 about-container">
      <v-row class="mb-4" align="center">
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
.about-container { width: 75%; max-width: 1700px; margin: 0 auto; }
@media (max-width: 1280px){ .about-container { width: 92%; } }
@media (max-width: 960px){ .about-container { width: 100%; } }
.references-page { background: #fff; }
.ref-hero { position: relative; overflow: hidden; }
.ref-hero .hero-bg { filter: brightness(0.55); }
.ref-hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.55)); }
.hero-inner { position: relative; }
.hero-title { color:#fff; font-size: clamp(2.2rem,4.5vw,3.4rem); font-weight: 800; margin:0 0 .6rem; letter-spacing:.5px; }
.hero-sub { color:#e5edf5; font-size: clamp(1rem,1.6vw,1.25rem); max-width: 680px; }

.ref-card { transition: box-shadow .3s, transform .3s; border-radius: 18px; }
.ref-card:hover { transform: translateY(-4px); box-shadow: 0 10px 26px -6px rgba(0,0,0,0.25); }
.ref-card .v-img__img { transition: transform .6s ease; }
.ref-card:hover .v-img__img { transform: scale(1.06); }

/* Darker blueish filter inputs - using primary color from header */
.filter-input :deep(.v-field) {
  background-color: #031f68 !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  border-radius: 8px;
}
.filter-input :deep(.v-field__input) {
  color: #ffffff;
  font-weight: 500;
}
.filter-input :deep(.v-label) {
  color: #cce0f5;
  font-weight: 500;
}
.filter-input :deep(.v-icon) {
  color: #cce0f5;
}
.filter-input :deep(.v-field--focused .v-label),
.filter-input :deep(.v-field--focused .v-icon) {
  color: #ffffff;
}

@media (max-width: 960px){
  .hero-title { font-size: clamp(2rem,6vw,3rem); }
}
</style>