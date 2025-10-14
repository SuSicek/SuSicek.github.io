<template>
  <main>
    <!-- Hero section with slideshow -->
    <section class="hero-section" id="home">
      <section class="hero-section" id="home">
        <div class="slideshow">
          <!-- Slides will be loaded from JSON -->
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
    </section>

    <!-- Intro -->
    <section class="about-section">
      <div class="container">
        <div class="about-intro center reveal">
          <h2>Kdo jsme</h2>
          <p>Jsme UCHYTIL s.r.o. – tým odborníků, kteří spojují tradici s férovým přístupem. Už více než 30 let zajišťujeme kompletní služby ve stavebnictví, energetice a TZB. Naším cílem je být partnerem, na kterého se můžete spolehnout. Projektujeme, stavíme, instalujeme a servisujeme tak, aby naše řešení fungovala dlouhodobě a bez starostí.</p>
        </div>

        <!-- Values -->
        <div class="values-grid">
          <div class="value-card reveal" style="background-image:url('/fotky/bagr.png')">
            <div class="value-texts">
              <h3>Kvalita a bezpečnost</h3>
              <p>Pracujeme dle platných norem, držíme certifikace a klademe důraz na bezpečnost práce.</p>
            </div>
          </div>
          <div class="value-card reveal" style="background-image:url('/fotky/bagr2.png')">
            <div class="value-texts">
              <h3>Udržitelnost</h3>
              <p>Navrhujeme úsporná řešení s ohledem na životní prostředí a dlouhodobý provoz.</p>
            </div>
          </div>
          <div class="value-card reveal" style="background-image:url('/fotky/energetika.png')">
            <div class="value-texts">
              <h3>Odborný tým</h3>
              <p>Silné zázemí strojních, elektro a projekčních středisek. Neustálé vzdělávání.</p>
            </div>
          </div>
          <div class="value-card reveal" style="background-image:url('/fotky/energetika2.png')">
            <div class="value-texts">
              <h3>Spolehlivost</h3>
              <p>Dodržujeme termíny, smluvní závazky a dbáme na precizní realizaci.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Us Section -->
    <section class="about-section why-us-section">
      <div class="container">
        <div class="about-intro">
          <h2>Proč my?</h2>
          <p>Naší vizí je být dlouhodobým a spolehlivým partnerem, který férovým přístupem přináší zákazníkům komplexní a kvalitní řešení v oblasti stavebnictví, TZB a energetiky.</p>
          <p>Stavíme na spolehlivosti, odbornosti a lidském přístupu. Dodáváme řešení včas, kvalitně a bez kompromisů – tak, aby se spokojený zákazník vracel.</p>
        </div>
        <div class="why-us-columns">
          <div class="why-us-media">
            <figure class="why-us-illustration">
              <img src="/fotky/energetika.png" alt="Ukázka našich interních kapacit" loading="lazy">
            </figure>
          </div>
          <div class="why-us-content">
            <div class="why-us-block">
              <h3>Máme vlastní</h3>
              <ul class="why-us-features">
                <li>Projekční, montážní i realizační skupiny odborníků</li>
                <li>Výrobní kapacity ve všech oblastech činnosti</li>
              </ul>
            </div>
            <div class="why-us-block">
              <h3>U nás je samozřejmostí</h3>
              <ul class="why-us-list">
                <li>Kvalita – nadstandardní úroveň realizací, důraz na detail a preciznost.</li>
                <li>Spolehlivost – dodržování termínů i rozpočtů, zákazník je pro nás partner.</li>
                <li>Komplexnost – služby od prvotní studie až po dlouhodobý servis.</li>
                <li>Bezpečnost a ekologie – ochrana zdraví a životního prostředí jako samozřejmý standard.</li>
                <li>Efektivní řízení projektů – máme pod kontrolou náklady i průběh stavby, zvládáme složité realizace.</li>
                <li>Přístup k novým trendům – umožněný spoluprací na výzkumných projektech s VŠ.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats + Timeline -->
    <section class="about-section about-stats-timeline">
      <div class="container">
        <div class="stats-grid">
          <div class="stat reveal">
            <div class="stat-number" data-count="30">0</div>
            <div class="stat-label">let na trhu +</div>
          </div>
          <div class="stat reveal">
            <div class="stat-number" data-count="4100">0</div>
            <div class="stat-label">realizovaných zakázek +</div>
          </div>
          <div class="stat reveal">
            <div class="stat-number" data-count="300">0</div>
            <div class="stat-label">Spokojených klientů +</div>
          </div>
          <div class="stat reveal">
            <div class="stat-number" data-count="100">0</div>
            <div class="stat-label"> odborníků +</div>
          </div>
        </div>

        <!-- Horizontal Timeline -->
        <section class="cd-horizontal-timeline">
          <div class="timeline">
            <div class="events-wrapper">
              <div class="events">
                <ol>
                  <li><a href="#0" data-date="23/12/1994" :class="{ selected: selectedEvent === 0 }" @click.prevent="selectEvent(0)">prosinec 1994</a></li>
                  <li><a href="#0" data-date="14/10/1996" :class="{ selected: selectedEvent === 1 }" @click.prevent="selectEvent(1)">říjen 1996</a></li>
                  <li><a href="#0" data-date="16/10/2002" :class="{ selected: selectedEvent === 2 }" @click.prevent="selectEvent(2)">říjen 2002</a></li>
                  <li><a href="#0" data-date="01/01/2005" :class="{ selected: selectedEvent === 3 }" @click.prevent="selectEvent(3)">2004–2006</a></li>
                  <li><a href="#0" data-date="08/07/2013" :class="{ selected: selectedEvent === 4 }" @click.prevent="selectEvent(4)">červenec 2013</a></li>
                  <li><a href="#0" data-date="18/03/2022" :class="{ selected: selectedEvent === 5 }" @click.prevent="selectEvent(5)">březen 2022</a></li>
                </ol>
                <span class="filling-line" aria-hidden="true"></span>
              </div>
            </div>
            <ul class="cd-timeline-navigation">
              <li><a href="#0" class="prev" :class="{ inactive: selectedEvent === 0 }" @click.prevent="prevEvent" aria-label="Předchozí"><ion-icon name="chevron-back-outline"></ion-icon></a></li>
              <li><a href="#0" class="next" :class="{ inactive: selectedEvent === timelineEvents.length - 1 }" @click.prevent="nextEvent" aria-label="Další"><ion-icon name="chevron-forward-outline"></ion-icon></a></li>
            </ul>
          </div>
          <div class="events-content">
            <ol>
              <li 
                v-for="(event, index) in timelineEvents" 
                :key="index"
                :class="{ selected: selectedEvent === index }"
                :data-date="event.date"
              >
                <h2>{{ event.title }}</h2>
                <em>{{ event.dateText }}</em>
                <p>{{ event.description }}</p>
              </li>
            </ol>
          </div>
        </section>
      </div>
    </section>

    <!-- Team -->
    <section class="about-section divisions-section">
      <div class="container">
        <div class="about-intro center reveal">
          <h2>Naše divize</h2>
        </div>
        <div class="team-grid">
          <!-- Energetika -->
          <router-link to="/division/energetika" class="team-card reveal" aria-label="Otevřít divizi Energetika">
            <img src="/fotky/prodejna.png" alt="Energetika" loading="lazy">
            <div class="card-texts">
              <h3>Energetika</h3>
              <div class="subtitle">Výroba a úspory energií</div>
            </div>
            <p>Zajišťuje komplexní služby v oblasti výroby, distribuce a úspor energií.</p>
          </router-link>
          <!-- Stavba -->
          <router-link to="/division/stavba" class="team-card reveal" aria-label="Otevřít divizi Stavba">
            <img src="/fotky/stavba.png" alt="Stavební oddělení" loading="lazy">
            <div class="card-texts">
              <h3>Stavba</h3>
              <div class="subtitle">Kompletní stavební projekty</div>
            </div>
            <p>Realizuje stavební projekty od návrhu po dokončení s důrazem na kvalitu a termíny.</p>
          </router-link>
          <!-- TZB -->
          <router-link to="/division/tzb" class="team-card reveal" aria-label="Otevřít divizi TZB">
            <img src="/fotky/energetika.png" alt="TZB" loading="lazy">
            <div class="card-texts">
              <h3>TZB</h3>
              <div class="subtitle">Technická zařízení budov</div>
            </div>
            <p>Poskytuje odborné řešení technických zařízení budov pro komfort, efektivitu a bezpečnost.</p>
          </router-link>
          <!-- E-shop -->
          <router-link to="/eshop" class="team-card reveal" aria-label="Otevřít E-shop">
            <img src="/fotky/kontejner.png" alt="E-shop" loading="lazy">
            <div class="card-texts">
              <h3>E-shop</h3>
              <div class="subtitle">Online prodej a technika</div>
            </div>
            <p>Online prodej materiálu, příslušenství a techniky pro vaše projekty.</p>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import contentData from '../../data/content.json'

