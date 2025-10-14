<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-brand">
          <router-link to="/" class="logo">
            <img id="footer-logo" src="/fotky/logo.png" alt="UCHYTIL s.r.o.">
          </router-link>
        </div>

        <!-- Replace the contact table with prefooter content -->
        <div class="footer-links">
          <div class="prefooter-groups">
            <div class="pf-group">
              <div class="pf-group-title">naše podstránky</div>
              <div class="pf-list">
                <router-link class="pf-card" to="/aboutus">
                  <h3 class="pf-title">O nás</h3>
                </router-link>
                <router-link class="pf-card" to="/references">
                  <h3 class="pf-title">Reference</h3>
                </router-link>
                <router-link class="pf-card" to="/contact-us">
                  <h3 class="pf-title">Kontakty</h3>
                </router-link>
                <router-link class="pf-card" to="/eshop">
                  <h3 class="pf-title">E‑Shop</h3>
                </router-link>
                <router-link class="pf-card" to="/division/energetika">
                  <h3 class="pf-title">Divize</h3>
                </router-link>
              </div>
            </div>
            <div class="pf-group">
              <div class="pf-group-title">jiné</div>
              <div class="pf-list">
                <a class="pf-card" href="#" @click.prevent>
                  <h3 class="pf-title">Etický kodex</h3>
                </a>
                <a class="pf-card" href="#" @click.prevent>
                  <h3 class="pf-title">Certifikace</h3>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- end replaced column -->
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p class="footer-copyright" id="footer-copyright">
          © {{ currentYear }} UCHYTIL s.r.o. Všechna práva vyhrazena.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'AppFooter',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    
    return {
      currentYear
    }
  }
}
</script>

<style>
/* Footer styles are handled by the global CSS */
</style>