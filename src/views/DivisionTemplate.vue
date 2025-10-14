<template>
  <main>
    <div class="division-detail">
      <div class="container">
        <h1>{{ divisionTitle }}</h1>
        <div class="division-content">
          <img :src="divisionImage" :alt="divisionTitle" class="division-image">
          
          <div class="division-info">
            <h2>{{ divisionSubtitle }}</h2>
            <p>{{ divisionDescription }}</p>
            
            <div class="services-list">
              <h3>Naše služby:</h3>
              <ul>
                <li v-for="service in services" :key="service">{{ service }}</li>
              </ul>
            </div>

            <div class="contact-section">
              <h3>Kontakt</h3>
              <p>Pro více informací o této divizi nás kontaktujte.</p>
              <router-link to="/contact-us" class="btn btn-primary">Kontaktujte nás</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'DivisionTemplate',
  setup() {
    const route = useRoute()
    const division = ref(null)
    
    const divisions = {
      energetika: {
        title: 'Energetika',
        subtitle: 'Výroba a úspory energií',
        description: 'Zajišťuje komplexní služby v oblasti výroby, distribuce a úspor energií.',
        image: '/fotky/energetika.png',
        services: [
          'Fotovoltaické systémy',
          'Energetické audity',
          'Úsporná opatření',
          'Distribuční sítě'
        ]
      },
      stavebnictvi: {
        title: 'Stavebnictví',
        subtitle: 'Kompletní stavební projekty',
        description: 'Realizuje stavební projekty od návrhu po dokončení s důrazem na kvalitu a termíny.',
        image: '/fotky/stavba.png',
        services: [
          'Projektování',
          'Stavební práce',
          'Rekonstrukce',
          'Modernizace budov'
        ]
      },
      prumysl: {
        title: 'TZB (Technická zařízení budov)',
        subtitle: 'Technická zařízení budov',
        description: 'Poskytuje odborné řešení technických zařízení budov pro komfort, efektivitu a bezpečnost.',
        image: '/fotky/tzb.png',
        services: [
          'Vytápění',
          'Vzduchotechnika',
          'Klimatizace',
          'Zdravotechnika'
        ]
      }
    }

    const divisionTitle = computed(() => division.value?.title || 'Divize')
    const divisionSubtitle = computed(() => division.value?.subtitle || '')
    const divisionDescription = computed(() => division.value?.description || '')
    const divisionImage = computed(() => division.value?.image || '/fotky/energetika.png')
    const services = computed(() => division.value?.services || [])

    onMounted(() => {
      const divisionId = route.params.division
      division.value = divisions[divisionId] || divisions.energetika
    })

    return {
      divisionTitle,
      divisionSubtitle,
      divisionDescription,
      divisionImage,
      services
    }
  }
}
</script>

<style scoped>
.division-detail {
  padding: 4rem 0;
  min-height: 60vh;
}

.division-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.division-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.services-list {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.services-list ul {
  margin-top: 1rem;
}

.services-list li {
  margin-bottom: 0.5rem;
}

.contact-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
  transition: background 0.3s;
}

.btn:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  .division-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>