<template>
  <main>
    <section class="hero-section">
      <div class="slideshow">
        <div class="slide active">
          <img src="/fotky/kontejner.png" alt="E-shop" class="slide__img">
        </div>
      </div>
      <div class="slideshow-overlay">
        <h1 class="slideshow-title">E-shop</h1>
        <div class="slideshow-subtitle">Online prodej a technika</div>
      </div>
    </section>

    <section class="eshop-content">
      <div class="container">
        <div class="eshop-intro">
          <h2>Náš online obchod</h2>
          <p>Vítejte v našem e-shopu s materiály a technikou pro stavební a energetické projekty.</p>
        </div>
        
        <div class="products-grid">
          <div class="product-card" v-for="n in 8" :key="n">
            <img src="/fotky/energetika.png" :alt="`Produkt ${n}`" loading="lazy">
            <div class="product-info">
              <h3>Produkt {{ n }}</h3>
              <p class="price">{{ (Math.random() * 10000 + 1000).toFixed(0) }} Kč</p>
              <button class="btn btn-primary">Do košíku</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Eshop'
}
</script>

<style scoped>
.eshop-content {
  padding: 4rem 0;
}

.eshop-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.product-info {
  padding: 1.5rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #e74c3c;
  margin: 0.5rem 0;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #2980b9;
}
</style>