<template>
  <main>
    <div class="job-detail">
      <div class="container">
        <h1>Detaily pozice</h1>
        <div class="job-content">
          <h2>Projektový manažer</h2>
          <h3>Popis pozice:</h3>
          <p>Detailní popis pracovní pozice bude zde...</p>
          
          <h3>Požadavky:</h3>
          <ul>
            <li>Vysokoškolské vzdělání technického směru</li>
            <li>Minimálně 3 roky praxe v oboru</li>
            <li>Znalost projektového řízení</li>
          </ul>
          
          <div class="apply-section">
            <h3>Zaujala vás tato pozice?</h3>
            <router-link to="/contact-us" class="btn btn-primary">Kontaktujte nás</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Job'
}
</script>

<style scoped>
.job-detail {
  padding: 4rem 0;
  min-height: 60vh;
}

.job-content h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.apply-section {
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
</style>