<template>
  <section class="career-page">
    <!-- Hero -->
    <v-sheet class="career-hero d-flex align-center" height="42vh" color="black">
      <v-img src="/fotky/stavba.png" cover class="hero-bg" />
      <div class="hero-overlay d-flex align-center">
        <div class="hero-inner about-container">
          <h1 class="hero-title">Kariéra</h1>
          <p class="hero-sub">Přidejte se k našemu týmu odborníků a budujte s námi projekty, které dávají smysl.</p>
        </div>
      </div>
    </v-sheet>

  <!-- Intro / Why section (centered) -->
  <v-container class="py-16 about-container">
      <v-row justify="center" class="text-center">
        <v-col cols="12" md="10" lg="9">
          <h2 class="career-intro-title font-weight-bold mb-5">Proč pracovat zrovna u nás?</h2>
          <p class="text-body-1 why-text mx-auto intro-text">
            Stavíme už víc než 30 let – ale naši největší hodnotou nejsou stavby, nýbrž lidé, kteří je tvoří. Jsme tým odborníků a rádi mezi sebe přijmeme další kolegy,
            kteří chtějí být součástí firmy a chtějí růst spolu s námi.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Atmosphere section -->
    <v-container class="py-8 about-container">
      <v-row>
        <v-col cols="12" class="mb-4">
          <h2 class="text-h6 text-md-h5 font-weight-bold mb-2">Proč je lidem u nás dobře</h2>
          <p class="text-body-1 why-text mb-0">Poznejte atmosféru UCHYTIL</p>
          <p class="text-body-2 text-medium-emphasis mt-1">
            Společně držíme stabilní kurz, plníme sliby a navzájem se podporujeme. Klikněte na jednotlivé oblasti a nahlédněte do momentů, které vystihují náš tým – od každodenní práce až po společné zážitky.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <!-- Left: clickable subtitles -->
        <v-col cols="12" md="6">
          <v-list class="atmo-list" density="comfortable">
            <v-list-item
              v-for="(item, i) in atmosphere"
              :key="i"
              :title="item.title"
              :subtitle="item.text"
              :active="activeAtmosphere === i"
              @click="activeAtmosphere = i"
            >
              <template #append>
                <v-icon color="primary" v-if="activeAtmosphere === i">mdi-chevron-right</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
        <!-- Right: image changes on click -->
        <v-col cols="12" md="6">
          <v-sheet class="atmo-image-wrap" rounded="lg" elevation="2">
            <v-img :src="atmosphere[activeAtmosphere].image" height="360" cover class="rounded-lg atmo-image" />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

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
    <v-sheet class="jobs-section py-14" :style="{ backgroundImage: `url(${jobsBackground})` }">
      <div class="jobs-overlay"></div>
      <v-container class="about-container position-relative">
        <v-row class="mb-8" justify="center">
          <v-col cols="12" class="text-center">
            <h2 class="jobs-heading font-weight-bold mb-2">Aktuálně hledáme</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" v-for="job in jobs" :key="job.id">
            <v-card class="job-card mb-6" elevation="3">
              <div class="job-card-inner">
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <div class="job-title">{{ job.title }}</div>
                    <div class="job-meta mt-1">
                      <v-chip size="small" color="primary" variant="elevated" class="mr-2">
                        <v-icon start size="16">mdi-domain</v-icon>{{ job.division }}
                      </v-chip>
                      <v-chip size="small" variant="tonal">
                        <v-icon start size="16">mdi-map-marker</v-icon>{{ job.location }}
                      </v-chip>
                    </div>
                  </div>
                  <v-btn color="primary" variant="elevated" @click="openJob(job)">
                    Detail
                    <v-icon end>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
                <p class="job-perex mt-4 mb-0">{{ job.perex }}</p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Job modal redesigned -->
    <v-dialog v-model="jobDialog" max-width="900">
      <v-card class="job-modal">
        <div class="job-modal-header">
          <div>
            <div class="job-modal-title">{{ activeJob?.title }}</div>
            <div class="job-modal-meta mt-1">
              <v-chip size="small" color="primary" class="mr-2">
                <v-icon start size="16">mdi-domain</v-icon>{{ activeJob?.division }}
              </v-chip>
              <v-chip size="small" variant="tonal">
                <v-icon start size="16">mdi-map-marker</v-icon>{{ activeJob?.location }}
              </v-chip>
            </div>
          </div>
          <v-btn icon="mdi-close" variant="text" @click="jobDialog=false"></v-btn>
        </div>
        <v-card-text class="pa-5">
          <v-row>
            <v-col cols="12" md="6">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Náplň práce</h3>
              <ul class="about-list">
                <li v-for="(d,i) in activeJob?.duties" :key="i">{{ d }}</li>
              </ul>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Požadavky</h3>
              <ul class="about-list">
                <li v-for="(r,i) in activeJob?.requirements" :key="i">{{ r }}</li>
              </ul>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions class="justify-end pa-4">
          <v-btn variant="text" @click="jobDialog=false">Zavřít</v-btn>
          <v-btn :to="{ name: 'ContactUs' }" color="primary">Mám zájem</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const jobs = ref([
  {
    id: 1,
    title: 'Stavbyvedoucí',
    division: 'Stavba',
    location: 'Svitavy / ČR',
    perex: 'Vedení stavebních zakázek, koordinace týmu, odpovědnost za kvalitu a termíny.',
    duties: ['Řízení stavebních prací', 'Koordinace subdodavatelů', 'Kontrola kvality a BOZP'],
    requirements: ['SŠ/VŠ stavební', 'Praxe 3+ roky', 'ŘP sk. B']
  },
  {
    id: 2,
    title: 'Projektant TZB',
    division: 'TZB',
    location: 'Svitavy / hybridně',
    perex: 'Návrh a projekce technických zařízení budov, spolupráce s realizačním týmem.',
    duties: ['Zpracování projektové dokumentace', 'Technické konzultace', 'Autorský dozor'],
    requirements: ['SŠ/VŠ technického směru', 'Znalost CAD/BIM', 'Schopnost týmové spolupráce']
  },
  {
    id: 3,
    title: 'Energetik / technik FVE',
    division: 'Energetika',
    location: 'ČR',
    perex: 'Montáž, servis a zprovozňování energetických technologií včetně FVE.',
    duties: ['Montáž a servis', 'Uvádění do provozu', 'Technická podpora zákazníků'],
    requirements: ['Elektro vyhláška / Osvědčení', 'Základní orientace v energetice', 'Ochota cestovat']
  }
])

