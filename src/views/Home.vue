<template>
  <main>
    <div id="scroll-animate">
      <div id="scroll-animate-main">
        <div class="wrapper-parallax">
          <section class="header-parallax">
            <section class="hero-section" id="home">
              <div class="slideshow" ref="slideshowRef">
                <div 
                  v-for="(slide, index) in slides" 
                  :key="index"
                  class="slide"
                  :class="{ active: currentSlide === index }"
                  :data-subtitle="'Profesionální řešení na klíč'"
                >
                  <img :src="slide.image" :alt="`Slide ${index + 1}`" class="slide__img">
                  <div class="slide__text">
                    <div class="slide__subtitle">Profesionální řešení na klíč</div>
                  </div>
                </div>
              </div>
              <div class="slideshow-overlay">
                <h1 class="slideshow-title">UCHYTIL s.r.o.</h1>
                <div class="slideshow-subtitle">Stavby, které fungují. Partnerství, které trvá</div>
              </div>
            </section>
          </section>

          <!-- Company Stats Section -->
          <section class="stats-section">
            <div class="container">
              <div class="about-intro center reveal">
                <h2>Naše čísla</h2>
              </div>
              <div class="stats compact">
                <div 
                  v-for="stat in stats" 
                  :key="stat.label"
                  class="stat-card"
                >
                  <div class="stat-content">
                    <div class="stat-number" :data-count="stat.count">{{ stat.animatedValue }}</div>
                    <div class="stat-label">{{ stat.label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Divisions Section -->
          <section class="about-section divisions-section">
            <div class="container">
              <div class="about-intro center reveal">
                <h2>Naše divize</h2>
              </div>

              <div class="team-grid">
                <router-link 
                  v-for="division in divisions"
                  :key="division.id"
                  :to="`/division/${division.id}`"
                  class="team-card reveal"
                  :aria-label="`Otevřít divizi ${division.name}`"
                >
                  <img :src="division.image" :alt="division.name" loading="lazy">
                  <div class="card-texts">
                    <h3>{{ division.name }}</h3>
                    <div class="subtitle">{{ division.subtitle }}</div>
                  </div>
                  <p>{{ division.description }}</p>
                </router-link>
              </div>
            </div>
          </section>

          <!-- References Section -->
          <section class="references compact" id="references">
            <div class="container">
              <p class="section-subtitle">{{ referencesData.subtitle }}</p>
              <h2 class="h2 section-title">{{ referencesData.title }}</h2>
              <p class="section-text" style="color:#fff;">{{ referencesData.description }}</p>

              <div class="references-grid">
                <div 
                  v-for="reference in featuredReferences"
                  :key="reference.id"
                  class="reference-card"
                >
                  <img :src="reference.image" :alt="reference.imageAlt" loading="lazy">
                  <div class="reference-content">
                    <h3>{{ reference.title }}</h3>
                    <div class="reference-meta">
                      <span class="reference-category">{{ reference.category }}</span>
                      <span class="reference-year">{{ reference.year }}</span>
                    </div>
                    <p>{{ reference.description }}</p>
                  </div>
                </div>
              </div>
              
              <div class="references-cta">
                <div class="cta-buttons">
                  <router-link to="/references" class="btn btn-gallery">
                    <span class="btn-icon">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;">
                        <rect x="3" y="6" width="16" height="10" rx="2" stroke="#fff" stroke-width="2" fill="none"/>
                        <circle cx="8" cy="11" r="2" stroke="#fff" stroke-width="2" fill="none"/>
                        <path d="M14 10L17 14" stroke="#fff" stroke-width="2"/>
                        <path d="M10 14L12 12" stroke="#fff" stroke-width="2"/>
                      </svg>
                    </span>
                    <span class="btn-text">Zobrazit galerii referencí</span>
                  </router-link>
                </div>
              </div>
            </div>
          </section>

          <!-- Contact Section -->
          <section class="cta" id="contact">
            <div class="container">
              <div class="cta-content">
                <p class="section-subtitle">{{ contactData.subtitle }}</p>
                <h2 class="h2 section-title">{{ contactData.title }}</h2>
                <p class="section-text">{{ contactData.description }}</p>
              </div>

              <router-link :to="contactData.buttonLink" class="btn btn-secondary">
                {{ contactData.buttonText }}
              </router-link>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import contentData from '../../data/content.json'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'Home',
  setup() {
    const slideshowRef = ref(null)
    const currentSlide = ref(0)
    
    const slides = ref([])
    const stats = ref([
      { count: 30, label: 'Let na trhu +', animatedValue: 0 },
      { count: 650, label: 'Dokončených projektů +', animatedValue: 0 },
      { count: 300, label: 'Spokojených klientů +', animatedValue: 0 },
      { count: 120, label: 'Odborníků v týmu +', animatedValue: 0 }
    ])
    
    const divisions = ref([
      {
        id: 'energetika',
        name: 'Energetika',
        subtitle: 'Výroba a úspory energií',
        description: 'Zajišťuje komplexní služby v oblasti výroby, distribuce a úspor energií.',
        image: '/fotky/prodejna.png'
      },
      {
        id: 'stavba',
        name: 'Stavba',
        subtitle: 'Kompletní stavební projekty',
        description: 'Realizuje stavební projekty od návrhu po dokončení s důrazem na kvalitu a termíny.',
        image: '/fotky/stavba.png'
      },
      {
        id: 'tzb',
        name: 'TZB',
        subtitle: 'Technická zařízení budov',
        description: 'Poskytuje odborné řešení technických zařízení budov pro komfort, efektivitu a bezpečnost.',
        image: '/fotky/energetika.png'
      },
      {
        id: 'eshop',
        name: 'E-shop',
        subtitle: 'Online prodej a technika',
        description: 'Online prodej materiálu, příslušenství a techniky pro vaše projekty.',
        image: '/fotky/kontejner.png'
      }
    ])

    const referencesData = ref({
      subtitle: 'naše realizace',
      title: 'Reference a dokončené projekty',
      description: 'Podívejte se na některé z našich úspěšně dokončených projektů, které demonstrují naši odbornost a kvalitu práce v různých odvětvích stavebnictví a energetiky.'
    })

    const contactData = ref({
      subtitle: 'líbí se vám naše práce?',
      title: 'Kontaktujte nás pro více informací!',
      description: 'Těšíme se na naši budoucí spolupráci',
      buttonText: 'Kontaktujte nás!',
      buttonLink: '/contact-us'
    })

    const featuredReferences = ref([])

    const initSlideshow = () => {
      if (contentData.hero && contentData.hero.slides) {
        slides.value = contentData.hero.slides
        startSlideshow()
      }
    }

    const startSlideshow = () => {
      // Mouse movement parallax effect
      const UPDATE = ({ x, y }) => {
        const xNorm = (x / window.innerWidth - 0.5) * 2;
        const yNorm = (y / window.innerHeight - 0.5) * 2;
        
        document.querySelectorAll('.slide.active').forEach(slide => {
          slide.style.setProperty('--x', xNorm);
          slide.style.setProperty('--y', yNorm);
        });
      };

      window.addEventListener('mousemove', UPDATE);
      
      // Auto slideshow
      setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.value.length
      }, 5000)
    }

    const animateStats = () => {
      // Use intersection observer like the original
      const counters = document.querySelectorAll('.stat-number[data-count]');
      if (!counters.length) return;
      
      const co = new IntersectionObserver((ents) => {
        ents.forEach(ent => {
          if (!ent.isIntersecting) return;
          const el = ent.target;
          const target = parseInt(el.dataset.count || '0', 10);
          const start = performance.now();
          const dur = 1000 + Math.min(2000, target * 15);
          function tick(ts) {
            const p = Math.min(1, (ts - start) / dur);
            el.textContent = Math.round(target * (0.2 + 0.8 * p));
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          co.unobserve(el);
        });
      }, { threshold: 0.4 });
      
      counters.forEach(el => co.observe(el));
    }

    const initAnimations = () => {
      // Initialize GSAP animations similar to original
      setTimeout(() => {
        animateStats();
        
        // Reveal animations - More comprehensive setup
        const reveals = document.querySelectorAll('.reveal')
        
        if (reveals.length > 0) {
          reveals.forEach((element, index) => {
            gsap.set(element, { 
              y: 50, 
              opacity: 0 
            })
            
            gsap.to(element, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            })
          })
        }

        // Add intersection observer for any missing animations
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        })

        document.querySelectorAll('.reveal, .team-card, .reference-card').forEach(el => {
          observer.observe(el)
        })
      }, 500);
    }

    onMounted(async () => {
      await nextTick()
      initSlideshow()
      initAnimations()
      
      // Load featured references from content.json
      if (contentData.references) {
        referencesData.value = {
          subtitle: contentData.references.subtitle,
          title: contentData.references.title,
          description: contentData.references.description
        }
        featuredReferences.value = contentData.references.projects || []
      }
      
      // Load contact data from content.json
      if (contentData.contact) {
        contactData.value = {
          subtitle: contentData.contact.subtitle,
          title: contentData.contact.title,
          description: contentData.contact.description,
          buttonText: contentData.contact.buttonText,
          buttonLink: '/contact-us'
        }
      }
    })

    return {
      slideshowRef,
      currentSlide,
      slides,
      stats,
      divisions,
      referencesData,
      contactData,
      featuredReferences
    }
  }
}
</script>

<style scoped>
/* Component-specific styles can go here */
/* Most styles will be inherited from global CSS files */
</style>