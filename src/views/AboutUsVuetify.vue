<template>
  <section class="about-section blue-rings-bg">
    <!-- Hero slideshow with overlay title/subtitle -->
    <v-sheet class="position-relative hero-shell" color="black">
      <div class="hero-custom-slider">
        <transition-group name="hero-slide" tag="div" class="hero-slides-wrapper">
          <div v-for="(slide, i) in slides" :key="i" v-show="currentSlide === i" class="hero-slide-item">
            <v-img :src="slide.src" cover :position="slide.position || 'center center'" :alt="slide.alt" :eager="i === 0"></v-img>
          </div>
        </transition-group>
      </div>
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
    <v-container class="py-16 about-container">
      <v-row align="center">
          <v-col cols="12" md="6" class="mb-8 mb-md-0 position-relative">
          <v-img src="/fotky/jine/dronBrno.png" alt="Naše týmy a realizace" height="500" cover class="rounded-xl" gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3)" />
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
            <h3 class="timeline-heading">Milníky společnosti</h3>
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

    <!-- Podporujeme Section -->
    <div class="podporujeme-section position-relative py-8">
      <!-- Background Collage -->
      <div class="collage-bg">
        <div class="collage-item item-1"></div>
        <div class="collage-item item-2"></div>
        <div class="collage-item item-3"></div>
        <div class="collage-item item-4"></div>
        <div class="collage-item item-5"></div>
        <div class="collage-item item-6"></div>
      </div>
      
      <!-- Dark Overlay -->
      <div class="section-overlay"></div>

      <!-- Content -->
      <v-container class="position-relative z-index-2 text-center text-white">
        <h2 class="text-h3 font-weight-bold mb-2">Podporujeme</h2>
        <p class="text-h6 mb-6 font-weight-regular text-grey-lighten-3" style="max-width: 800px; margin: 0 auto; line-height: 1.6;">
          Pomáháme tam, kde je to potřeba. Podporujeme charitativní projekty, místní komunity a lidi, kteří se ocitli v těžké životní situaci.
        </p>

        <div class="logos-collage-wrapper position-relative py-12" style="min-height: 480px;">
           <!-- Main Logo (Krtek) - Centered -->
           <div class="position-absolute logo-item main-logo-item">
              <v-sheet color="transparent" width="280">
                 <v-img src="/fotky/prispivame/krtek.png" contain aspect-ratio="1" class="scale-up-hover main-logo-img" />
              </v-sheet>
           </div>
           
           <!-- Random Logos - Positioned absolutely around -->
           <div 
              v-for="(img, i) in charityImages" 
              :key="'l-'+i"
              class="position-absolute logo-item small-logo-item"
              :class="`pos-${i}`"
           >
              <v-sheet color="transparent" :width="img.width">
                  <v-img :src="img.src" :alt="img.alt" contain aspect-ratio="1" class="grayscale-hover logo-img" />
              </v-sheet>
           </div>
        </div>
      </v-container>
    </div>
    
    <v-container class="py-12 about-container">
      <v-row justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h5 text-md-h4 font-weight-bold">Naše divize</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="3" v-for="d in divisions" :key="d.title">
            <router-link :to="d.link" class="division-card-link">
              <div class="division-card elevation-4">
                <v-img :src="d.image" :alt="d.title" cover class="division-card-bg" />
                <div class="division-card-overlay"></div>
                <div class="division-card-content">
                  <h3 class="division-card-title">{{ d.title }}</h3>
                  <div class="division-card-details">
                    <p class="division-card-subtitle">{{ d.subtitle }}</p>
                    <p class="division-card-description">{{ d.description }}</p>
                  </div>
                </div>
              </div>
            </router-link>
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
const currentInterval = ref(null)

const slides = [
  { src: '/fotky/jine/dronBrno.png', alt: 'Dron Brno' },
  { src: '/fotky/jine/modrozlutakotelna.png', alt: 'Modrožlutá kotelna' },
  { src: '/fotky/jine/sedetrubky.png', alt: 'Sedé trubky' },
  { src: '/fotky/jine/Vsetín 2.jpg', alt: 'Vsetín', position: 'center 20%' }
]

const startSlideShow = () => {
  currentInterval.value = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6000)
}

const stopSlideShow = () => {
  if (currentInterval.value) clearInterval(currentInterval.value)
}

onMounted(() => {
  startSlideShow()
})

onBeforeUnmount(() => {
  stopSlideShow()
})

const kpis = [
  { value: '20+', label: 'Let zkušeností' },
  { value: '100+', label: 'Projektů ročně' },
  { value: '50+', label: 'Specialistů' },
  { value: '3', label: 'Divize' },
]

const aboutNumbers = [
  { value: '32+', label: 'let na trhu' },
  { value: '4100+', label: 'realizovaných zakázek' },
  { value: '300+', label: 'spokojených klientů' },
  { value: '150+', label: 'odborníků' },
]

