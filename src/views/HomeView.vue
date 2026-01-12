<template>
  <div>
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
          <h1 class="slideshow-title">UCHYTIL <span class="hero-highlight">s.r.o.</span></h1>
          <div class="slideshow-subtitle">Stavby, které <span class="hero-highlight">fungují</span>. Partnerství, které <span class="hero-highlight">trvá</span></div>
        </div>
      </div>
    </v-sheet>

    <!-- Stats section -->
    <div class="stats-wrapper">
      <v-sheet class="stats-section position-relative">
        <div class="stats-blue-bg"></div>
        <v-container class="py-8 position-relative">
          <v-row align="stretch">
            <v-col cols="6" md="3" v-for="s in stats" :key="s.label" class="d-flex">
              <v-card flat class="text-center pa-6 stats-card">
                <div class="text-h4 text-md-h3 mb-1 stat-number">{{ animatedStats[s.label] || 0 }}+</div>
                <div class="text-body-1 stat-label">{{ s.label }}</div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </div>

    <!-- Divisions section -->
    <v-container class="py-16">
      <v-row justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 text-md-h3 font-weight-bold">Naše divize</h2>
        </v-col>
      </v-row>
      <v-row class="division-cards-row">
        <v-col cols="6" sm="6" md="4" lg="3" v-for="d in divisions" :key="d.title" class="division-col">
          <router-link :to="d.link" class="division-card-link">
            <div class="division-card">
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

    <!-- References & CTA Wrapper -->
    <div class="references-wrapper position-relative">
      <!-- Shared Highlights (Orbs) covering both sections -->
      <div class="references-highlights" aria-hidden="true">
        <span class="orb orb-a"></span>
        <span class="orb orb-b"></span>
        <span class="orb orb-c"></span>
      </div>

      <!-- References Section -->
      <v-sheet class="references-section position-relative bg-transparent" color="transparent">
        <v-container class="py-16 position-relative references-content">
          <v-row class="mb-8">
            <v-col cols="12" class="text-center">
              <h2 class="text-h4 text-md-h3 font-weight-bold text-white mb-6">Naše Reference</h2>
            </v-col>
          </v-row>
          <v-row class="references-cards-row">
            <v-col cols="4" sm="6" lg="4" v-for="ref in featuredReferences" :key="ref.id" class="reference-col">
              <router-link :to="{ name: 'ReferenceDetail', params: { id: ref.id } }" class="reference-card-link">
                <div class="reference-card">
                  <v-img :src="ref.image" :alt="ref.title" cover class="reference-card-bg" />
                  <div class="reference-card-overlay"></div>
                  <div class="reference-card-content">
                    <h3 class="reference-card-title">{{ ref.title }}</h3>
                    <div class="reference-card-details">
                      <p class="reference-card-division">{{ ref.division }}</p>
                      <p class="reference-card-short">{{ ref.short }}</p>
                    </div>
                  </div>
                </div>
              </router-link>
            </v-col>
          </v-row>
          <v-row class="mt-8">
            <v-col cols="12" class="text-center">
              <v-btn color="white" variant="outlined" size="large" :to="{ name: 'References' }" class="refs-cta-btn">
                <v-icon start>mdi-image-multiple-outline</v-icon>
                <span class="d-inline-block text-wrap">Zobrazit všechny reference</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>

      <!-- Contact CTA Section (now inside the wrapper) -->
      <v-sheet class="cta-section py-16 position-relative bg-transparent" elevation="0" color="transparent">
        <div class="cta-bg-image"></div>
        <div class="cta-overlay"></div>
        <v-container class="position-relative z-2">
          <v-row justify="center" align="center">
            <v-col cols="12" md="10" lg="8" class="text-center">
              <div class="cta-content-wrapper pa-8 pa-md-12 rounded-xl">
                <h2 class="text-h4 text-md-h3 font-weight-bold mb-4 text-white">Máte projekt?</h2>
                <p class="text-h6 text-md-h5 mb-8 text-white opacity-90 font-weight-regular">
                  Od první konzultace až po finální realizaci – jsme připraveni proměnit vaše vize ve skutečnost.
                </p>
                <div class="d-flex justify-center flex-wrap gap-4">
                  <v-btn 
                    color="white" 
                    size="x-large" 
                    :to="{ name: 'ContactUs' }" 
                    class="cta-primary-btn px-8 text-primary font-weight-bold"
                    elevation="3"
                  >
                    Nezávazně poptat
                    <v-icon end icon="mdi-arrow-right" class="ml-2"></v-icon>
                  </v-btn>
                  <v-btn 
                    variant="outlined" 
                    color="white" 
                    size="x-large" 
                    href="tel:+420545423211"
                    class="cta-secondary-btn px-6 font-weight-bold"
                  >
                    <v-icon start icon="mdi-phone"></v-icon>
                    +420 545 423 211
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </div>
  </div>
  
