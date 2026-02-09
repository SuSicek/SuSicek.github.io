<template>
  <div class="reference-detail-page">
    <!-- Top Stripe: Navigation & Header Info -->
    <div class="ref-header-stripe position-relative">
      <v-container class="about-container position-relative">
        <!-- Breadcrumbs -->
        <v-breadcrumbs :items="breadcrumbs" class="px-0 py-0 mb-6 text-body-2 text-grey-lighten-2" density="compact">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right" size="small"></v-icon>
          </template>
        </v-breadcrumbs>

        <v-row align="end">
          <v-col cols="12" md="8">
            <div class="mb-2">
              <h1 class="text-h4 font-weight-bold text-white d-inline-block">{{ reference.title }}</h1>
            </div>
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
         <v-img :src="reference.image" cover height="500" class="rounded-xl elevation-3 mt-n8"></v-img>
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
          <v-sheet color="grey-lighten-4" class="pa-8 rounded-xl">
            <div class="d-flex align-start mb-8">
              <v-icon color="primary" icon="mdi-cash-multiple" size="large" class="mr-4 mt-1"></v-icon>
              <div>
                <div class="text-overline text-grey-darken-1 mb-1">Finanční objem</div>
                <div class="text-h5 font-weight-bold text-primary">{{ reference.price }}</div>
              </div>
            </div>
            
            <div class="d-flex align-start">
               <v-icon color="primary" icon="mdi-calendar-check" size="large" class="mr-4 mt-1"></v-icon>
               <div>
                <div class="text-overline text-grey-darken-1 mb-1">Rok realizace</div>
                <div class="text-h5 font-weight-bold text-primary">{{ reference.year }}</div>
               </div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>

      <v-divider class="my-12" />

      <!-- Gallery -->
      <div v-if="gallery && gallery.length > 0">
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
      </div>
    </v-container>

    <!-- Image Preview Modal -->
    <v-dialog v-model="preview" max-width="1200" scrim="black">
      <v-card class="bg-black">
        <v-toolbar density="compact" color="black">
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" color="white" @click="preview = false"></v-btn>
        </v-toolbar>
        <v-img :src="selectedImage" max-height="85vh" contain></v-img>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useReferences } from '../composables/useReferences'

const route = useRoute()
const { references } = useReferences()

const reference = computed(() => {
  const id = Number(route.params.id)
  return references.value.find(r => r.id === id) || references.value[0]
})

const breadcrumbs = computed(() => [
  { title: 'Domů', to: { name: 'Home' } },
  { title: 'Reference', to: { name: 'References' } },
  { title: reference.value ? reference.value.title : 'Detail', disabled: true }
])

const gallery = computed(() => {
  if (!reference.value) return []
  // If reference has specific images array, use it
  if (reference.value.images && reference.value.images.length) {
    return reference.value.images
  }
  return [] 
})

const preview = ref(false)
const selectedImage = ref('')

function openPreview(src){ selectedImage.value = src; preview.value = true }
</script>

<style scoped>
.reference-detail-page {
  background-color: #ffffff;
  min-height: 100vh;
}

.about-container { width: 75%; max-width: 1700px; margin:0 auto; }
@media (max-width:1280px){ .about-container { width:92%; } }
@media (max-width:960px){ .about-container { width:100%; } }

.ref-header-stripe {
  background-color: #031f68;
  /* Padding top reduced */
  padding-top: 110px !important; 
  padding-bottom: 20px !important;
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
