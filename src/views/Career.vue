<template>
  <main>
    <section class="hero-section">
      <div class="slideshow">
        <div class="slide active">
          <img src="/fotky/stavba.png" alt="Career" class="slide__img">
        </div>
      </div>
      <div class="slideshow-overlay">
        <h1 class="slideshow-title">Kariéra</h1>
        <div class="slideshow-subtitle">Připojte se k našemu týmu</div>
      </div>
    </section>

    <section class="career-content">
      <div class="container">
        <div class="section-intro">
          <h2>Pracovní příležitosti</h2>
          <p>Hledáme talentované profesionály pro naše týmy v oblasti stavebnictví, energetiky a TZB.</p>
        </div>
        
        <div class="job-listings">
          <div class="job-card">
            <h3>Projektový manažer</h3>
            <p>Hledáme zkušeného projektového manažera pro vedení stavebních projektů.</p>
            <router-link to="/job" class="btn btn-primary">Více informací</router-link>
          </div>
          <div class="job-card">
            <h3>Elektrikář</h3>
            <p>Nabízíme pozici elektrikáře pro práci na energetických projektech.</p>
            <router-link to="/job" class="btn btn-primary">Více informací</router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Career'
}
</script>

<style scoped>
.career-content {
  padding: 4rem 0;
}

.job-listings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.job-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
</style>