export default {
  name: 'AboutUs',
  setup() {
    const currentSlide = ref(0)
    const selectedEvent = ref(0)
    const slides = ref([])

    const timelineEvents = ref([
      {
        date: '23/12/1994',
        title: 'Založení společnosti',
        dateText: '23. prosince 1994',
        description: 'Firma byla založena pod názvem ENBRA Montáže s.r.o., zapsána do obchodního rejstříku spisovou značkou C 17690 vedenou Krajským soudem v Brně.'
      },
      {
        date: '14/10/1996',
        title: 'Změna jednatele',
        dateText: '14. října 1996',
        description: 'Po odchodu prvního jednatele (František Lavický) se funkce jednatele ujal Josef Uchytil.'
      },
      {
        date: '16/10/2002',
        title: 'Změna názvu společnosti',
        dateText: '16. října 2002',
        description: 'Společnost změnila svůj právní název na UCHYTIL s.r.o.'
      },
      {
        date: '01/01/2005',
        title: 'Přesun sídla',
        dateText: '2004–2006',
        description: 'Firma postupně změnila sídlo: z Radostína nad Oslavou přes Žďár nad Sázavou až do Brna ("K terminálu 7").'
      },
      {
        date: '08/07/2013',
        title: 'Rozdělení společnosti',
        dateText: '8. července 2013',
        description: 'Došlo k rozdělení společnosti; vznikla nová akciová společnost Nemovitosti UCHYTIL a.s., která převzala část majetku, jak je uvedeno v projektu rozdělení společnosti.'
      },
      {
        date: '18/03/2022',
        title: 'Noví jednatelé',
        dateText: '18. března 2022',
        description: 'Do vedení společnosti jako jednatelé nastoupili Marie Uchytilová i Josef Uchytil – oba dosud zastávají tuto pozici.'
      }
    ])

    const selectEvent = (index) => {
      selectedEvent.value = index
    }

    const nextEvent = () => {
      if (selectedEvent.value < timelineEvents.value.length - 1) {
        selectedEvent.value++
      }
    }

    const prevEvent = () => {
      if (selectedEvent.value > 0) {
        selectedEvent.value--
      }
    }

    const initSlideshow = () => {
      if (contentData.hero && contentData.hero.slides) {
        slides.value = contentData.hero.slides
        setInterval(() => {
          currentSlide.value = (currentSlide.value + 1) % slides.value.length
        }, 5000)
      }
    }

    const animateStats = () => {
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

    onMounted(() => {
      initSlideshow()
      setTimeout(() => {
        animateStats();
      }, 500);
    })

    return {
      currentSlide,
      selectedEvent,
      slides,
      timelineEvents,
      selectEvent,
      nextEvent,
      prevEvent
    }
  }
}
</script>

<style>
/* Bigger division names on team cards */
.team-card h3 { 
  font-size: 1.4rem; 
}
@media (min-width: 768px) {
  .team-card h3 { 
    font-size: 1.75rem; 
  }
}
</style>