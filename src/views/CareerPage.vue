<template>
  <section class="career-page blue-rings-bg">
    <!-- Hero -->
    <v-sheet class="career-hero position-relative" height="85vh" max-height="900" color="grey-darken-4">
      <v-img 
        src="/fotky/dronBrno.png" 
        cover 
        class="h-100"
        gradient="to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 100%"
      >
        <div class="d-flex flex-column fill-height justify-center align-center text-center text-white px-4">
            <v-slide-y-transition appear>
                <div class="hero-content" style="max-width: 1000px;">
                    <h1 class="text-h3 text-md-h1 font-weight-black mb-6 text-white" style="line-height: 1.1; text-shadow: 2px 2px 8px rgba(0,0,0,0.6);">
                        Kariéra
                    </h1>
                    <p class="text-h6 text-md-h4 font-weight-light mb-10 opacity-90 mx-auto" style="max-width: 800px; line-height: 1.6; text-shadow: 1px 1px 4px rgba(0,0,0,0.8);">
                        Od stavby po energetiku. Nabízíme stabilitu, fajn kolektiv a projekty, na které budete hrdí.
                    </p>
                    
                    <div class="d-flex flex-column flex-sm-row justify-center align-center gap-4">
                        <v-btn 
                            color="primary" 
                            size="x-large" 
                            class="px-10 text-body-1 font-weight-bold elevation-6 rounded-pill" 
                            height="64"
                            href="#jobs"
                        >
                            <v-icon start icon="mdi-magnify" class="mr-2"></v-icon>
                            Najít pozici
                        </v-btn>
                        
                        <v-btn
                           variant="outlined" 
                           color="white" 
                           size="x-large" 
                           class="px-10 text-body-1 font-weight-bold ml-sm-6 mt-4 mt-sm-0 rounded-pill backdrop-blur"
                           height="64"
                           style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-width: 2px;"
                           :to="{ name: 'AboutUs' }"
                        >
                           Poznat firmu
                        </v-btn>
                    </div>
                </div>
            </v-slide-y-transition>
        </div>
      </v-img>
      
      <!-- Scroll indicator -->
      <div class="position-absolute w-100 text-center hero-scroll-indicator" style="bottom: 40px; left: 0; opacity: 0.7;">
         <v-icon color="white" size="40">mdi-chevron-down</v-icon>
      </div>
    </v-sheet>

  <!-- Redesigned Intro / Why section -->
  <v-container class="py-16 about-container">
    <v-row justify="center" class="text-center mb-16">
      <v-col cols="12" md="10">
        <div class="text-overline font-weight-black text-primary mb-3" style="font-size: 1rem !important; letter-spacing: 2px !important;">PŘIDEJTE SE K NÁM</div>
        <h2 class="text-h3 text-md-h2 font-weight-black mb-8" style="line-height: 1.2;">Proč s námi pracovat?</h2>
        <p class="text-h5 font-weight-regular text-medium-emphasis mx-auto" style="max-width: 900px; line-height: 1.6;">
          Už více než 30 let tvoříme hodnoty, které přetrvávají. Naším největším bohatstvím však nejsou stavby, ale <strong>lidé, kteří jim vdechují život.</strong>
        </p>
      </v-col>
    </v-row>

    <!-- Key Benefits Cards - Redesigned -->
    <v-row class="mb-16">
      <v-col cols="12" md="4" class="d-flex mb-6 mb-md-0">
        <v-card class="benefit-card pa-8 w-100 d-flex flex-column" elevation="4" rounded="xl">
          <div class="mb-6">
             <v-avatar color="primary" variant="flat" size="72" class="rounded-lg elevation-2">
                <v-icon color="white" size="36">mdi-account-group</v-icon>
             </v-avatar>
          </div>
          <h3 class="text-h4 font-weight-bold mb-4 text-blue-dark">Tým odborníků</h3>
          <p class="text-h6 font-weight-light text-medium-emphasis flex-grow-1" style="line-height: 1.6;">
            Staňte se součástí kolektivu zkušených profesionálů v oboru TZB, energetiky a stavitelství. Sdílíme know-how a táhneme za jeden provaz.
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="d-flex mb-6 mb-md-0">
        <v-card class="benefit-card pa-8 w-100 d-flex flex-column" elevation="4" rounded="xl">
          <div class="mb-6">
             <v-avatar color="primary" variant="flat" size="72" class="rounded-lg elevation-2">
                <v-icon color="white" size="36">mdi-trending-up</v-icon>
             </v-avatar>
          </div>
          <h3 class="text-h4 font-weight-bold mb-4 text-blue-dark">Růst a budoucnost</h3>
          <p class="text-h6 font-weight-light text-medium-emphasis flex-grow-1" style="line-height: 1.6;">
            Podporujeme osobní i kariérní rozvoj. U nás máte prostor ukázat, co ve vás je, a růst společně s celou firmou.
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="d-flex mb-6 mb-md-0">
        <v-card class="benefit-card pa-8 w-100 d-flex flex-column" elevation="4" rounded="xl">
          <div class="mb-6">
             <v-avatar color="primary" variant="flat" size="72" class="rounded-lg elevation-2">
                <v-icon color="white" size="36">mdi-shield-check</v-icon>
             </v-avatar>
          </div>
          <h3 class="text-h4 font-weight-bold mb-4 text-blue-dark">Jistota a stabilita</h3>
          <p class="text-h6 font-weight-light text-medium-emphasis flex-grow-1" style="line-height: 1.6;">
            Jsme finančně zdravá česká firma s tradicí. Plníme své sliby vůči klientům i zaměstnancům a sázíme na férové jednání.
          </p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Call to action -->
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-btn color="primary" size="x-large" to="/contact-us" class="px-12 py-6 text-h6 font-weight-bold rounded-pill elevation-6" height="auto">
          Napište nám
          <v-icon end class="ml-3" size="large">mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

    <!-- Redesigned Atmosphere section -->
    <section class="atmosphere-section py-16" style="background-color: #fafafa;">
      <v-container class="about-container">
        <!-- Header -->
        <v-row justify="center" class="mb-12">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <h2 class="text-h3 font-weight-black mb-6 primary--text">Proč je lidem u nás dobře</h2>
            <p class="text-h6 font-weight-regular text-medium-emphasis mx-auto" style="max-width: 900px; line-height: 1.7;">
              Společně držíme stabilní kurz, plníme sliby a navzájem se podporujeme. Nahlédněte do momentů, které vystihují náš tým – od každodenní práce až po společné zážitky.
            </p>
          </v-col>
        </v-row>

        <!-- Interactive Content -->
        <v-row class="mt-4 align-center">
          <!-- Left: Enhanced clickable list -->
          <v-col cols="12" md="5" class="d-flex flex-column mb-6 mb-md-0">
            <v-card class="pa-2 h-100 d-flex flex-column justify-center" elevation="0" color="transparent">
              <v-list class="atmo-list bg-transparent" density="comfortable">
                <v-list-item
                  v-for="(item, i) in atmosphere"
                  :key="i"
                  :active="activeAtmosphere === i"
                  @click="activeAtmosphere = i"
                  class="mb-3 py-4 pl-4 pr-6 atmo-item elevation-2"
                  rounded="lg"
                  :class="{'atmo-item-active': activeAtmosphere === i}"
                >
                  <template #prepend>
                    <v-avatar :color="activeAtmosphere === i ? 'white' : 'grey-lighten-4'" size="48" class="mr-4 atmo-icon-bg">
                       <v-icon :color="activeAtmosphere === i ? 'primary' : 'grey-darken-1'" size="28">
                         {{ item.icon }}
                       </v-icon>
                    </v-avatar>
                  </template>
                  
                  <v-list-item-title class="text-h6 font-weight-bold mb-0" :class="activeAtmosphere === i ? 'text-white' : 'text-grey-darken-3'">
                    {{ item.title }}
                  </v-list-item-title>
                  
                  <template #append>
                    <v-icon :color="activeAtmosphere === i ? 'white' : 'grey-lighten-1'">
                      mdi-chevron-right
                    </v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <!-- Right: Clean image display -->
          <v-col cols="12" md="7">
            <div class="pa-2">
              <v-card class="atmo-image-wrap rounded-xl overflow-hidden elevation-6" height="520">
                <!-- Montage view for "Stabilní zázemí" -->
                <div v-if="atmosphere[activeAtmosphere].type === 'montage'" class="montage-container h-100 position-relative">
                   <div class="montage-bg h-100 w-100 position-absolute" :style="{ backgroundImage: `url(${atmosphere[activeAtmosphere].images[0]})`, filter: 'blur(20px) brightness(0.7)' }"></div>
                   <div class="montage-images h-100 w-100 position-relative d-flex align-center justify-center">
                      <v-img 
                        v-for="(img, idx) in atmosphere[activeAtmosphere].images" 
                        :key="idx"
                        :src="img"
                        class="montage-img elevation-10 rounded-lg"
                        :class="`montage-img-${idx}`"
                        cover
                      ></v-img>
                   </div>
                   <div class="image-overlay d-flex align-end pa-8" style="z-index: 5;">
                      <div>
                        <h3 class="text-h4 font-weight-bold mb-2">{{ atmosphere[activeAtmosphere].title }}</h3>
                        <p class="text-h6 font-weight-regular">{{ atmosphere[activeAtmosphere].text }}</p>
                      </div>
                    </div>
                </div>

                <!-- Slideshow view for "Férové jednání" -->
                <div v-else-if="atmosphere[activeAtmosphere].type === 'slideshow'" class="h-100 position-relative">
                    <v-carousel 
                      cycle 
                      height="100%" 
                      hide-delimiter-background
                      show-arrows="hover"
                      interval="3000"
                    >
                      <v-carousel-item
                        v-for="(img, i) in atmosphere[activeAtmosphere].images"
                        :key="i"
                        :src="img"
                        cover
                      ></v-carousel-item>
                    </v-carousel>
                    <div class="image-overlay d-flex align-end pa-8 position-absolute w-100 h-100" style="z-index: 5; top: 0; left: 0; pointer-events: none; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%);">
                      <div class="text-white">
                        <h3 class="text-h4 font-weight-bold mb-2">{{ atmosphere[activeAtmosphere].title }}</h3>
                        <p class="text-h6 font-weight-regular">{{ atmosphere[activeAtmosphere].text }}</p>
                      </div>
                    </div>
                </div>

                <!-- Standard single image view -->
                <v-img
                  v-else
                  :src="atmosphere[activeAtmosphere].image"
                  height="100%"
                  cover
                  class="atmo-image transition-swing"
                >
                    <div class="image-overlay d-flex align-end pa-8">
                      <div>
                        <h3 class="text-h4 font-weight-bold mb-2">{{ atmosphere[activeAtmosphere].title }}</h3>
                        <p class="text-h6 font-weight-regular">{{ atmosphere[activeAtmosphere].text }}</p>
                      </div>
                    </div>
                    <template #placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                        </div>
                    </template>
                </v-img>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

  <!-- Benefits section -->
  <v-container class="py-16 about-container">
      <v-row class="mb-8" justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="benefits-heading font-weight-bold mb-2">S čím můžete počítat?</h2>
          <p class="text-body-2 text-medium-emphasis mb-0">Benefity a podpora pro naše zaměstnance</p>
        </v-col>
      </v-row>
      <v-row class="benefits-grid">
        <v-col cols="12" sm="6" md="3" v-for="(b, i) in benefits" :key="i" class="benefit-item text-center">
          <v-icon size="42" color="primary" class="mb-3 benefit-icon">{{ b.icon }}</v-icon>
          <div class="benefit-title font-weight-bold mb-1">{{ b.title }}</div>
          <div class="benefit-text text-body-2 text-medium-emphasis">{{ b.text }}</div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Open positions with image background -->
    <v-sheet id="jobs" class="jobs-section py-14" :style="{ backgroundImage: `url(${jobsBackground})` }">
      <div class="jobs-overlay"></div>
      <v-container class="about-container position-relative">
        <v-row class="mb-8" justify="center">
          <v-col cols="12" class="text-center">
            <h2 class="text-h3 font-weight-black mb-2 text-uppercase text-white">Aktuálně hledáme</h2>
          </v-col>
        </v-row>
        
        <!-- Filters -->
        <v-row justify="center" class="mb-10">
          <v-col cols="12" lg="10">
            <v-card class="pa-6 rounded-xl" elevation="6">
              <v-row align="center" dense>
                <v-col cols="12">
                   <div class="text-subtitle-1 font-weight-bold text-grey-darken-2 mb-4 d-flex align-center">
                      <v-icon color="primary" class="mr-2">mdi-filter-variant</v-icon>
                      Filtrovat pozice
                   </div>
                </v-col>
                <v-col cols="12" md="5">
                  <v-autocomplete
                    v-model="selectedDivision"
                    :items="uniqueDivisions"
                    label="Všechny divize"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    hide-details
                    prepend-inner-icon="mdi-domain"
                    color="primary"
                    placeholder="Vyberte divizi"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="5">
                  <v-autocomplete
                    v-model="selectedLocation"
                    :items="uniqueLocations"
                    label="Všechny lokality"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    hide-details
                    prepend-inner-icon="mdi-map-marker"
                    color="primary"
                    placeholder="Vyberte lokalitu"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" class="d-flex justify-md-center mt-4 mt-md-0">
                   <v-tooltip location="top" text="Vhodné pro studenty a absolventy">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          :color="onlyStudents ? 'success' : 'grey-lighten-2'"
                          :variant="onlyStudents ? 'elevated' : 'flat'"
                          @click="onlyStudents = !onlyStudents"
                          prepend-icon="mdi-school"
                          height="56"
                          width="100%"
                          class="student-toggle-btn"
                        >
                          Pro studenty
                        </v-btn>
                      </template>
                   </v-tooltip>
                </v-col>
              </v-row>
              
               <!-- Active Filters Chips -->
               <div class="mt-4 d-flex flex-wrap gap-2" v-if="selectedDivision || selectedLocation || onlyStudents">
                  <v-chip v-if="selectedDivision" closetable @click:close="selectedDivision = null" color="primary" variant="tonal" class="mr-2 mb-2">
                    Divize: {{ selectedDivision }}
                  </v-chip>
                  <v-chip v-if="selectedLocation" closetable @click:close="selectedLocation = null" color="primary" variant="tonal" class="mr-2 mb-2">
                    Lokalita: {{ selectedLocation }}
                  </v-chip>
                  <v-chip v-if="onlyStudents" closetable @click:close="onlyStudents = false" color="success" variant="tonal" class="mb-2">
                     Vhodné pro studenty
                  </v-chip>
                  <v-btn variant="text" density="compact" color="error" size="small" @click="selectedDivision = null; selectedLocation = null; onlyStudents = false" class="ml-auto">
                    Vymazat vše
                  </v-btn>
               </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="text-center mb-8" v-if="filteredJobs.length === 0">
             <v-sheet class="pa-6 rounded-lg d-inline-block" color="rgba(255,255,255,0.9)">
                <v-icon size="48" color="grey" class="mb-2">mdi-magnify-remove-outline</v-icon>
                <div class="text-h6 text-grey-darken-2">Pro zadaná kritéria jsme nenašli žádné pozice.</div>
                <v-btn variant="text" color="primary" @click="selectedDivision = null; selectedLocation = null; onlyStudents = false" class="mt-2">Zrušit filtry</v-btn>
             </v-sheet>
          </v-col>

          <v-col cols="12" md="6" v-for="job in filteredJobs" :key="job.id">
            <v-card class="job-card mb-6" elevation="3">
              <div class="job-card-inner">
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <div class="job-title">{{ job.title }}</div>
                    <div class="job-meta mt-1">
                      <v-chip size="small" color="primary" variant="elevated" class="mr-2">
                        <v-icon start size="16">mdi-domain</v-icon>{{ job.division }}
                      </v-chip>
                      <v-chip size="small" variant="tonal" class="mr-2">
                        <v-icon start size="16">mdi-map-marker</v-icon>{{ job.location }}
                      </v-chip>
                      <v-chip v-if="job.suitableForStudents" size="small" color="success" variant="tonal">
                        <v-icon start size="16">mdi-school</v-icon>Vhodné pro studenty
                      </v-chip>
                    </div>
                  </div>
                  <v-btn color="primary" variant="elevated" :to="{ name: 'JobDetail', params: { id: job.id } }">
                    Detail
                    <v-icon end>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
                <p class="job-perex mt-4 mb-0">{{ job.perex }}</p>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- New Student Opportunities Card -->
        <v-row justify="center">
            <v-col cols="12" md="8">
              <v-card 
                class="student-card mt-12 mb-4 overflow-hidden" 
                elevation="4" 
                rounded="xl"
                color="white"
              >
                <div class="d-flex flex-column flex-md-row align-stretch">
                  <!-- Image Section (Left) -->
                  <div class="d-none d-md-block" style="width: 35%; min-height: 100%;">
                     <v-img 
                        src="/fotky/savrec.png" 
                        cover 
                        height="100%"
                      ></v-img>
                  </div>

                  <!-- Content Section (Right) -->
                  <div class="d-flex flex-column justify-center pa-8 pa-md-8" style="flex: 1;">
                    <div class="d-flex align-center mb-4">
                       <v-chip color="secondary" size="small" label class="font-weight-bold mb-2">PŘÍLEŽITOST</v-chip>
                    </div>

                    <h3 class="text-h4 font-weight-bold text-primary mb-4">
                      Studenti a absolventi
                    </h3>
                    
                    <p class="text-body-1 text-grey-darken-1 mb-8" style="line-height: 1.6;">
                      Nastartujte svou kariéru ještě při studiu. Nabízíme odborné stáže, brigády a vedení závěrečných prací. Učte se od profesionálů v praxi.
                    </p>
                    
                    <div>
                      <v-btn 
                        color="primary" 
                        variant="flat" 
                        size="large" 
                        :to="{ name: 'StudentOpportunities' }" 
                        class="px-8 rounded-pill"
                      >
                        Více informací
                        <v-icon end>mdi-arrow-right</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Job modal removed (moved to subpage) -->
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'
import { careerJobs } from '@/data/careerJobs.js'

