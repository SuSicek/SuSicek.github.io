<template>
  <section class="about-section blue-rings-bg">
    <!-- Hero slideshow with overlay title/subtitle -->
    <v-sheet class="position-relative hero-shell" color="black">
      <v-carousel
        class="hero-carousel"
        v-model="currentSlide"
        hide-delimiters
        :show-arrows="false"
        :touch="false"
        cycle
        interval="6000"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-img :src="slide.src" cover :alt="slide.alt"></v-img>
        </v-carousel-item>
      </v-carousel>
      <div class="hero-overlay d-flex flex-column justify-end">
        <div class="overlay-container">
          <h1 class="slideshow-title">UCHYTIL <span class="hero-highlight">s.r.o.</span></h1>
          <div class="slideshow-subtitle">Stavby, které <span class="hero-highlight">fungují</span>. Partnerství, které <span class="hero-highlight">trvá</span></div>
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

    <!-- Why us (centered) - full width stripe -->
    <section class="why-us-strip">
      <v-container class="py-10 about-container text-center why-us-section">
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
    </section>

    <!-- Image left / Text right -->
    <v-container class="py-12 about-container">
      <v-row align="center">
          <v-col cols="12" md="6" class="mb-6 mb-md-0">
          <v-img src="/fotky/stavba3.png" alt="Naše týmy a realizace" height="360" cover class="rounded-xl" />
        </v-col>
        <v-col cols="12" md="6" class="about-right">
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
    <v-sheet class="numbers-timeline-section py-12 position-relative overflow-hidden">
      <!-- Background Image & Overlay -->
      <div class="numbers-bg-image"></div>
      <div class="numbers-overlay"></div>
      
      <!-- Enlightening effect background -->
      <div class="numbers-highlights" aria-hidden="true">
        <span class="orb orb-a"></span>
        <span class="orb orb-b"></span>
      </div>

      <v-container class="about-container position-relative z-1">
        <v-row class="mb-8">
          <v-col cols="12" class="text-center">
            <h2 class="section-heading">Naše čísla & Milníky</h2>
          </v-col>
        </v-row>
        <v-row class="mb-6 kpi-row">
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
          <v-col cols="12">
            <section class="timeline">
              <ul>
                <li v-for="(m, i) in milestones" :key="'m-'+i">
                  <div>
                    <time>{{ m.date }}</time>
                    <h4 class="milestone-title">{{ m.title }}</h4>
                    <p class="milestone-desc mt-2 text-body-2">{{ m.description }}</p>
                  </div>
                </li>
              </ul>
            </section>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Charity Section -->
    <v-sheet class="py-12 bg-grey-lighten-5">
      <v-container class="about-container">
        <v-row justify="center" class="mb-8">
          <v-col cols="12" class="text-center">
            <h2 class="text-h5 text-md-h4 font-weight-bold mb-2">Přispíváme</h2>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="6" sm="4" md="2" v-for="(item, i) in charityImages" :key="i" class="text-center">
            <v-sheet class="d-flex align-center justify-center rounded-lg overflow-hidden" color="white" elevation="1" height="120">
               <v-img :src="item.src" :alt="item.alt" cover height="100%" width="100%" />
            </v-sheet>
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
    <v-sheet class="cta-section py-16">
      <v-container class="about-container">
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
    </v-sheet>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentSlide = ref(0)
const slides = [
  { src: '/fotky/trubkyvykop.png', alt: 'Trubky výkop' },
  { src: '/fotky/modrozlutakotelna.png', alt: 'Modrožlutá kotelna' },
  { src: '/fotky/sedetrubky.png', alt: 'Sedé trubky' },
  { src: '/fotky/energetika.png', alt: 'Energetika' }
]

const kpis = [
  { value: '20+', label: 'Let zkušeností' },
  { value: '100+', label: 'Projektů ročně' },
  { value: '50+', label: 'Specialistů' },
  { value: '3', label: 'Divize' },
]

const aboutNumbers = [
  { value: '32', label: 'let na trhu' },
  { value: '4100+', label: 'realizovaných zakázek' },
  { value: '300+', label: 'spokojených klientů' },
  { value: '120', label: 'odborníků' },
]

const milestones = [
  {
    date: '1994',
    title: 'Založení společnosti',
    description: 'Založení ENBRA MONTÍŽE s.r.o.'
  },
  {
    date: '2002',
    title: 'Změna názvu společnosti',
    description: 'Změna názvu na UCHYTIL s.r.o.'
  },
  {
    date: '2006',
    title: 'Vlastní sídlo',
    description: 'Vybudování vlastního sídla společnosti.'
  },
  {
    date: '2007',
    title: 'Vstup do Energetiky',
    description: 'Rozšíření působnosti o oblast energetiky.'
  },
  {
    date: '2020',
    title: 'Začlenění',
    description: 'Začlenění do NEMOVITOSTI a.s.'
  },
  {
    date: 'Současnost',
    title: 'Stavba-Energetika-TZB',
    description: 'Obrat 600 mil. Kč, počet zaměstnanců 150.'
  }
]

