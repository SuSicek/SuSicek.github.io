<template>
  <main>
    <div class="reference-detail">
      <div class="container">
        <h1>Detail reference</h1>
        <div class="reference-content">
          <h2>Projekt ID: {{ $route.params.id }}</h2>
          <img src="/fotky/energetika.png" alt="Reference detail" class="reference-image">
          
          <div class="project-info">
            <h3>Informace o projektu</h3>
            <p>Detailní informace o projektu budou zde...</p>
            
            <div class="project-specs">
              <h4>Specifikace:</h4>
              <ul>
                <li>Typ projektu: Stavebnictví</li>
                <li>Doba realizace: 6 měsíců</li>
                <li>Klient: Název klienta</li>
              </ul>
            </div>
          </div>
          
          <div class="back-link">
            <router-link to="/references" class="btn btn-secondary">← Zpět na reference</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ReferenceTemplate'
}
</script>

<style scoped>
.reference-detail {
  padding: 4rem 0;
  min-height: 60vh;
}

.reference-image {
  width: 100%;
  max-width: 600px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin: 2rem 0;
}

.project-info {
  margin: 2rem 0;
}

.project-specs {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.back-link {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #95a5a6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.btn:hover {
  background: #7f8c8d;
}
</style>