const milestones = [
  {
    date: '1994',
    title: 'Založení společnosti',
    description: 'Založení ENBRA MONTÁŽE s.r.o.'
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
    description: 'Začlenění do Nemovitosti UCHYTIL a.s.'
  },
  {
    date: 'Současnost',
    title: 'Stavba-Energetika-TZB',
    description: 'Obrat 600 mil. Kč, počet zaměstnanců 150+'
  }
]

const charityImages = [
  // Keeping krtek separate as main. Shuffled list of others:
  { src: '/fotky/prispivame/dumprojulii.png', alt: 'Dům pro Julii', width: 130 },
  { src: '/fotky/prispivame/hctabor.png', alt: 'HC Tábor', width: 140 },
  { src: '/fotky/prispivame/knezeves.png', alt: 'Kněževes', width: 120 },
  { src: '/fotky/prispivame/osh.png', alt: 'OSH', width: 130 },
  { src: '/fotky/prispivame/skchrlice.png', alt: 'SK Chrlice', width: 150 },
  { src: '/fotky/prispivame/skvojkovice.png', alt: 'SK Vojkovice', width: 130 }
].sort(() => Math.random() - 0.5)

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
    image: '/fotky/jine/bezpecnost.png'
  },
  {
    title: 'Udržitelnost',
    text: 'Navrhujeme úsporná řešení s ohledem na životní prostředí a dlouhodobý provoz.',
    image: '/fotky/jine/udrzitelnost.png'
  },
  {
    title: 'Odborný tým',
    text: 'Silné odborné zázemí vysoce kvalifikovaných odborníků v oblasti Stavba, Energetika TZB.',
    image: '/fotky/jine/savrec.png'
  },
  {
    title: 'Spolehlivost',
    text: 'Dodržujeme termíny, smluvní závazky a dbáme na precizní realizaci.',
    image: '/fotky/jine/spolehlivost.jpg'
  }
]

const divisions = [
  {
    title: 'Stavba',
    subtitle: 'Kompletní stavební projekty',
    description: 'Realizuje stavební projekty od návrhu po dokončení s důrazem na kvalitu a termíny.',
    image: '/fotky/jine/Vsetín 2.jpg',
    link: '/division/stavba'
  },
  {
    title: 'Energetika',
    subtitle: 'Výroba a úspory energií',
    description: 'Zajišťuje komplexní služby v oblasti výroby, distribuce a úspor energií.',
    image: '/fotky/jine/modrozlutakotelna.png',
    link: '/division/energetika'
  },
  {
    title: 'TZB',
    subtitle: 'Technická zařízení budov',
    description: 'Poskytuje odborné řešení technických zařízení budov pro komfort, efektivitu a bezpečnost.',
    image: '/fotky/jine/sedetrubky.png',
    link: '/division/tzb'
  },
  {
    title: 'Prodejna',
    subtitle: 'Prodej a technika',
    description: 'Prodej materiálu, příslušenství a techniky pro vaše projekty.',
    image: '/fotky/prodejna/fotky prodejna/p2.jpg',
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
.hero-shell :deep(.v-img) {
  height: 100% !important;
}

.hero-custom-slider,
.hero-slides-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-slide-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-slide-enter-active,
.hero-slide-leave-active {
  transition: transform 1.2s cubic-bezier(0.45, 0, 0.55, 1);
  will-change: transform;
}

.hero-slide-enter-from {
  transform: translateX(100%);
}

.hero-slide-leave-to {
  transform: translateX(-100%);
}

.hero-slide-leave-from,
.hero-slide-enter-to {
  transform: translateX(0);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.16));
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
  background-image: url('/fotky/jine/energetika.png');
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

/* Podporujeme Section */
.podporujeme-section {
  position: relative;
  overflow: hidden;
  background-color: #050505;
  min-height: 400px;
  display: flex;
  align-items: center;
}
.collage-bg {
  position: absolute;
  inset: 0;
  opacity: 0.6;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  transform: rotate(-3deg) scale(1.15);
  width: 110%;
  height: 110%;
  left: -5%;
  top: -5%;
  gap: 0;
  z-index: 1;
}
.collage-item {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) brightness(0.7);
  transition: all 0.5s ease;
  border: 1px solid rgba(255,255,255,0.05);
}
.collage-item:hover {
  filter: grayscale(0%) brightness(1);
  z-index: 2;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}
.collage-item.item-1 { background-image: url('/fotky/prispivame/charita1.png'); }
.collage-item.item-2 { background-image: url('/fotky/prispivame/charita2.png'); }
.collage-item.item-3 { background-image: url('/fotky/prispivame/charita4.png'); }
.collage-item.item-4 { background-image: url('/fotky/prispivame/charita1.png'); }
.collage-item.item-5 { background-image: url('/fotky/prispivame/charita2.png'); }
.collage-item.item-6 { background-image: url('/fotky/prispivame/charita4.png'); }