const charityImages = [
  { src: '/fotky/prispivame/charita1.png', alt: 'Charita' },
  { src: '/fotky/prispivame/charita2.png', alt: 'Podpora' },
  { src: '/fotky/prispivame/charita4.png', alt: 'Dar' }
]

// Timeline intersection observer: add .in-view class when list items enter viewport
onMounted(() => {
  const items = document.querySelectorAll('.timeline li')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view')
    })
  }, { threshold: 0.45 })

  items.forEach(i => observer.observe(i))

  onBeforeUnmount(() => observer.disconnect())
})

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
    title: 'Prodejna',
    subtitle: 'Prodej a technika',
    description: 'Prodej materiálu, příslušenství a techniky pro vaše projekty.',
    image: '/fotky/kontejner.png',
    link: '/prodejna'
  }
]
</script>

<style scoped>
.about-section { background: #fff; }
.about-container { width: 75%; max-width: 1700px; margin: 0 auto; }
@media (max-width: 1280px){ .about-container { width: 92%; } }
@media (max-width: 960px){ .about-container { width: 100%; } }

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

/* Smooth carousel transitions */
.v-carousel__item {
  transition: opacity 1.5s ease-in-out, transform 1.5s ease-in-out;
  will-change: opacity, transform;
}
.v-carousel {
  will-change: transform;
}

.kpi {
  text-align: center;
  padding: 28px 8px; /* increased vertical space to match much thicker stripe */
  position: relative;
  z-index: 2; /* keep KPI content above the row stripe and highlight layer */
}

/* Single blue stripe behind the KPI row - REMOVED */
.kpi-row { position: relative; }
.kpi-row::before {
  display: none;
}


@keyframes enlightenStripe {
  0%, 100% {
    box-shadow: 0 0 0 rgba(3, 31, 104, 0);
  }
  50% {
    box-shadow: 0 0 20px rgba(3, 31, 104, 0.6);
  }
}
kpi-row::after {
  /* highlights removed per request; keep stripe flat */
  display: none;
}
.kpi-value { font-size: clamp(2.4rem, 5.0vw, 4rem); font-weight: 900; color: #ffffff; margin-top: -8px; }
.kpi-label { color: rgba(255,255,255,0.95); font-size: clamp(0.95rem, 1.6vw, 1.1rem); }

@media screen and (max-width: 900px) {
  .kpi { padding: 18px 8px; }
  .kpi-row::before { height: 80px; left: 3%; right: 3%; border-radius: 12px; }
}

@media screen and (max-width: 600px) {
  .kpi { padding: 12px 8px; }
  /* hide the stripe on medium/smaller screens */
  .kpi-row::before { display: none; }
  .kpi-value { margin-top: 0; }
}

/* Numbers + Timeline background */
.numbers-timeline-section {
  position: relative;
  /* background handled by inner divs now to allow layering of highlights */
  background-color: #031f68;
}
.numbers-bg-image {
  position: absolute;
  inset: 0;
  background-image: url('/fotky/energetika.png');
  background-size: cover;
  background-position: center;
  z-index: 0;
}
.numbers-overlay {
  position: absolute;
  inset: 0;
  /* Slightly more transparent to reveal bg image while keeping blue tone */
  background: rgba(3, 31, 104, 0.85);
  z-index: 0;
}

/* Highlights (Orbs) */
.numbers-highlights { 
  position: absolute; 
  inset: 0; 
  z-index: 1; 
  pointer-events: none; 
  overflow: hidden; 
}
.numbers-highlights .light-orb { 
  position: absolute; 
  border-radius: 50%; 
  background-repeat: no-repeat; 
  mix-blend-mode: overlay; 
  opacity: 0.9; 
  animation: subtlePulse 5s ease-in-out infinite; 
}
.numbers-highlights .orb-1 { 
  top: -10%; left: -5%; width: 120%; height: 80%; 
  background: radial-gradient(circle at 35% 35%, rgba(180,220,255,0.28) 0%, rgba(180,220,255,0.08) 35%, rgba(180,220,255,0.00) 70%); 
}
.numbers-highlights .orb-2 { 
  top: 40%; right: -10%; width: 120%; height: 80%; 
  background: radial-gradient(circle at 65% 65%, rgba(150,200,255,0.26) 0%, rgba(150,200,255,0.07) 35%, rgba(150,200,255,0.00) 70%); 
}
.numbers-highlights .orb-3 { 
  bottom: -15%; left: 10%; width: 120%; height: 70%; 
  background: radial-gradient(circle at 40% 60%, rgba(180,220,255,0.3) 0%, rgba(180,220,255,0.1) 40%, rgba(180,220,255,0.00) 80%); 
}

@keyframes subtlePulse {
  0% { opacity: 0.65; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1.02); }
  100% { opacity: 0.65; transform: scale(0.98); }
}
.section-heading {
  color: #ffffff;
  font-weight: 900;
  font-size: clamp(2rem, 5.2vw, 3.6rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.03;
}
.timeline-heading {
  color: #ffffff;
  font-weight: 900;
  font-size: clamp(1.6rem, 4.6vw, 3rem);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

/* Vertical timeline styles */
.timeline ul {
  background: transparent;
  padding: 30px 0;
}
.timeline ul li {
  list-style-type: none;
  position: relative;
  width: 12px; /* thicker spine */
  margin: 0 auto 40px auto;
  padding-top: 50px;
  background: #031f68; /* center vertical line (blue theme) */
}
.timeline ul li::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 36px; /* slightly larger dot to match thicker spine */
  height: 36px;
  border-radius: 50%;
  background: inherit;
  z-index: 1;
  transition: background 0.35s ease-in-out, box-shadow 0.25s ease-in-out;
}
.timeline ul li div {
  position: relative;
  bottom: 0;
  width: 420px;
  padding: 16px 20px;
  background: #ffffff;
  color: #1e293b;
  border-radius: 8px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.08);
}
.milestone-title { margin: 8px 0 6px; font-weight: 800; color: #031f68; font-size: clamp(1.05rem, 2.2vw, 1.45rem); }
.milestone-desc { margin: 0 0 6px; color: #475569; font-size: clamp(0.95rem, 1.9vw, 1.05rem); line-height: 1.45; }
.milestone-source { font-size: 0.85rem; color: #9aa4b2; }
.timeline ul li div::before {
  content: "";
  position: absolute;
  bottom: 7px;
  width: 0;
  height: 0;
  border-style: solid;
}
.timeline ul li:nth-child(odd) div {
  left: 66px; /* match left-side perceived spacing (increase gap from spine) */
}
.timeline ul li:nth-child(odd) div::before {
  left: -15px;
  border-width: 8px 16px 8px 0;
  border-color: transparent #ffffff transparent transparent;
}
.timeline ul li:nth-child(even) div {
  left: -468px; /* make left-side spacing symmetric with right-side (420px width + 48px gap) */
}
.timeline ul li:nth-child(even) div::before {
  right: -15px;
  border-width: 8px 0 8px 16px;
  border-color: transparent transparent transparent #ffffff;
}
time {
  display: block;
  font-size: clamp(1.05rem, 2.4vw, 1.35rem);
  font-weight: 800;
  color: #031f68;
  margin-bottom: 8px;
  letter-spacing: 0.01em;
}

/* Effects */
.timeline ul li::after { transition: background 0.35s ease-in-out, box-shadow 0.25s ease-in-out; }
.timeline ul li.in-view::after { /* keep dot blue; no glow */ box-shadow: none; }
.timeline ul li div { visibility: hidden; opacity: 0; transition: all 0.5s ease-in-out; }
.timeline ul li:nth-child(odd) div { transform: translate3d(200px, 0, 0); }
.timeline ul li:nth-child(even) div { transform: translate3d(-200px, 0, 0); }
.timeline ul li.in-view div { transform: none; visibility: visible; opacity: 1; }

@media screen and (max-width: 900px) {
  .timeline ul li div { width: 250px; }
  .timeline ul li:nth-child(even) div { left: 45px; }
  .timeline ul li:nth-child(odd) div { left: 60px; }
}

@media screen and (min-width: 900px) {
  /* larger timeline cards and titles on normal/desktop screens */
  .timeline ul li div { width: 480px; padding: 20px 26px; }
  .timeline ul li:nth-child(odd) div { left: 78px; }
  .timeline ul li:nth-child(even) div { left: -558px; }
  .milestone-title { font-size: clamp(1.3rem, 2.2vw, 1.8rem); }
  time { font-size: 1.5rem; }
}

@media screen and (max-width: 600px) {
  .timeline ul li { margin-left: 20px; }
  .timeline ul li div { width: calc(100vw - 120px); }
  .timeline ul li:nth-child(odd) div,
  .timeline ul li:nth-child(even) div { left: 45px; }
  .timeline ul li:nth-child(even) div::before { left: -15px; border-width: 8px 16px 8px 0; border-color: transparent #ffffff transparent transparent; }
}



.milestone { border-radius: 16px; }
.milestone-year { font-weight: 800; color: #ffffff; margin-bottom: 6px; }
.milestone-text { color: #ffffff; }

.cta { border-radius: 18px; background: linear-gradient(180deg, #f7fafc 0%, #ffffff 100%); }
.kdo-jsme-text { line-height: 1.65; color:#374151; }

/* Highlights for Numbers Section */
.numbers-highlights { position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
.numbers-highlights .orb { position: absolute; border-radius: 50%; background-repeat: no-repeat; mix-blend-mode: overlay; opacity: 0.9; animation: subtlePulse 5s ease-in-out infinite; }
.numbers-highlights .orb-a { top: 0%; left: -5%; width: 140%; height: 60%; background: radial-gradient(circle at 35% 35%, rgba(180,220,255,0.28) 0%, rgba(180,220,255,0.08) 35%, rgba(180,220,255,0.00) 70%); }
.numbers-highlights .orb-b { bottom: 0%; right: -5%; width: 140%; height: 60%; background: radial-gradient(circle at 65% 65%, rgba(150,200,255,0.26) 0%, rgba(150,200,255,0.07) 35%, rgba(150,200,255,0.00) 70%); }
.z-1 { z-index: 1; }

@keyframes subtlePulse {
  0% { opacity: 0.65; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1.02); }
  100% { opacity: 0.65; transform: scale(0.98); }
}

/* CTA section: blue background matching the site theme */
.cta-section {
  background: #031f68;
  border-radius: 0 !important;
  position: relative;
  color: #ffffff;
}
.cta-section::after {
  /* light-blue highlight layer for the CTA stripe */
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(circle at 12% 40%, rgba(180,220,255,0.12) 0%, rgba(180,220,255,0.00) 18%),
    radial-gradient(circle at 28% 62%, rgba(150,200,255,0.10) 0%, rgba(150,200,255,0.00) 20%),
    radial-gradient(circle at 52% 50%, rgba(180,220,255,0.08) 0%, rgba(180,220,255,0.00) 20%),
    radial-gradient(circle at 78% 26%, rgba(150,200,255,0.06) 0%, rgba(150,200,255,0.00) 20%);
  mix-blend-mode: overlay;
  animation: subtlePulse 7.5s ease-in-out infinite;
}
.cta-section h2, .cta-section p { color: #ffffff; }
.cta-section :deep(.v-btn) {
  background: #ffffff !important;
  color: #031f68 !important;
  font-weight: 800;
}

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

/* Why us - blue themed block (consistent with stats/references) */
.why-us-strip {
  background: #031f68;
  position: relative;
  overflow: hidden;
}
.why-us-section {
  color: #fff;
  position: relative;
  z-index: 1; /* keep content above glows */
}
.why-us-section h2 { color: #fff; }
.why-us-section .why-text { color: #e5edf5; }
.why-us-strip::before {
  content: '';
  position: absolute;
  top: 6%;
  left: 4%;
  width: 320px;
  height: 320px;
  background-image:
    radial-gradient(circle at 20% 28%, rgba(180,220,255,0.20) 0%, rgba(150,200,255,0.06) 30%, transparent 66%),
    radial-gradient(circle at 62% 20%, rgba(150,200,255,0.14) 0%, rgba(150,200,255,0.04) 28%, transparent 68%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: subtlePulse 8s ease-in-out infinite;
}
.why-us-strip::after {
  content: '';
  position: absolute;
  bottom: 6%;
  right: 6%;
  width: 420px;
  height: 420px;
  background-image:
    radial-gradient(circle at 12% 68%, rgba(150,200,255,0.16) 0%, rgba(150,200,255,0.05) 28%, transparent 66%),
    radial-gradient(circle at 72% 40%, rgba(180,220,255,0.14) 0%, rgba(180,220,255,0.04) 26%, transparent 66%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: subtlePulse 10s ease-in-out infinite;
}
.why-us-section > .v-row, .why-us-section > .v-row .v-col { position: relative; }

/* About bullet lists */
.about-list { margin: 0 0 10px; padding-left: 1.05rem; }
.about-list li { margin: 6px 0; line-height: 1.6; color:#374151; }
.img-left-block { border-radius: 18px; }
.about-list { margin: 0; padding-left: 1.2rem; line-height: 1.65; color:#374151; }
.about-list.bullet-columns { columns: 1; column-gap: 28px; }
@media (min-width: 960px){ .about-list.bullet-columns { columns: 2; } }

/* Color subsection titles and list items in the about right column */
.about-right h3.text-h5 {
  color: #031f68 !important;
  font-size: clamp(1.25rem, 2.6vw, 1.8rem) !important;
  font-weight: 800 !important;
  margin-bottom: 0.6rem !important;
}
.about-right .about-list {
  color: #031f68;
}
.about-right .about-list li strong {
  color: #031f68;
}

/* subtle pulsing used by blue highlight overlays */
@keyframes subtlePulse {
  0% { opacity: 0.75; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-2px); }
  100% { opacity: 0.75; transform: translateY(0); }
}
</style>