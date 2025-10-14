<template>
  <main>
    <!-- Main slideshow, same as on index -->
    <section class="hero-section" id="home">
      <div class="slideshow">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="slide"
          :class="{ active: currentSlide === index }"
        >
          <img :src="slide.image" :alt="`Slide ${index + 1}`" class="slide__img">
        </div>
      </div>
      <div class="slideshow-overlay">
        <h1 class="slideshow-title">UCHYTIL s.r.o.</h1>
        <div class="slideshow-subtitle">Stavby, které fungují. Partnerství, které trvá</div>
      </div>
    </section>

    <!-- Contact page content -->
    <div class="contact-container no-bottom-bg">
      <!-- Leadership (redesigned with background strip) -->
      <section class="leadership-section-wrapper">
        <div class="leadership-strip">
          <div class="leadership-content container">
            <div class="section-title">
              <h2 class="section-title" id="leadership-title">Vedení společnosti</h2>
            </div>
            <div class="contact-grid leadership-grid" id="leadership-grid">
              <div class="contact-card leadership-card">
                <div class="card-top">
                  <span class="role-chip">Statutární zástupce – jednatel</span>
                  <h3 class="name">Josef UCHYTIL</h3>
                </div>
              </div>
              <div class="contact-card leadership-card">
                <div class="card-top">
                  <span class="role-chip">Ředitel společnosti</span>
                  <h3 class="name">Ing. Richard ŠTĚPÁN</h3>
                </div>
              </div>
              <div class="contact-card leadership-card">
                <div class="card-top">
                  <span class="role-chip">Asistentka ředitele</span>
                  <h3 class="name">Šárka ZÁBRŠOVÁ</h3>
                </div>
                <div class="contact-info">
                  <div><ion-icon name="mail-outline"></ion-icon><a href="mailto:sarka.zabrsova@uchytil.eu">sarka.zabrsova@uchytil.eu</a></div>
                  <div><ion-icon name="call-outline"></ion-icon><a href="tel:+420545423211">545 423 211</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Divisions Section (tabs with 3 cards each) -->
      <div class="divisions-section-wrapper">
        <div class="divisions-container">
          <div class="section-title"><h2 class="section-title" id="divisions-title">Kontaktujte naše divize</h2></div>
          <div class="div-tabs" role="tablist" aria-label="Divize">
            <button 
              v-for="(division, index) in divisions" 
              :key="index"
              class="div-tab" 
              :class="{ active: selectedDivision === index }"
              role="tab" 
              :aria-selected="selectedDivision === index"
              :aria-controls="`panel-${division.id}`"
              :id="`tab-${division.id}`"
              @click="selectDivision(index)"
            >
              <span>{{ division.name }}</span>
            </button>
          </div>
          <div class="div-panels">
            <div 
              v-for="(division, index) in divisions" 
              :key="index"
              :id="`panel-${division.id}`"
              role="tabpanel" 
              :aria-labelledby="`tab-${division.id}`"
              class="div-tab-panel"
              :class="{ active: selectedDivision === index }"
            >
              <div class="contact-grid">
                <div 
                  v-for="contact in division.contacts" 
                  :key="contact.role"
                  class="contact-card division-card"
                >
                  <div class="division-card-top">
                    <div class="division-badge">
                      <ion-icon :name="division.icon"></ion-icon>
                      <span>{{ division.name }}</span>
                    </div>
                    <h3>{{ contact.role }}</h3>
                  </div>
                  <div class="division-card-content">
                    <div class="contact-line">
                      <span class="contact-label">E-mail</span>
                      <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
                    </div>
                    <div class="contact-line">
                      <span class="contact-label">Telefon</span>
                      <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Branches (iframe slideshow free embed) -->
      <section class="branches-section-wrapper">
        <div class="branches-inner container">
          <div class="section-title"><h2 class="section-title" id="branches-title">Naše pobočky</h2></div>
          <!-- New tabs container moved outside slideshow -->
          <div class="map-tabs">
            <button 
              v-for="(branch, index) in branches" 
              :key="index"
              class="map-control-btn" 
              :class="{ active: selectedBranch === index }"
              :data-target="index" 
              :style="{ background: `#094070 url('${branch.image}') center/cover no-repeat` }"
              @click="selectBranch(index)"
            >
              <ion-icon name="location"></ion-icon>
              <span>{{ branch.name }}</span>
            </button>
          </div>
          <div class="branches-slideshow">
            <div class="slideshow-container" id="slideshow">
              <div 
                v-for="(branch, index) in branches" 
                :key="index"
                class="branch-slide"
                :class="{ active: selectedBranch === index }"
              >
                <div class="branch-info">
                  <h3>{{ branch.title }}</h3>
                  <div class="contact-info">
                    <div><ion-icon name="location-outline"></ion-icon>{{ branch.address }}</div>
                    <div><ion-icon name="call-outline"></ion-icon><a :href="`tel:${branch.phone}`">{{ branch.phone }}</a></div>
                    <div><ion-icon name="mail-outline"></ion-icon><a :href="`mailto:${branch.email}`">{{ branch.email }}</a></div>
                  </div>
                  <p><a class="btn btn-secondary" target="_blank" :href="branch.mapLink">Zobrazit na větší mapě</a></p>
                </div>
                <div class="branch-map">
                  <iframe 
                    :src="branch.embedUrl" 
                    loading="lazy" 
                    allowfullscreen 
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import contentData from '../../data/content.json'