.section-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(3, 31, 104, 0.55), rgba(7, 7, 7, 0.7));
  z-index: 2;
  pointer-events: none;
}
.z-index-2 { z-index: 3; }

/* Logos Collage */
.logos-collage-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  overflow: visible;
}

.logo-item {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Center Krtek */
.main-logo-item {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 280px; /* Base width for wrapper */
}
.main-logo-img {
  /* Removed drop-shadow */
}

/* Scattered Positions - larger spread */
.pos-0 { top: 8%; left: 12%; }
.pos-1 { top: 12%; right: 12%; }
.pos-2 { top: 42%; left: 2%; }
.pos-3 { top: 45%; right: 2%; }
.pos-4 { bottom: 12%; left: 18%; }
.pos-5 { bottom: 8%; right: 18%; }

/* Item Styles */
.logo-img, .main-logo-img {
  transition: all 0.4s ease;
}

/* Hover Effects */
.grayscale-hover {
  filter: grayscale(0%) brightness(1.1); /* Show original colors */
  opacity: 0.95;
  transition: all 0.4s ease;
}

.logo-item:hover {
  z-index: 20;
}

.logo-item:hover .grayscale-hover {
  filter: brightness(1.2);
  opacity: 1;
  transform: scale(1.15) rotate(2deg);
}

.scale-up-hover {
  animation: pulseLogo 3s infinite ease-in-out;
}

@keyframes pulseLogo {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@media (max-width: 900px) {
  .logos-collage-wrapper { min-height: 450px !important; }
  
  /* Resize for mobile to prevent severe overlap */
  .main-logo-item { width: 160px !important; } /* Wrapper width */
  .main-logo-item .v-sheet { width: 100% !important; }

  .logo-item.small-logo-item { width: 80px !important; } /* Wrapper width */
  .logo-item.small-logo-item .v-sheet { width: 100% !important; }
  
  /* Distribute vertically */
  .pos-0 { top: 5%; left: 5%; }
  .pos-1 { top: 5%; right: 5%; }
  
  /* Middle row alongside Krtek */
  .pos-2 { top: 50%; left: 2%; transform: translateY(-50%); }
  .pos-3 { top: 50%; right: 2%; transform: translateY(-50%); }
  
  /* Bottom row */
  .pos-4 { bottom: 5%; left: 10%; }
  .pos-5 { bottom: 5%; right: 10%; }
}

@media (max-width: 960px) {
  .podporujeme-section {
    padding: 60px 0;
  }
  .images-row {
    flex-wrap: wrap;
    gap: 20px !important;
  }
  .big-card {
    width: 100%;
    max-width: 500px;
    height: 280px;
    margin: 10px 0 !important;
  }
  .small-card {
    width: calc(50% - 20px);
    height: 180px;
  }
}


/* Division Cards Styles */
.division-card-link {
  text-decoration: none;
  display: block;
  height: 100%;
}
.division-card {
  position: relative;
  height: 480px;
  overflow: hidden;
  border-radius: 24px;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease;
}
.division-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25) !important;
}
.division-card-bg {
  position: absolute;
  inset: 0;
  height: 100%;
  transition: transform 0.8s ease;
}
.division-card:hover .division-card-bg {
  transform: scale(1.1);
}
.division-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%);
  transition: opacity 0.4s ease;
}
.division-card:hover .division-card-overlay {
  opacity: 0.8;
}
.division-card-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 2.5rem 2rem;
  color: white;
  text-align: center;
}
.division-card-title {
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
  transition: transform 0.4s ease;
  transform: translateY(20px);
}
.division-card:hover .division-card-title {
  transform: translateY(0);
}
.division-card-details {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.division-card:hover .division-card-details {
  opacity: 1;
  transform: translateY(0);
}
.division-card-subtitle {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #ffffff;
}
.division-card-description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #e2e8f0;
}

/* Smaller screens adjustments */
@media screen and (max-width: 900px) {
  .division-card {
    height: 320px;
    cursor: default;
  }
  .division-card:hover { 
    transform: none; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
  }
  .division-card:hover .division-card-overlay { opacity: 1; }
  .division-card:hover .division-card-bg { transform: none; }
  
  .division-card-title { transform: none; }
  .division-card-details { display: none !important; }
  .division-card-overlay { 
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%) !important; 
    opacity: 1 !important;
  }
  .division-card-content { 
    padding: 1.5rem 1.25rem !important; 
    justify-content: flex-end;
  }
  .division-card-title { 
    margin-bottom: 0; 
    transform: none !important;
  }
}
@media (max-width: 600px) {
  .small-card {
    width: 100%;
    height: 220px;
  }
}
</style>