</template>

<script>
import { useReferences } from '@/composables/useReferences'

export default {
  name: 'HomeView',
  data() {
    return {
      currentSlide: 0,
      slides: [
        { src: '/fotky/trubkyvykop.png', alt: 'Trubky výkop' },
        { src: '/fotky/modrozlutakotelna.png', alt: 'Modrožlutá kotelna' },
        { src: '/fotky/sedetrubky.png', alt: 'Sedé trubky' },
        { src: '/fotky/energetika.png', alt: 'Energetika' }
      ],
      stats: [
        { number: 30, label: 'Let na trhu' },
        { number: 650, label: 'Dokončených projektů' },
        { number: 300, label: 'Spokojených klientů' },
        { number: 120, label: 'Odborníků v týmu' }
      ],
      animatedStats: {
        'Let na trhu': 0,
        'Dokončených projektů': 0,
        'Spokojených klientů': 0,
        'Odborníků v týmu': 0
      },
      hasAnimated: false,
      divisions: [
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
    }
  },
  computed: {
    featuredReferences() {
      const { references } = useReferences()
      const divisions = ['Energetika', 'Stavba', 'TZB']
      const featured = []
      
      divisions.forEach(division => {
        const divRefs = references.value
          .filter(r => r.division === division)
          .sort((a, b) => b.year - a.year)
        if (divRefs.length > 0) {
          featured.push(divRefs[0])
        }
      })
      
      return featured
    }
  },
  mounted() {
    this.observeStats()
  },
  methods: {
    observeStats() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true
            this.animateNumbers()
          }
        })
      }, { threshold: 0.5 })

      const statsSection = document.querySelector('.stats-section')
      if (statsSection) {
        observer.observe(statsSection)
      }
    },
    animateNumbers() {
      this.stats.forEach(stat => {
        const duration = 2000
        const steps = 60
        const increment = stat.number / steps
        let current = 0
        
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.number) {
            this.animatedStats[stat.label] = stat.number
            clearInterval(timer)
          } else {
            this.animatedStats[stat.label] = Math.floor(current)
          }
        }, duration / steps)
      })
    }
  }
}
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
  /* Simplify reference cards on small screens: remove hover details and shorten cards */
  .reference-card {
    height: 260px;
    transition: none;
    cursor: default;
  }
  .reference-card:hover { transform: none; }
  .reference-card-overlay { background: rgba(0,0,0,0.45) !important; transition: none !important; }
  .reference-card-details { display: none !important; }
  .reference-card-title { font-size: clamp(1.05rem, 4.5vw, 1.45rem); margin-bottom: 0.5rem; }
  .hero-shell {

@media (max-width: 900px) {
  /* also apply simplified behavior for medium screens */
  .reference-card {
    height: 320px;
    transition: none;
    cursor: default;
  }
  .reference-card:hover { transform: none; }
  .reference-card-overlay { background: rgba(0,0,0,0.45) !important; transition: none !important; }
  .reference-card-details { display: none !important; }
  .reference-card-title { font-size: clamp(1.15rem, 3.6vw, 1.6rem); }
}
    height: auto;
    min-height: 420px;
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

/* Stats section with background */
.stats-wrapper {
  padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 5vw, 4rem);
  background: #f8fafc;
}
.stats-section {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}
.stats-blue-bg {
  position: absolute;
  inset: 0;
  background-color: #031f68;
}
.stats-blue-bg::before {
  content: '';
  position: absolute;
  top: 6%;
  left: 4%;
  width: 500px;
  height: 500px;
  background-image:
    radial-gradient(circle at 20% 28%, rgba(180,220,255,0.7) 0%, rgba(150,200,255,0.4) 30%, transparent 66%),
    radial-gradient(circle at 62% 20%, rgba(150,200,255,0.6) 0%, rgba(150,200,255,0.3) 28%, transparent 68%),
    radial-gradient(circle at 40% 60%, rgba(180,220,255,0.55) 0%, rgba(150,200,255,0.25) 35%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: subtlePulse 8s ease-in-out infinite;
}
.stats-blue-bg::after {
  content: '';
  position: absolute;
  bottom: 6%;
  right: 6%;
  width: 550px;
  height: 550px;
  background-image:
    radial-gradient(circle at 12% 68%, rgba(150,200,255,0.65) 0%, rgba(150,200,255,0.35) 28%, transparent 66%),
    radial-gradient(circle at 72% 40%, rgba(180,220,255,0.55) 0%, rgba(180,220,255,0.25) 26%, transparent 66%),
    radial-gradient(circle at 50% 50%, rgba(180,220,255,0.5) 0%, rgba(150,200,255,0.22) 30%, transparent 68%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: subtlePulse 10s ease-in-out infinite;
}
.stats-card {
  background: rgba(255, 255, 255, 0.95) !important;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 160px;
}
.stats-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}
.stat-number {
  font-weight: 900 !important;
  color: #031f68 !important;
}
.stat-label {
  color: #1e293b;
  font-weight: 500;
}

/* Division cards */
.division-cards-row {
  gap: 0 !important;
  margin: 0 -4px;
}
.division-col {
  padding: 0 2px 4px !important;
}
.division-card-link {
  text-decoration: none;
  display: block;
  height: 100%;
}
.division-card {
  position: relative;
  height: 500px;
  overflow: hidden;
  border-radius: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.division-card:hover {
  transform: translateY(-8px);
}
.division-card-bg {
  position: absolute;
  inset: 0;
  height: 100%;
}
.division-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: background 0.4s ease;
}
.division-card:hover .division-card-overlay {
  background: rgba(0, 0, 0, 0.2);
}
.division-card-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;
  text-align: center;
}
.division-card-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  transition: transform 0.4s ease;
}
.division-card:hover .division-card-title {
  transform: translateY(-20px);
}

