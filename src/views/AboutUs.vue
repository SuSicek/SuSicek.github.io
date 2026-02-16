<template>
  <div>
    <!-- Hero with static image -->
    <v-sheet class="position-relative hero-shell" color="black">
      <v-img 
        src="/fotky/energetika.png" 
        alt="O nás" 
        cover 
        class="hero-image"
      />
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
        <v-img src="/fotky/kontejner.png" cover class="stats-bg" />
        <div class="stats-overlay"></div>
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

    <!-- Podporujeme Section -->
    <div class="podporujeme-section position-relative py-16">
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
        <h2 class="text-h3 font-weight-bold mb-4">Podporujeme</h2>
        <p class="text-h6 mb-12 font-weight-regular text-grey-lighten-3" style="max-width: 800px; margin: 0 auto; line-height: 1.6;">
          Pomáháme tam, kde je to potřeba. Podporujeme charitativní projekty, místní komunity a lidi, kteří se ocitli v těžké životní situaci.
        </p>

        <div class="d-flex align-center justify-center images-row">
          <v-card class="support-card small-card" elevation="4">
            <v-img src="/fotky/energetika.png" cover class="fill-height"></v-img>
          </v-card>
          
          <v-card class="support-card big-card mx-6" elevation="10">
            <v-img src="/fotky/kontejner.png" cover class="fill-height"></v-img>
          </v-card>
          
          <v-card class="support-card small-card" elevation="4">
            <v-img src="/fotky/energetika.png" cover class="fill-height"></v-img>
          </v-card>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      stats: [
        { number: 32 , label: 'Let na trhu' },
        { number: 4100, label: 'Dokončených projektů' },
        { number: 300, label: 'Spokojených klientů' },
        { number: 150, label: 'Odborníků v týmu' }
      ],
      animatedStats: {
        'Let na trhu': 0,
        'Dokončených projektů': 0,
        'Spokojených klientů': 0,
        'Odborníků v týmu': 0
      },
      hasAnimated: false
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
/* Hero section */
.hero-shell {
  position: relative;
  min-height: 520px;
  height: clamp(520px, 75vh, 720px);
  border-radius: 0;
  overflow: hidden;
}
.hero-image {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 1;
}
.hero-shell :deep(.hero-image .v-img__img--cover) {
  object-fit: cover !important;
  object-position: center center !important;
  width: 100% !important;
  height: 100% !important;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.25));
  z-index: 2;
  pointer-events: none;
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
  color: #031f68;
}

@media (max-width: 960px) {
  .hero-shell {
    height: clamp(460px, 70vh, 640px);
  }
}

@media (max-width: 600px) {
  .hero-shell {
    height: 420px;
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
.stats-bg {
  position: absolute;
  inset: 0;
}
.stats-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.7));
}
.stats-card {
  background: rgba(0, 0, 0, 0.7) !important;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 140px;
  animation: enlighten 4s ease-in-out infinite;
}
@keyframes enlighten {
  0%, 100% {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 0 8px 20px rgba(3, 31, 104, 0.4);
  }
}
.stats-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}
.stat-number {
  font-weight: 900 !important;
  color: #ffffff !important;
}
.stat-label {
  color: #ffffff;
  font-weight: 500;
}

/* Podporujeme Section */
.podporujeme-section {
  overflow: hidden;
  background-color: #1a1a1a;
  min-height: 600px;
  display: flex;
  align-items: center;
}
.collage-bg {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  transform: rotate(-2deg) scale(1.1);
  width: 110%;
  height: 110%;
  left: -5%;
  top: -5%;
  gap: 8px;
}
.collage-item {
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}
.collage-item:hover {
  filter: grayscale(0%);
}
.collage-item.item-1 { background-image: url('/fotky/energetika.png'); }
.collage-item.item-2 { background-image: url('/fotky/kontejner.png'); }
.collage-item.item-3 { background-image: url('/fotky/energetika.png'); }
.collage-item.item-4 { background-image: url('/fotky/kontejner.png'); }
.collage-item.item-5 { background-image: url('/fotky/energetika.png'); }
.collage-item.item-6 { background-image: url('/fotky/kontejner.png'); }

.section-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(3, 31, 104, 0.6), rgba(0, 0, 0, 0.85));
  z-index: 1;
}
.z-index-2 { z-index: 2; }

/* Images Row */
.images-row {
  margin-top: 2rem;
}
.support-card {
  overflow: hidden;
  border-radius: 12px;
  transition: all 0.4s ease;
  position: relative;
}
.support-card .v-img {
  transition: transform 0.6s ease;
}
.support-card:hover .v-img {
  transform: scale(1.1);
}

.small-card {
  width: 280px;
  height: 200px;
  opacity: 0.9;
}
.small-card:hover {
  opacity: 1;
  transform: translateY(-5px);
  z-index: 3;
}

.big-card {
  width: 400px;
  height: 300px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  z-index: 3;
}
.big-card:hover {
  transform: scale(1.02);
  border-color: rgba(255, 255, 255, 0.8);
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
    /* On mobile, stack them? Or keep layout if possible? */
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

@media (max-width: 600px) {
  .small-card {
    width: 100%;
    height: 220px;
  }
}
</style>