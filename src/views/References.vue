<template>
  <main>
    <section class="hero-section">
      <div class="slideshow">
        <div class="slide active">
          <img src="/fotky/tzb.png" alt="References" class="slide__img">
        </div>
      </div>
      <div class="slideshow-overlay">
        <h1 class="slideshow-title">Reference</h1>
        <div class="slideshow-subtitle">Naše úspěšné projekty</div>
      </div>
    </section>

    <section class="references-content">
      <div class="container">
        <div class="references-grid">
          <div class="reference-card" v-for="n in 6" :key="n">
            <img src="/fotky/energetika.png" :alt="`Reference ${n}`" loading="lazy">
            <div class="reference-content">
              <h3>Projekt {{ n }}</h3>
              <p>Popis úspěšně realizovaného projektu...</p>
              <router-link :to="`/reference/${n}`" class="btn btn-secondary">Detail projektu</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'References'
}
</script>

<style scoped>
.references-content {
  padding: 4rem 0;
}

.references-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.reference-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.reference-card:hover {
  transform: translateY(-5px);
}

.reference-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.reference-content {
  padding: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #95a5a6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
  transition: background 0.3s;
  font-size: 0.875rem;
}

.btn:hover {
  background: #7f8c8d;
}
</style>