<template>
  <div>
    <!-- Hero slideshow with overlay title/subtitle -->
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

    <!-- Stats section -->
    <v-container class="py-16">
      <v-row justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 text-md-h3 font-weight-bold">Naše čísla</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="3" v-for="s in stats" :key="s.label">
          <v-card flat class="text-center pa-6">
            <div class="text-h4 text-md-h3 font-weight-bold text-primary mb-1">{{ s.number }}+</div>
            <div class="text-body-1">{{ s.label }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Divisions section -->
    <v-container class="py-16">
      <v-row justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 text-md-h3 font-weight-bold">Naše divize</h2>
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

    <!-- References header + CTA (dark section) -->
    <v-sheet color="#0a2742" class="py-16">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <h2 class="text-h4 text-md-h3 font-weight-bold text-white mb-6">Reference</h2>
            <v-btn color="white" variant="outlined" :to="{ name: 'References' }">
              <v-icon start>mdi-image-multiple-outline</v-icon>
              Zobrazit galerii referencí
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Contact CTA -->
    <v-container class="py-16">
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="8">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-2">Spojte se s námi</h2>
          <p class="text-body-1">Rádi s vámi probereme váš projekt a navrhneme nejlepší řešení.</p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-right">
          <v-btn color="primary" size="large" :to="{ name: 'ContactUs' }">
            Kontaktujte nás
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
  
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      currentSlide: 0,
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
  }
}
</script>

<style scoped>
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
</style>