export default {
  name: 'ContactUs',
  setup() {
    const currentSlide = ref(0)
    const selectedDivision = ref(0)
    const selectedBranch = ref(0)
    const slides = ref([])

    const divisions = ref([
      {
        id: 'energetika',
        name: 'Energetika',
        icon: 'flash-outline',
        contacts: [
          {
            role: 'Vedoucí divize',
            email: 'energetika@uchytil.eu',
            phone: '545 423 211'
          },
          {
            role: 'Projektový manažer',
            email: 'projekty.energetika@uchytil.eu',
            phone: '545 423 211'
          },
          {
            role: 'Obchod / servis',
            email: 'servis@uchytil.eu',
            phone: '545 423 211'
          }
        ]
      },
      {
        id: 'stavba',
        name: 'Stavba',
        icon: 'construct-outline',
        contacts: [
          {
            role: 'Vedoucí divize',
            email: 'stavba@uchytil.eu',
            phone: '545 423 211'
          },
          {
            role: 'Projektový manažer',
            email: 'projekty.stavba@uchytil.eu',
            phone: '545 423 211'
          },
          {
            role: 'Obchod / servis',
            email: 'obchod@uchytil.eu',
            phone: '545 423 211'
          }
        ]
      },
      {
        id: 'tzb',
        name: 'TZB',
        icon: 'thermometer-outline',
        contacts: [
          {
            role: 'Vedoucí divize',
            email: 'tzb@uchytil.eu',
            phone: '545 423 211'
          },
          {
            role: 'Projektový manažer',
            email: 'projekty.tzb@uchytil.eu',
            phone: '545 423 211'
          },
          {
            role: 'Obchod / servis',
            email: 'servis@uchytil.eu',
            phone: '545 423 211'
          }
        ]
      }
    ])

    const branches = ref([
      {
        name: 'Brno',
        title: 'Brno – sídlo',
        address: 'K Terminálu 7, 619 00 Brno',
        phone: '+420 545 423 211',
        email: 'brno@uchytil.eu',
        image: 'fotky/energetika3.png',
        mapLink: 'https://maps.app.goo.gl/hQKopm84AvPN5Ro99',
        embedUrl: 'https://www.google.com/maps?q=K%20Termin%C3%A1lu%207%2C%20Brno&output=embed'
      },
      {
        name: 'Hodonín',
        title: 'Hodonín',
        address: 'U Elektrárny 1, 695 01 Hodonín',
        phone: '+420 518 321 039',
        email: 'hodonin@uchytil.eu',
        image: 'fotky/prodejna.png',
        mapLink: 'https://maps.app.goo.gl/t5HZrjzqSsBhTHEt5',
        embedUrl: 'https://www.google.com/maps?q=U%20Elektr%C3%A1rny%201%2C%20Hodon%C3%ADn&output=embed'
      },
      {
        name: 'Žďár nad Sázavou',
        title: 'Žďár nad Sázavou',
        address: 'Brněnská 41, 591 01 Žďár nad Sázavou',
        phone: '+420 560 594 111',
        email: 'zdar@uchytil.eu',
        image: 'fotky/bagr2.png',
        mapLink: 'https://maps.app.goo.gl/Br44wJV1T4hXg7w59',
        embedUrl: 'https://www.google.com/maps?q=U%20Stadionu%2C%20%C5%BDd%C3%A1r%20nad%20S%C3%A1zavou&output=embed'
      },
      {
        name: 'Žďár - prodejna',
        title: 'Žďár - prodejna',
        address: 'Brněnská 41, 591 01 Žďár nad Sázavou',
        phone: '+420 560 594 111',
        email: 'zdar@uchytil.eu',
        image: 'fotky/prodejna2.png',
        mapLink: 'https://maps.app.goo.gl/Br44wJV1T4hXg7w59',
        embedUrl: 'https://www.google.com/maps?q=U%20Stadionu%2C%20%C5%BDd%C3%A1r%20nad%20S%C3%A1zavou&output=embed'
      }
    ])

    const selectDivision = (index) => {
      selectedDivision.value = index
    }

    const selectBranch = (index) => {
      selectedBranch.value = index
    }

    const initSlideshow = () => {
      if (contentData.hero && contentData.hero.slides) {
        slides.value = contentData.hero.slides
        setInterval(() => {
          currentSlide.value = (currentSlide.value + 1) % slides.value.length
        }, 5000)
      }
    }

    onMounted(() => {
      initSlideshow()
    })

    return {
      currentSlide,
      selectedDivision,
      selectedBranch,
      slides,
      divisions,
      branches,
      selectDivision,
      selectBranch
    }
  }
}
</script>