const jobDialog = ref(false)
const activeJob = ref(null)

function openJob(job){ activeJob.value = job; jobDialog.value = true }

// Background image for jobs section (easy to change)
const jobsBackground = ref('/fotky/stavba3.png')

// Atmosphere items for the second section
const atmosphere = ref([
  {
    title: 'Stabilní zázemí',
    text: 'Jsme středně velká firma s více než 30letou tradicí.',
    image: '/fotky/references/stavba.png'
  },
  {
    title: 'Férové jednání',
    text: 'Sliby plníme a za prací stojí odpovídající ohodnocení.',
    image: '/fotky/references/energetika.png'
  },
  {
    title: 'Přátelský kolektiv',
    text: 'Nejsme anonymní korporát, ale tým lidí, kteří drží při sobě.',
    image: '/fotky/references/prodejna.png'
  },
  {
    title: 'Možnost růstu',
    text: 'Podporujeme profesní i osobní rozvoj.',
    image: '/fotky/stavba.png'
  },
  {
    title: 'Moderní zázemí',
    text: 'Kvalitní technické vybavení usnadňuje práci.',
    image: '/fotky/energetika.png'
  },
  {
    title: 'Společné akce',
    text: 'Týmové aktivity posilují vztahy i atmosféru.',
    image: '/fotky/references/tzb.png'
  }
])
const activeAtmosphere = ref(0)

