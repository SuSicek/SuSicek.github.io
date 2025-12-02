<template>
  <v-sheet class="position-relative hero-shell" color="black">
    <v-carousel
      class="hero-carousel"
      v-model="current"
      hide-delimiters
      :show-arrows="false"
      cycle
      :interval="interval"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-img :src="slide.src" cover :alt="slide.alt" />
      </v-carousel-item>
    </v-carousel>
    <div class="hero-overlay d-flex flex-column justify-end">
      <div class="overlay-container">
        <slot>
          <h1 class="slideshow-title">UCHYTIL <span class="hero-highlight">s.r.o.</span></h1>
          <div class="slideshow-subtitle">
            Stavby, které <span class="hero-highlight">fungují</span>. Partnerství, které <span class="hero-highlight">trvá</span>
          </div>
        </slot>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: 'HeroCarousel',
  props: {
    slides: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 6000
    }
  },
  data() {
    return {
      current: 0
    }
  }
}
</script>

<style scoped>
.hero-shell {
  position: relative;
  width: 100%;
  min-height: clamp(450px, 60vh, 600px);
  height: clamp(450px, 60vh, 600px);
  border-radius: 0;
  overflow: hidden;
}
.hero-shell :deep(.v-carousel),
.hero-shell :deep(.v-window),
.hero-shell :deep(.v-carousel-item),
.hero-shell :deep(.v-img) {
  height: 100% !important;
}
.hero-shell :deep(.v-img) {
  background-position: center center !important;
  background-size: cover !important;
}
.hero-shell :deep(.v-img img) {
  object-fit: cover !important;
  object-position: center center !important;
  width: 100%;
  height: 100%;
}
.hero-carousel {
  height: 100%;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.25));
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
  margin: 0 0 0.8rem;
}
.slideshow-subtitle {
  color: #fff;
  font-size: clamp(1.4rem, 2.8vw, 2.2rem);
  font-weight: 600;
  line-height: 1.3;
}
.hero-highlight {
  color: #226ec4;
}

@media (max-width: 600px) {
  .hero-shell {
    min-height: clamp(420px, 75vh, 540px);
    height: clamp(420px, 75vh, 540px);
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
</style>
