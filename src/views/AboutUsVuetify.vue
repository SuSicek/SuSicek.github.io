<template>
  <section class="about-section">
    <!-- Hero copied from Home page -->
    <v-sheet class="position-relative" height="75vh" color="black">
      <v-carousel
        v-model="currentSlide"
        height="75vh"
        hide-delimiter-background
        show-arrows="hover"
        cycle
        interval="6000"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-img :src="slide.src" cover :alt="slide.alt"></v-img>
        </v-carousel-item>
      </v-carousel>
      <div class="hero-overlay d-flex flex-column justify-center">
        <div class="overlay-container">
          <h1 class="slideshow-title">UCHYTIL s.r.o.</h1>
          <div class="slideshow-subtitle">Stavby, které fungují. Partnerství, které trvá</div>
        </div>
      </div>
    </v-sheet>

    <!-- 4 image feature cards -->
    <v-container class="py-8 about-container">
      <v-row>
        <v-col cols="12" md="6" lg="3" v-for="(f, i) in features" :key="i">
          <v-card class="feature-card" elevation="3">
            <v-img :src="f.image" :alt="f.title" height="240" cover>
              <template #default>
                <div class="feature-overlay">
                  <div class="feature-title">{{ f.title }}</div>
                  <div class="feature-text">{{ f.text }}</div>
                </div>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Why us (centered) -->
    <v-container class="py-10 about-container text-center">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <h2 class="text-h5 text-md-h4 font-weight-bold mb-4">Proč my?</h2>
          <p class="text-body-1 why-text mb-3">
            Naší vizí je být dlouhodobým a spolehlivým partnerem, který férovým přístupem přináší zákazníkům
            komplexní a kvalitní řešení v oblasti stavebnictví, TZB a energetiky.
          </p>
          <p class="text-body-1 why-text">
            Stavíme na spolehlivosti, odbornosti a lidském přístupu. Dodáváme řešení včas, kvalitně a bez kompromisů –
            tak, aby se spokojený zákazník vracel.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Image left / Text right -->
    <v-container class="py-12 about-container">
      <v-row align="center">
        <v-col cols="12" md="6" class="mb-6 mb-md-0">
          <v-img src="/fotky/stavba.png" alt="Naše týmy a realizace" height="360" cover class="rounded-xl" />
        </v-col>
        <v-col cols="12" md="6">
          <h3 class="text-h5 font-weight-bold mb-2">Máme vlastní</h3>
          <ul class="about-list mb-6">
            <li>Projekční, montážní i realizační skupiny odborníků</li>
            <li>Výrobní kapacity ve všech oblastech činnosti</li>
          </ul>

          <h3 class="text-h5 font-weight-bold mb-2">U nás je samozřejmostí</h3>
          <ul class="about-list">
            <li><strong>Kvalita</strong> – nadstandardní úroveň realizací, důraz na detail a preciznost.</li>
            <li><strong>Spolehlivost</strong> – dodržování termínů i rozpočtů, zákazník je pro nás partner.</li>
            <li><strong>Komplexnost</strong> – služby od prvotní studie až po dlouhodobý servis.</li>
            <li><strong>Bezpečnost a ekologie</strong> – ochrana zdraví a životního prostředí jako samozřejmý standard.</li>
            <li><strong>Efektivní řízení projektů</strong> – máme pod kontrolou náklady i průběh stavby, zvládáme složité realizace.</li>
            <li><strong>Přístup k novým trendům</strong> – umožněný spoluprací na výzkumných projektech s VŠ.</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>

    <!-- Numbers + Timeline combined with background image -->
    <v-sheet class="numbers-timeline-section py-12">
      <v-container class="about-container position-relative">
        <v-row class="mb-8">
          <v-col cols="12" class="text-center">
            <h2 class="section-heading">Naše čísla & Milníky</h2>
          </v-col>
        </v-row>
        <v-row class="mb-6">
          <v-col cols="6" md="3" v-for="(n, i) in aboutNumbers" :key="'n-'+i">
            <div class="kpi">
              <div class="kpi-value">{{ n.value }}</div>
              <div class="kpi-label">{{ n.label }}</div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center mb-4">
            <h3 class="timeline-heading">Milníky</h3>
          </v-col>
          <v-col cols="12" md="4" v-for="(milestone, i) in milestones" :key="'m-'+i">
            <v-card elevation="2" class="pa-4 milestone">
              <div class="milestone-year">{{ milestone.year }}</div>
              <div class="milestone-text">{{ milestone.text }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    
    <v-container class="py-12 about-container">
      <v-row justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h5 text-md-h4 font-weight-bold">Naše divize</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="3" v-for="d in divisions" :key="d.title">
          <v-card :to="d.link" class="h-100" hover>
            <v-img :src="d.image" :alt="d.title" height="200" cover />
            <v-card-item>
              <v-card-title>{{ d.title }}</v-card-title>
              <v-card-subtitle>{{ d.subtitle }}</v-card-subtitle>
            </v-card-item>
            <v-card-text>{{ d.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- CTA (same as Home page) -->
    <v-container class="py-16 about-container">
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="8">
          <h2 class="text-h5 text-md-h4 font-weight-bold mb-2">Spojte se s námi</h2>
          <p class="text-body-1">Rádi s vámi probereme váš projekt a navrhneme nejlepší řešení.</p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-right">
          <v-btn color="primary" size="large" :to="{ name: 'ContactUs' }">
            Kontaktujte nás
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const currentSlide = ref(0)
const slides = [
  { src: '/fotky/energetika.png', alt: 'Energetika' },
  { src: '/fotky/stavba.png', alt: 'Stavba' },
  { src: '/fotky/prodejna.png', alt: 'Prodejna' }
]

const kpis = [
  { value: '20+', label: 'Let zkušeností' },
  { value: '100+', label: 'Projektů ročně' },
  { value: '50+', label: 'Specialistů' },
  { value: '3', label: 'Divize' },
]

const aboutNumbers = [
  { value: '30+', label: 'let na trhu' },
  { value: '4100+', label: 'realizovaných zakázek' },
  { value: '300+', label: 'spokojených klientů' },
  { value: '100+', label: 'odborníků' },
]

const milestones = [
  { year: '2005', text: 'Založení společnosti UCHYTIL s.r.o.' },
  { year: '2012', text: 'Rozšíření o divizi Energetika' },
  { year: '2020', text: '1000+ úspěšně dokončených projektů' },
]

const features = [
  {
    title: 'Kvalita a bezpečnost',
    text: 'Pracujeme dle platných norem, držíme certifikace a klademe důraz na bezpečnost práce.',
    image: '/fotky/stavba.png'
  },
  {
    title: 'Udržitelnost',
    text: 'Navrhujeme úsporná řešení s ohledem na životní prostředí a dlouhodobý provoz.',
    image: '/fotky/energetika.png'
  },
  {
    title: 'Odborný tým',
    text: 'Silné zázemí strojních, elektro a projekčních středisek. Neustálé vzdělávání.',
    image: '/fotky/prodejna.png'
  },
  {
    title: 'Spolehlivost',
    text: 'Dodržujeme termíny, smluvní závazky a dbáme na precizní realizaci.',
    image: '/fotky/kontejner.png'
  }
]

const divisions = [
  {
    title: 'Energetika',
    subtitle: 'Výroba a úspory energií',
    description: 'Zajišťuje komplexní služby v oblasti výroby, distribuce a úspor energií.',
    image: '/fotky/prodejna.png',
    link: '/division/energetika'
  },
  {
    title: 'Stavba',
    subtitle: 'Kompletní stavební projekty',
    description: 'Realizuje stavební projekty od návrhu po dokončení s důrazem na kvalitu a termíny.',
    image: '/fotky/stavba.png',
    link: '/division/stavba'
  },
  {
    title: 'TZB',
    subtitle: 'Technická zařízení budov',
    description: 'Poskytuje odborné řešení technických zařízení budov pro komfort, efektivitu a bezpečnost.',
    image: '/fotky/energetika.png',
    link: '/division/tzb'
  },
  {
    title: 'E-shop',
    subtitle: 'Online prodej a technika',
    description: 'Online prodej materiálu, příslušenství a techniky pro vaše projekty.',
    image: '/fotky/kontejner.png',
    link: '/eshop'
  }
]
</script>

<style scoped>
.about-section { background: #fff; }
.about-container { width: 75%; max-width: 1700px; margin: 0 auto; }
@media (max-width: 1280px){ .about-container { width: 92%; } }
@media (max-width: 960px){ .about-container { width: 100%; } }

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35));
}
.overlay-container {
  max-width: 900px;
  margin-left: clamp(16px, 8vw, 120px);
}
.slideshow-title {
  color: #fff;
  font-size: clamp(2.4rem, 5.2vw, 4rem);
  font-weight: 900;
  line-height: 1.07;
  letter-spacing: 0.015em;
  margin: 0 0 0.5rem 0;
}
.slideshow-subtitle {
  color: #fff;
  font-size: clamp(1.05rem, 2vw, 1.6rem);
  font-weight: 600;
  line-height: 1.3;
}

.kpi { text-align: center; padding: 16px 8px; }
.kpi-value { font-size: 2rem; font-weight: 800; color: #0c2b68; }
.kpi-label { color: #4b5563; }

/* Numbers + Timeline background */
.numbers-timeline-section {
  position: relative;
  background-image: url('/fotky/energetika.png');
  background-size: cover;
  background-position: center;
}
.section-heading { color: #0c2b68; font-weight: 800; }
.timeline-heading { color: #0c2b68; font-weight: 700; }



.milestone { border-radius: 16px; }
.milestone-year { font-weight: 800; color: #0c2b68; margin-bottom: 6px; }
.milestone-text { color: #4b5563; }

.cta { border-radius: 18px; background: linear-gradient(180deg, #f7fafc 0%, #ffffff 100%); }
.kdo-jsme-text { line-height: 1.65; color:#374151; }

/* Feature cards */
.feature-card { position: relative; border-radius: 20px; overflow: hidden; }
.feature-card .v-img__img { transition: transform .6s ease; }
.feature-card:hover .v-img__img { transform: scale(1.08); }
.feature-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 18px 20px 22px;
  background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 75%);
  color: #fff;
}
.feature-title {
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 6px;
  letter-spacing: .5px;
}
.feature-text { font-size: .85rem; line-height: 1.3; opacity: .9; }
.why-text { line-height: 1.65; color:#374151; }

/* About bullet lists */
.about-list { margin: 0 0 10px; padding-left: 1.05rem; }
.about-list li { margin: 6px 0; line-height: 1.6; color:#374151; }
.img-left-block { border-radius: 18px; }
.about-list { margin: 0; padding-left: 1.2rem; line-height: 1.65; color:#374151; }
.about-list.bullet-columns { columns: 1; column-gap: 28px; }
@media (min-width: 960px){ .about-list.bullet-columns { columns: 2; } }
</style>