const { mobile } = useDisplay()
const route = useRoute()
const router = useRouter()

const jobs = ref(careerJobs)

// Filters
const selectedDivision = ref(null)
const selectedLocation = ref(null)
const onlyStudents = ref(false)

const uniqueDivisions = computed(() => {
  const divs = new Set(jobs.value.map(j => j.division))
  return Array.from(divs).sort()
})

const uniqueLocations = computed(() => {
  const locs = new Set(jobs.value.map(j => j.location))
  return Array.from(locs).sort()
})

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const matchDivision = !selectedDivision.value || job.division === selectedDivision.value
    const matchLocation = !selectedLocation.value || job.location === selectedLocation.value
    const matchStudents = !onlyStudents.value || job.suitableForStudents
    return matchDivision && matchLocation && matchStudents
  })
})

// Application form state (removed as moved to subpage)
// Background image for jobs section (easy to change)
const jobsBackground = ref('/fotky/stavba3.png')

// Atmosphere items for the second section
const atmosphere = ref([
  {
    title: 'Stabilní zázemí',
    text: 'Jsme středně velká firma s více než 30letou tradicí.',
    image: '/fotky/dronBrno.png',
    images: ['/fotky/dronBrno.png', '/fotky/zdar.png'],
    type: 'slideshow',
    icon: 'mdi-shield-check'
  },
  {
    title: 'Férové jednání',
    text: 'Sliby plníme a za prací stojí odpovídající ohodnocení.',
    image: '/fotky/energetika.png',
    images: ['/fotky/energetika.png', '/fotky/energetika2.png', '/fotky/energetika3.png'],
    type: 'slideshow',
    icon: 'mdi-handshake'
  },
  {
    title: 'Přátelský kolektiv',
    text: 'Nejsme anonymní korporát, ale tým lidí, kteří drží při sobě.',
    image: '/fotky/prodejna.png',
    icon: 'mdi-account-group'
  },
  {
    title: 'Možnost růstu',
    text: 'Podporujeme profesní i osobní rozvoj.',
    image: '/fotky/stavba.png',
    icon: 'mdi-trending-up'
  },
  {
    title: 'Moderní zázemí',
    text: 'Kvalitní technické vybavení usnadňuje práci.',
    image: '/fotky/energetika.png',
    icon: 'mdi-office-building'
  },
  {
    title: 'Společné akce',
    text: 'Týmové aktivity a firemní akce posilují vztahy i atmosféru.',
    image: '/fotky/hory.png',
    images: ['/fotky/hory.png', '/fotky/bowling.png', '/fotky/jumppark.png'],
    type: 'montage',
    icon: 'mdi-account-multiple'
  }
])
const activeAtmosphere = ref(0)