/* Smaller screens: make division cards shorter and disable hover effects */
@media screen and (max-width: 900px) {
  .division-card {
    height: 320px;
    transition: none;
    cursor: default;
  }
  .division-card:hover { transform: none; }
  .division-card:hover .division-card-overlay { background: rgba(0,0,0,0.5); }
  .division-card-title { transform: none; }
  /* Remove detailed info and simplify layout on small screens */
  .division-card-details { display: none !important; }
  .division-card-overlay { background: rgba(0,0,0,0.55) !important; transition: none !important; }
  .division-card-content { padding: 1rem !important; }
  .division-card-title { font-size: clamp(1.35rem, 4.2vw, 1.9rem); margin-bottom: 0.5rem; }
}

@media screen and (max-width: 600px) {
  .division-card { height: 260px; }
  .division-card-title { font-size: clamp(1.15rem, 5.0vw, 1.6rem); }
}
.division-card-details {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
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

/* References & CTA shared wrapper */
.references-wrapper {
  background: #031f68;
  position: relative;
  overflow: hidden;
}
.references-section {
  position: relative;
  /* overflow: hidden; removed to allow shared highlights */
}
.references-section::before {
  display: none !important; 
}
.references-section::after { display: none !important; }
.references-section .py-16::before { display: none !important; }

/* Highlights container (placed behind content but above background) */
.references-highlights { position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
.references-highlights .orb { position: absolute; border-radius: 50%; background-repeat: no-repeat; mix-blend-mode: overlay; opacity: 0.9; animation: subtlePulse 5s ease-in-out infinite; }
.references-highlights .orb-a { top: -5%; left: -10%; width: 140%; height: 80%; background: radial-gradient(circle at 35% 35%, rgba(180,220,255,0.28) 0%, rgba(180,220,255,0.08) 35%, rgba(180,220,255,0.00) 70%); }
.references-highlights .orb-b { top: 45%; right: -10%; width: 140%; height: 80%; background: radial-gradient(circle at 65% 65%, rgba(150,200,255,0.26) 0%, rgba(150,200,255,0.07) 35%, rgba(150,200,255,0.00) 70%); }
.references-highlights .orb-c { bottom: -10%; left: -20%; width: 140%; height: 80%; background: radial-gradient(circle at 40% 60%, rgba(180,220,255,0.3) 0%, rgba(180,220,255,0.1) 40%, rgba(180,220,255,0.00) 80%); }

/* ensure content sits above the highlights */
.references-content { position: relative; z-index: 2; }
.z-2 { z-index: 2; }

/* subtle pulsing used by blue highlight overlays in references */
@keyframes subtlePulse {
  0% { opacity: 0.65; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1.02); }
  100% { opacity: 0.65; transform: scale(0.98); }
}
.references-bg {
  position: absolute;
  inset: 0;
}
.references-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.2));
}
.references-cards-row {
  gap: 0 !important;
  margin: 0 -8px;
}
.reference-col {
  padding: 0 8px !important;
}
.reference-card-link {
  text-decoration: none;
  display: block;
  height: 100%;
}
.reference-card {
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.reference-card:hover {
  transform: translateY(-8px);
}
.reference-card-bg {
  position: absolute;
  inset: 0;
  height: 100%;
}
.reference-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.4s ease;
}
.reference-card:hover .reference-card-overlay {
  background: rgba(0, 0, 0, 0.15);
}
.reference-card-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;
  text-align: center;
}
.reference-card-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin-bottom: 1rem;
  transition: transform 0.4s ease;
}
.reference-card:hover .reference-card-title {
  transform: translateY(-15px);
}
.reference-card-details {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.reference-card:hover .reference-card-details {
  opacity: 1;
  transform: translateY(0);
}
.reference-card-division {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.reference-card-short {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #e2e8f0;
}

/* Responsive button for mobile */
.refs-cta-btn {
  height: auto !important;
  min-height: 48px;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  max-width: 90vw;
}
.refs-cta-btn .v-btn__content {
  white-space: normal;
  line-height: 1.2;
}

@media (max-width: 600px) {
  .references-cards-row {
    margin: 0 -4px;
  }
  .reference-col {
    padding: 0 4px 8px !important;
  }
  .reference-card {
    height: 280px;
  }
  .reference-card-content {
    padding: 1.25rem;
  }
  .reference-card-title {
    font-size: clamp(1.1rem, 4vw, 1.4rem);
  }
  .reference-card-division {
    font-size: 1rem;
  }
  .reference-card-short {
    font-size: 0.85rem;
  }
}

/* Redesigned CTA Section */
.cta-section {
  /* background-color: #000; removed, handled by wrapper */
  overflow: hidden;
}
.cta-bg-image {
  position: absolute;
  inset: 0;
  /* Ensure background image is below the highlights */
  z-index: 0; 
  background-image: url('/fotky/trubkyvykop.png');
  background-size: cover;
  background-position: center;
  filter: grayscale(30%);
  opacity: 0.6;
  /* Fade in from top to blend with previous section */
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
  mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
}
.cta-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(135deg, rgba(3, 31, 104, 0.85) 0%, rgba(3, 31, 104, 0.75) 100%);
  /* Fade in from top to blend with previous section */
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
  mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
}
.cta-content-wrapper {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}
.cta-primary-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  letter-spacing: 0.5px;
  color: #031f68 !important; /* Ensure text is brand blue */
}
.cta-primary-btn .v-btn__content {
  color: #031f68 !important;
}
.cta-primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15) !important;
}
.cta-secondary-btn {
  border-width: 2px;
  transition: background-color 0.2s ease;
}
.cta-secondary-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.gap-4 {
  gap: 16px;
}
.z-1 {
  z-index: 1;
}
</style>