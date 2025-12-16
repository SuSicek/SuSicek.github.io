<template>
  <v-container fluid class="py-0 px-0 division-view-root">
    <!-- Hero redesigned -->
    <header class="division-hero" :style="heroStyle" role="banner" aria-label="Hero">
      <div class="hero-inner">
        <div class="hero-pill">{{ current.key.toUpperCase() }}</div>
        <h1 class="hero-title">{{ current.title }}</h1>
        <p class="hero-subtitle">{{ current.subtitle }}</p>
      </div>
      <div class="hero-gradient"></div>
    </header>

    <!-- Intro -->
    <section class="division-intro" aria-labelledby="division-intro-heading">
      <v-container fluid class="py-10">
        <div class="intro-head">
          <div class="intro-kicker">Naše divize</div>
          <h2 id="division-intro-heading" class="intro-title">{{ current.title }}</h2>
          <p class="intro-subtitle">{{ current.subtitle }}</p>
        </div>
        <div class="intro-body">
          <p v-for="(p,i) in descriptionParagraphs" :key="i" class="intro-paragraph">{{ p }}</p>
        </div>
      </v-container>
    </section>

    <!-- Services -->
    <section class="division-services dark" aria-labelledby="services-heading" :style="servicesBgStyle">
      <v-container fluid class="py-8 px-6 px-sm-8 px-md-10">
        <h3 id="services-heading" class="section-heading services-heading-contrast">Služby divize</h3>
        <v-row dense>
          <v-col v-for="(s, idx) in current.services" :key="idx" cols="12" sm="6" md="4" lg="3">
            <v-card class="service-card" elevation="6" rounded="lg" :aria-label="'Služba: ' + s.title">
              <v-card-text class="d-flex flex-column">
                <div class="service-icon-wrapper">
                  <div class="service-icon-gradient" />
                  <v-icon :icon="iconToMdi(s.icon)" size="30" color="white" />
                </div>
                <h4 class="service-title">{{ s.title }}</h4>
                <p class="service-desc" style="white-space: pre-line">{{ s.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Projects -->
    <section class="division-projects" aria-labelledby="projects-heading">
      <v-container fluid class="py-10 px-6 px-sm-8 px-md-10">
        <h3 id="projects-heading" class="section-heading">Vybrané projekty</h3>
        <v-row dense>
          <v-col v-for="(p, idx) in displayProjects" :key="idx" cols="12" sm="6" md="4">
            <v-card 
              class="project-card" 
              elevation="6" 
              rounded="lg" 
              :aria-label="'Projekt: ' + p.title"
              :to="p.id ? { name: 'ReferenceDetail', params: { id: p.id } } : undefined"
              hover
            >
              <v-img :src="p.image" height="200" cover :alt="p.title" class="project-image" />
              <v-card-text>
                <div class="d-flex align-center justify-space-between mb-2">
                  <v-chip color="primary" size="small" label>{{ p.year }}</v-chip>
                  <v-icon v-if="p.id" size="small" color="primary">mdi-open-in-new</v-icon>
                </div>
                <h4 class="project-title">{{ p.title }}</h4>
                <p class="project-desc">{{ p.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center mt-6">
          <v-btn :to="referencesRoute" color="primary" variant="flat" size="large" class="projects-cta-btn">{{ current.projectsCta?.text || 'Zobrazit všechny projekty' }}</v-btn>
        </div>
      </v-container>
    </section>

    <!-- CTA band (optional) -->
    <section v-if="current.cta && (current.cta.title || current.cta.text)" class="division-cta-band" aria-labelledby="cta-heading">
      <v-container fluid class="py-8 px-6 px-sm-8 px-md-10 d-flex align-center justify-space-between flex-wrap">
        <div class="cta-copy">
          <h3 id="cta-heading" class="cta-title">{{ current.cta.title }}</h3>
          <p class="cta-text">{{ current.cta.text }}</p>
        </div>
        <v-btn :href="current.cta.buttonLink || '/contact-us'" color="white" variant="outlined" class="cta-btn">{{ current.cta.buttonText || 'Kontakt' }}</v-btn>
      </v-container>
    </section>
  </v-container>
</template>

<script>
import { divisions, normalizeDivisionSlug, iconToMdi } from '../data/divisions'
import { useReferences, divisionKeyToName } from '../composables/useReferences'

export default {
  name: 'DivisionView',
  props: {
    division: { type: String, required: true }
  },
  data() {
    const normalized = normalizeDivisionSlug(this.division)
    return {
      currentKey: normalized
    }
  },
  computed: {
    current() {
      return divisions[this.currentKey] || divisions.energetika
    },
    referencesRoute() {
      // Link to References page with division preselected via query param
      return { name: 'References', query: { division: divisionKeyToName(this.currentKey) || undefined } }
    },
    heroStyle() {
      const img = this.current.heroImage
      return {
        background: `linear-gradient(0deg, rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url('${img}') center/cover no-repeat`
      }
    },
    descriptionParagraphs() {
      return String(this.current.description || '').split(/\n+/).filter(Boolean)
    },
    displayProjects() {
      // Pull from shared references composable used by the References page
      if (!this._refs) {
        this._refs = useReferences()
      }
      const name = divisionKeyToName(this.currentKey)
      const all = this._refs.filterByDivisionKey(this.currentKey)
      if (all && all.length) {
        // Sort by year descending and take top 3 newest
        const sorted = [...all].sort((a, b) => (b.year || 0) - (a.year || 0))
        return sorted.slice(0, 3).map(p => ({
          id: p.id,
          title: p.title,
          description: p.short || p.description || '',
          image: p.image,
          year: p.year
        }))
      }
      // Fallback to division-local projects if no matches
      return this.current.projects || []
    },
    servicesBgStyle() {
      // Use blue theme background instead of a hero image
      return {
        background: '#031f68'
      }
    }
  },
  watch: {
    division(newVal) {
      const normalized = normalizeDivisionSlug(newVal)
      if (normalized !== this.currentKey) {
        this.currentKey = normalized
      }
      // Keep the URL canonical
      if (newVal !== normalized) {
        this.$router.replace({ name: 'Division', params: { division: normalized } })
      }
    }
  },
  methods: {
    iconToMdi,
    
  }
}
</script>

<style scoped>
.division-view-root { --section-max-width: 1400px; }
.division-hero {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* Increase side paddings to keep text more toward center on wide screens */
  padding: clamp(2rem, 6vw, 4.5rem) clamp(1.25rem, 10vw, 12rem);
  color: #fff;
  overflow: hidden;
}
.hero-gradient {
  position: absolute; inset: 0;
  background: linear-gradient(120deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.2) 70%);
  pointer-events: none;
}
.hero-inner { position: relative; z-index: 1; max-width: 760px; }
.hero-pill {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.14);
  backdrop-filter: blur(6px);
  font-size: .75rem;
  letter-spacing: 2px;
  font-weight: 600;
  margin-bottom: 1rem;
}
.hero-title { font-size: clamp(2.6rem, 5.5vw, 3.8rem); font-weight: 800; line-height: 1.05; margin: 0 0 .8rem; }
.hero-subtitle { font-size: clamp(1rem, 2.2vw, 1.3rem); opacity: .92; margin: 0 0 1.6rem; }

.division-intro { background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); }
.division-intro :deep(.v-container) {
  /* Mirror hero side padding to keep content centered on large screens */
  padding-left: clamp(1.25rem, 10vw, 12rem) !important;
  padding-right: clamp(1.25rem, 10vw, 12rem) !important;
}
.intro-head { max-width: 900px; }
.intro-kicker { text-transform: uppercase; letter-spacing: 3px; font-weight: 700; color: #031f68; opacity: .9; }
.intro-title { font-weight: 800; font-size: clamp(2rem,4.5vw,3rem); color: #1e293b; margin: .3rem 0 .5rem; }
.intro-subtitle { font-size: 1.1rem; color: #475569; margin-bottom: 1.4rem; }
.intro-paragraph { color: #475569; line-height: 1.7; font-size: 1.02rem; margin-bottom: 1rem; }

 .division-services { background: linear-gradient(135deg, #ffffff 0%, #f1f7ff 100%); }
 .division-services.dark { color: #fff; background-color: #031f68; position: relative; overflow: hidden; }
 .division-services .v-container { position: relative; z-index: 1; }

 .division-services.dark::before {
  content: '';
  position: absolute;
  top: 8%;
  left: 6%;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(180,220,255,0.22) 0%, rgba(150,200,255,0.08) 40%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
 }
 .division-services.dark::after {
  content: '';
  position: absolute;
  bottom: 6%;
  right: 8%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(150,200,255,0.18) 0%, rgba(150,200,255,0.06) 35%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
 }
.division-services.dark .section-heading { color: #fff; }
/* Keep cards light on dark background */
.division-services.dark .service-card { background-color: #fff; color: #1e293b; }
.division-services.dark .service-card .service-title,
.division-services.dark .service-card .service-desc { color: #1e293b; }
.division-services.dark .service-card:hover { box-shadow: 0 18px 44px rgba(0,0,0,0.18); }
.services-heading-contrast { text-shadow: 0 4px 14px rgba(0,0,0,0.45); }
.section-heading { text-align: center; font-weight: 800; font-size: clamp(1.6rem,3vw,2.1rem); margin-bottom: 2.2rem; color: #031f68; }
.service-card { transition: transform .25s ease, box-shadow .25s ease; height: 100%; position: relative; }
.service-card:hover { transform: translateY(-6px); box-shadow: 0 18px 44px rgba(0,0,0,0.12); }
.service-icon-wrapper { position: relative; width: 60px; height: 60px; border-radius: 16px; display: grid; place-items: center; margin-bottom: 1rem; overflow: hidden; }
.service-icon-gradient { position: absolute; inset: 0; background: linear-gradient(135deg,#031f68,#1e3a8a); }
.service-title { font-weight: 700; margin: 0 0 .4rem; color: #1e293b; }
.service-desc { flex-grow: 1; color: #475569; line-height: 1.5; font-size: .95rem; }
.service-btn { margin-top: .6rem; }

.division-projects { background: linear-gradient(135deg,#eef6ff 0%,#ffffff 100%); }
.project-card { transition: transform .25s ease, box-shadow .25s ease; height: 100%; }
.project-card:hover { transform: translateY(-6px); box-shadow: 0 18px 44px rgba(0,0,0,0.12); }
.project-title { font-weight: 700; margin: .2rem 0 .4rem; color: #1e293b; }
.project-desc { color: #475569; line-height: 1.5; font-size: .95rem; }
.projects-cta-btn { margin-top: .5rem; }

.division-cta-band { background: linear-gradient(135deg,#031f68 0%,#1E3A8A 100%); color:#fff; }
.cta-copy { max-width: 640px; }
.cta-title { font-weight: 700; font-size: clamp(1.4rem,3vw,2rem); margin: 0 0 .6rem; }
.cta-text { margin: 0 0 1.2rem; line-height: 1.5; opacity: .92; }
.cta-btn { font-weight: 600; }

.prefooter-links { background: linear-gradient(135deg,#f8fafc 0%,#ffffff 100%); }
.prefooter-groups { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 2.2rem; }
.pf-group-title { text-transform: uppercase; font-size: .75rem; letter-spacing: 2px; font-weight: 700; color:#031f68; margin-bottom: .9rem; }
.pf-list { display: flex; flex-direction: column; gap: .6rem; }
.pf-card { text-decoration: none; background: #fff; padding: .9rem 1.1rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); transition: all .25s ease; }
.pf-card:hover { box-shadow: 0 10px 28px rgba(0,0,0,0.12); transform: translateY(-3px); }
.pf-title { margin: 0; font-size: .95rem; font-weight: 600; color:#1e293b; }

@media (max-width: 960px) {
  .hero-title { font-size: clamp(2.2rem,7vw,3.2rem); }
  .hero-actions { margin-top: .8rem; }
  .division-hero { min-height: 360px; }
}
@media (min-width: 1600px) {
  /* On very large screens, push content further from edges */
  .division-hero { padding-left: 16vw; padding-right: 16vw; }
}
@media (max-width: 680px) {
  .hero-inner { max-width: 100%; }
  .intro-paragraph { font-size: .94rem; }
  .pf-card { padding: .8rem 1rem; }
}

@media (min-width: 1600px) {
  .division-intro :deep(.v-container) {
    padding-left: 16vw !important;
    padding-right: 16vw !important;
  }
}
</style>