// Benefits
const benefits = ref([
  { icon: 'mdi-account-group', title: 'FKSP', text: 'Fond kulturních a sociálních potřeb pro podporu zaměstnanců' },
  { icon: 'mdi-cash-multiple', title: 'Penzijní & životní pojištění', text: 'Příspěvek na penzijní a životní pojištění' },
  { icon: 'mdi-silverware-fork-knife', title: 'Příspěvek na stravování', text: 'Příspěvek na stravování formou stravenek' },
  { icon: 'mdi-baby-face-outline', title: 'Hlídání', text: 'Postaráme se o vaše děti během prázdnin' },
  { icon: 'mdi-beach', title: '5 týdnů dovolené', text: 'Dostatek času na odpočinek a regeneraci' },
  { icon: 'mdi-heart-plus', title: 'Pojištění odpovědnosti & úrazové', text: 'Pojištění odpovědnosti a úrazové pojištění pro zaměstnance' },
  { icon: 'mdi-book-open-page-variant-outline', title: 'Výuka cizích jazyků', text: 'Možnost vzdělávání v cizích jazycích' },
  { icon: 'mdi-cellphone', title: 'Smlouva s operátorem', text: 'Výhodné firemní tarify pro zaměstnance a jejich rodiny' },
])
</script>

<style scoped>
.career-page { background:#fff; }
.about-container { width: 75%; max-width: 1700px; margin: 0 auto; }
@media (max-width: 1280px){ .about-container { width: 92%; } }
@media (max-width: 960px){ .about-container { width: 100%; } }
.career-hero { position: relative; overflow: hidden; }
.career-hero .hero-bg { 
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: brightness(0.6); 
}
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55)); }
.hero-title { color:#fff; font-size: clamp(2.2rem,4.5vw,3.4rem); font-weight: 800; margin:0 0 .6rem; letter-spacing:.5px; }
.hero-sub { color:#e5edf5; font-size: clamp(1rem,1.6vw,1.25rem); max-width: 720px; }
.why-text { line-height: 1.65; color:#374151; }
.about-list { margin: 0 0 10px; padding-left: 1.05rem; }
.about-list li { margin: 6px 0; line-height: 1.6; color:#374151; }
.atmo-list :deep(.v-list-item--active) { background: rgba(3,31,104,0.08); border-left: 3px solid #031f68; }
.atmo-image-wrap { position: relative; overflow: hidden; }
.atmo-image { transition: transform .6s ease; width: 100%; height: 400px; object-fit: cover; }
.atmo-image-wrap:hover .atmo-image { transform: scale(1.04); }
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
}
.career-intro-title { font-size: clamp(2.4rem,5.2vw,3.6rem); line-height:1.1; letter-spacing:.5px; }
.intro-text { max-width: 900px; }
.benefits-grid { align-items: stretch; margin-top: 8px; }
.benefits-grid :deep(.v-col) { padding: 18px 22px; }
.benefit-item { padding: 36px 24px; }
.benefit-icon { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15)); }
.benefit-title { font-size: .95rem; letter-spacing:.3px; margin-bottom: 6px; }
.benefit-text { line-height:1.4; max-width: 260px; margin: 0 auto; }
.benefits-heading { font-size: clamp(2rem,4.8vw,3.1rem); letter-spacing:.6px; font-weight:800; }

/* Jobs section with background */
.jobs-section { position: relative; background-image: url('/fotky/stavba3.png'); background-size: cover; background-position: center; }
.jobs-overlay { position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.25)); }
.jobs-heading { color:#fff; font-size: clamp(2rem,4.6vw,3rem); letter-spacing:.4px; }

/* Job cards */
.job-card { background: rgba(255,255,255,0.94); backdrop-filter: saturate(1.1) blur(1px); border: 1px solid rgba(17,24,39,0.06); border-radius: 14px; transition: transform .2s ease, box-shadow .2s ease; }
.job-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.12); }
.job-card-inner { padding: 18px 20px; }
.job-title { font-weight: 800; font-size: 1.15rem; letter-spacing:.2px; color:#0c2b68; }
.job-perex { color:#374151; line-height: 1.55; }

/* Job modal */
.job-modal { border-radius: 14px; overflow:hidden; display: flex; flex-direction: column; }
.job-modal :deep(.v-window) { flex: 1; overflow-y: auto; }
.job-modal-header { display:flex; justify-content:space-between; align-items:center; padding: 16px 20px; background: #f6f9ff; border-bottom: 1px solid #e5edf5; }
.job-modal-title { font-weight: 800; color:#0c2b68; font-size: 1.25rem; letter-spacing:.3px; }

/* Atmosphere section styles */
.atmo-list {
    width: 100%;
    overflow: hidden; /* Prevent any horizontal scrollbars */
}
.atmo-item {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
    background-color: white;
}
.atmo-item:hover {
    transform: translateX(5px);
}
.atmo-item-active {
    background-color: #031f68 !important; /* Primary color */
    box-shadow: 0 4px 12px rgba(3, 31, 104, 0.3) !important;
    transform: scale(1.02);
    border: none;
}
.image-overlay.bg-gradient-to-t {
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
    position: absolute;
    inset: 0;
}

/* Montage Styles */
.montage-container {
    overflow: hidden;
}

.montage-img {
    position: absolute !important;
    width: 58% !important;
    height: 48% !important;
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    border: 6px solid white;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.montage-img-0 {
    top: 3%;
    left: 2%;
    z-index: 1;
    transform: rotate(-4deg);
}

.montage-img-1 {
    top: 8%;
    right: 2%;
    z-index: 2;
    transform: rotate(3deg);
}

.montage-img-2 {
    bottom: 22%;
    left: 21%;
    z-index: 3;
    transform: rotate(-2deg);
}

/* Hover effect - explode slightly */
.montage-container:hover .montage-img-0 {
    transform: translate(-10px, -10px) rotate(-6deg) scale(1.02);
}
.montage-container:hover .montage-img-1 {
    transform: translate(10px, -5px) rotate(5deg) scale(1.02);
}
.montage-container:hover .montage-img-2 {
    transform: translate(0, 5px) rotate(-4deg) scale(1.02);
}

.student-card {
    background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
    position: relative;
}

.student-card-bg {
    position: absolute;
    top: -50px;
    right: -50px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(3, 31, 104, 0.05) 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}
.hero-scroll-indicator i {
    animation: bounce 2s infinite;
}
@keyframes fadeInMove {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
.hero-content {
    animation: fadeInMove 1s ease-out forwards;
}
.backdrop-blur {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}
</style>