
<template>
  <div>
    <!-- Hero slideshow with overlay title/subtitle -->
    <HeroCarousel :slides="slides" />
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
  </div>
</template>

<script>
import HeroCarousel from '@/components/HeroCarousel.vue'

export default {
  name: 'AboutUs',
  components: { HeroCarousel },
  data() {
    return {
      slides: [
        { src: '/fotky/energetika.png', alt: 'Energetika' },
        { src: '/fotky/stavba.png', alt: 'Stavba' },
        { src: '/fotky/prodejna.png', alt: 'Prodejna' }
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
</style>