// Benefits
const benefits = ref([
  { icon: 'mdi-account-group', title: 'FKSP', text: 'Fond kulturních a sociálních potřeb pro podporu zaměstnanců' },
  { icon: 'mdi-shield-heart', title: 'Penzijní & životní pojištění', text: 'Příspěvek na penzijní a životní pojištění' },
  { icon: 'mdi-silverware-fork-knife', title: 'Příspěvek na stravování', text: 'Příspěvek na stravování formou stravenek' },
  { icon: 'mdi-baby-face-outline', title: 'Hlídání', text: 'Postaráme se o vaše děti během prázdnin' },
  { icon: 'mdi-beach', title: '5 týdnů dovolené', text: 'Dostatek času na odpočinek a regeneraci' },
  { icon: 'mdi-file-shield-outline', title: 'Pojištění odpovědnosti & úrazové', text: 'Pojištění odpovědnosti a úrazové pojištění pro zaměstnance' },
  { icon: 'mdi-book-open-page-variant-outline', title: 'Výuka cizích jazyků', text: 'Možnost vzdělávání v cizích jazycích' },
  { icon: 'mdi-cellphone', title: 'Smlouva s Vodafone', text: 'Výhodné firemní tarify pro zaměstnance a jejich rodiny' },
])
</script>

<style scoped>
.career-page { background:#fff; }
.about-container { width: 75%; max-width: 1700px; margin: 0 auto; }
@media (max-width: 1280px){ .about-container { width: 92%; } }
@media (max-width: 960px){ .about-container { width: 100%; } }
.career-hero { position: relative; overflow: hidden; }
.career-hero .hero-bg { filter: brightness(0.6); }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55)); }
.hero-title { color:#fff; font-size: clamp(2.2rem,4.5vw,3.4rem); font-weight: 800; margin:0 0 .6rem; letter-spacing:.5px; }
.hero-sub { color:#e5edf5; font-size: clamp(1rem,1.6vw,1.25rem); max-width: 720px; }
.why-text { line-height: 1.65; color:#374151; }
.about-list { margin: 0 0 10px; padding-left: 1.05rem; }
.about-list li { margin: 6px 0; line-height: 1.6; color:#374151; }
.atmo-list :deep(.v-list-item--active) { background: rgba(34,86,161,0.08); border-left: 3px solid #2256A1; }
.atmo-image-wrap { overflow: hidden; }
.atmo-image { transition: transform .6s ease; }
.atmo-image-wrap:hover .atmo-image { transform: scale(1.04); }
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
.jobs-section { position: relative; background-image: url('/fotky/references/back.png'); background-size: cover; background-position: center; }
.jobs-overlay { position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.25)); }
.jobs-heading { color:#fff; font-size: clamp(2rem,4.6vw,3rem); letter-spacing:.4px; }

/* Job cards */
.job-card { background: rgba(255,255,255,0.94); backdrop-filter: saturate(1.1) blur(1px); border: 1px solid rgba(17,24,39,0.06); border-radius: 14px; transition: transform .2s ease, box-shadow .2s ease; }
.job-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.12); }
.job-card-inner { padding: 18px 20px; }
.job-title { font-weight: 800; font-size: 1.15rem; letter-spacing:.2px; color:#0c2b68; }
.job-perex { color:#374151; line-height: 1.55; }

/* Job modal */
.job-modal { border-radius: 14px; overflow:hidden; }
.job-modal-header { display:flex; justify-content:space-between; align-items:center; padding: 16px 20px; background: #f6f9ff; border-bottom: 1px solid #e5edf5; }
.job-modal-title { font-weight: 800; color:#0c2b68; font-size: 1.25rem; letter-spacing:.3px; }
</style>