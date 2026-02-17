<template>
  <div class="prodejna-page blue-rings-bg">
    <!-- Hero Section -->
    <v-sheet class="position-relative hero-shell" color="black">
      <v-img 
        src="/fotky/prodejna2.png" 
        cover 
        class="hero-image"
        gradient="to bottom, rgba(3, 31, 104, 0.7), rgba(3, 31, 104, 0.4)"
      >
        <div class="hero-content d-flex flex-column justify-center align-center h-100 text-center text-white p-4">
          <h1 class="text-h2 font-weight-bold mb-4">Prodejna a Sklad</h1>
          <p class="text-h5 font-weight-light" style="max-width: 800px">
            Nabízíme široký sortiment instalačního materiálu pro vodu, topení a plyn. 
            Vyberte si zboží online a vyzvedněte si ho připravené na prodejně.
          </p>
        </div>
      </v-img>
    </v-sheet>

    <v-container class="py-12 position-relative z-index-1">
      <v-row>
        <!-- Categories / Filters Sidebar -->
        <v-col cols="12" md="3">
          <v-card class="filter-card mb-6" elevation="2">
            <v-card-title class="bg-primary text-white py-4">
              <v-icon start>mdi-shape</v-icon>
              Kategorie
            </v-card-title>
            <v-list density="compact">
              <v-list-item 
                v-for="cat in categories" 
                :key="cat.id"
                :value="cat.id"
                :active="selectedCategory === cat.id"
                @click="selectedCategory = cat.id"
                color="primary"
                rounded="e-xl"
                class="mb-1"
              >
                <template v-slot:prepend>
                  <v-icon :color="selectedCategory === cat.id ? 'primary' : 'grey'">{{ cat.icon }}</v-icon>
                </template>
                <v-list-item-title class="font-weight-medium">{{ cat.label }}</v-list-item-title>
                <template v-slot:append>
                  <v-chip size="x-small" variant="flat" color="grey-lighten-4">{{ getCategoryCount(cat.id) }}</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- Contact Info Box -->
          <v-card class="contact-card bg-grey-lighten-4" elevation="0" border>
            <v-card-text>
              <h3 class="text-h6 font-weight-bold mb-3 text-primary">Výdejní místo</h3>
              <div class="d-flex align-start mb-3">
                <v-icon color="primary" class="mt-1 mr-3">mdi-map-marker</v-icon>
                <div>
                  <strong>UCHYTIL s.r.o.</strong><br>
                  K Terminálu 7<br>
                  619 00 Brno
                </div>
              </div>
              <div class="d-flex align-center mb-3">
                <v-icon color="primary" class="mr-3">mdi-clock-outline</v-icon>
                <div>Po-Pá: 7:00 - 15:30</div>
              </div>
              <div class="d-flex align-center">
                <v-icon color="primary" class="mr-3">mdi-phone</v-icon>
                <div>+420 545 423 211</div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Products Grid -->
        <v-col cols="12" md="9">
          <!-- Search & Controls -->
          <div class="d-flex flex-wrap align-center justify-space-between mb-6 gap-3">
            <h2 class="text-h5 font-weight-bold text-primary">{{ currentCategoryName }}</h2>
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Hledat produkt..."
              single-line
              hide-details
              density="compact"
              variant="outlined"
              bg-color="white"
              style="max-width: 300px"
              class="search-input"
            ></v-text-field>
          </div>

          <v-row>
            <v-col 
              v-for="product in filteredProducts" 
              :key="product.id" 
              cols="12" sm="6" lg="4"
            >
              <v-card class="product-card h-100" hover elevation="2">
                <div class="product-image-wrapper">
                  <v-img 
                    :src="product.image || '/fotky/logo.png'" 
                    height="200" 
                    cover
                    class="align-end"
                  >
                    <v-chip color="secondary" size="small" class="ma-2" label>{{ product.availability }}</v-chip>
                  </v-img>
                </div>
                <v-card-item>
                  <v-card-title class="text-body-1 font-weight-bold pt-2">{{ product.name }}</v-card-title>
                  <v-card-subtitle class="mb-2">{{ product.code }}</v-card-subtitle>
                  <div class="d-flex align-baseline mt-1">
                    <span class="text-h6 font-weight-bold text-primary">{{ product.price }} Kč</span>
                    <span class="text-caption text-medium-emphasis ml-1">bez DPH</span>
                  </div>
                </v-card-item>
                
                <v-card-actions class="px-4 pb-4 pt-0">
                  <v-btn 
                    block 
                    color="primary" 
                    variant="flat" 
                    @click="addToCart(product)"
                    :disabled="product.availability === 'Nedostupné'"
                  >
                    <v-icon start>mdi-cart-plus</v-icon>
                    Rezervovat
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          
          <div v-if="filteredProducts.length === 0" class="text-center py-12">
            <v-icon size="64" color="grey-lighten-1">mdi-package-variant-closed</v-icon>
            <p class="text-h6 text-grey mt-4">Nebyly nalezeny žádné produkty.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Floating Cart Button -->
    <v-scale-transition>
      <v-btn
        v-if="cart.length > 0"
        position="fixed"
        location="bottom end"
        class="ma-6 cart-fab"
        color="secondary"
        icon
        size="x-large"
        elevation="8"
        @click="showCart = true"
        style="z-index: 100;"
      >
        <v-badge :content="cartTotalItems" color="error" floating>
          <v-icon size="28">mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-scale-transition>

    <!-- Cart Drawer / Dialog -->
    <v-navigation-drawer
      v-model="showCart"
      location="right"
      temporary
      width="450"
      class="cart-drawer"
    >
      <div class="d-flex flex-column h-100">
        <div class="bg-primary px-4 py-4 d-flex align-center justify-space-between">
          <h2 class="text-h6 text-white m-0">Vaše rezervace</h2>
          <v-btn icon variant="text" color="white" @click="showCart = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <div class="flex-grow-1 overflow-y-auto pa-4">
          <div v-if="cart.length > 0">
            <v-card v-for="(item, index) in cart" :key="index" class="mb-3 px-2 py-2" elevation="1" border>
              <div class="d-flex align-center">
                <v-avatar rounded="0" size="60" class="bg-grey-lighten-4 mr-3">
                  <v-img :src="item.image || '/fotky/logo.png'" cover></v-img>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-subtitle-2 font-weight-bold text-truncate" style="max-width: 200px">{{ item.name }}</div>
                  <div class="text-caption text-grey">{{ item.price }} Kč / ks</div>
                </div>
                <div class="d-flex align-center">
                  <v-btn icon="mdi-minus" size="x-small" variant="text" density="comfortable" @click="updateQuantity(item, -1)"></v-btn>
                  <span class="mx-2 font-weight-bold">{{ item.quantity }}</span>
                  <v-btn icon="mdi-plus" size="x-small" variant="text" density="comfortable" @click="updateQuantity(item, 1)"></v-btn>
                  <v-btn icon="mdi-delete-outline" size="small" color="error" variant="text" class="ml-1" @click="removeFromCart(index)"></v-btn>
                </div>
              </div>
            </v-card>

            <v-divider class="my-4"></v-divider>
            <div class="d-flex justify-space-between text-h6 font-weight-bold mb-6">
              <span>Celkem odhad:</span>
              <span>{{ cartTotalPrice.toLocaleString() }} Kč <small class="text-caption font-weight-normal text-grey">bez DPH</small></span>
            </div>

            <h3 class="text-subtitle-1 font-weight-bold mb-3">Kontaktní údaje</h3>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="formData.name"
                label="Jméno a příjmení / Firma"
                variant="outlined"
                density="compact"
                :rules="[v => !!v || 'Povinné pole']"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.email"
                label="E-mail"
                variant="outlined"
                density="compact"
                :rules="[v => !!v || 'Povinné pole', v => /.+@.+\..+/.test(v) || 'Neplatný e-mail']"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.phone"
                label="Telefon"
                variant="outlined"
                density="compact"
                :rules="[v => !!v || 'Povinné pole']"
                required
              ></v-text-field>
              <v-textarea
                v-model="formData.note"
                label="Poznámka k objednávce"
                variant="outlined"
                rows="3"
                density="compact"
              ></v-textarea>
            </v-form>
          </div>

          <div v-else class="d-flex flex-column align-center justify-center h-100 text-center text-grey">
            <v-icon size="64" class="mb-4 text-grey-lighten-2">mdi-cart-outline</v-icon>
            <p>Váš košík je prázdný.</p>
            <v-btn color="primary" variant="text" class="mt-2" @click="showCart = false">Přejít k výběru</v-btn>
          </div>
        </div>

        <div class="pa-4 bg-white border-t" v-if="cart.length > 0">
          <v-btn 
            block 
            color="success" 
            size="large" 
            :loading="loading"
            @click="submitReservation"
          >
            Odeslat nezávaznou rezervaci
          </v-btn>
          <p class="text-caption text-center text-grey mt-2 mb-0">
            Platba probíhá až při osobním odběru.
          </p>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="500">
      <v-card class="text-center pa-6 rounded-xl">
        <v-icon size="64" color="success" class="mb-4 mx-auto">mdi-check-circle-outline</v-icon>
        <h3 class="text-h5 font-weight-bold mb-2">Rezervace odeslána!</h3>
        <p class="text-body-1 text-grey-darken-1 mb-6">
          Děkujeme za vaši rezervaci. Naši pracovníci ji zpracují a ozvou se vám s potvrzením termínu vyzvednutí.
        </p>
        <v-btn color="primary" block @click="successDialog = false">Zavřít</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProdejnaView',
  data() {
    return {
      search: '',
      selectedCategory: 'all',
      showCart: false,
      valid: false,
      loading: false,
      successDialog: false,
      formData: {
        name: '',
        email: '',
        phone: '',
        note: ''
      },
      cart: [],
      categories: [
        { id: 'all', label: 'Všechno', icon: 'mdi-view-grid' },
        { id: 'voda', label: 'Voda a sanita', icon: 'mdi-water-outline' },
        { id: 'topeni', label: 'Topení', icon: 'mdi-radiator' },
        { id: 'plyn', label: 'Plyn', icon: 'mdi-fire' },
        { id: 'naradi', label: 'Nářadí a ochranné pomůcky', icon: 'mdi-tools' }
      ],
      // Mock Data 
      products: [
        { id: 1, name: 'Kulový ventil 1/2" FF páka', code: 'KV-12-FF', category: 'voda', price: 125, image: '', availability: 'Skladem' },
        { id: 2, name: 'Kulový ventil 3/4" FF páka', code: 'KV-34-FF', category: 'voda', price: 185, image: '', availability: 'Skladem' },
        { id: 3, name: 'PPR Trubka 20x3,4 PN20 (4m)', code: 'PPR-20', category: 'voda', price: 32, image: '', availability: 'Skladem' },
        { id: 4, name: 'PPR Koleno 90° 20mm', code: 'PPR-K-20', category: 'voda', price: 8, image: '', availability: 'Skladem' },
        { id: 5, name: 'Čerpadlo Grundfos Alpha1 L 25-40', code: 'GR-ALPHA-25', category: 'topeni', price: 4250, image: '', availability: 'Skladem' },
        { id: 6, name: 'Termostatická hlavice Heimeier K', code: 'HEI-K', category: 'topeni', price: 450, image: '', availability: 'Skladem' },
        { id: 7, name: 'Radiátor VK 22 600x1200', code: 'RAD-22-6012', category: 'topeni', price: 3890, image: '', availability: 'Na dotaz' },
        { id: 8, name: 'Plynový kohout 1/2" MF', code: 'PL-K-12', category: 'plyn', price: 210, image: '', availability: 'Skladem' },
        { id: 9, name: 'Těsnění klingerit 1/2"', code: 'TES-12', category: 'plyn', price: 5, image: '', availability: 'Skladem' },
        { id: 10, name: 'Montážní rukavice vel. 10', code: 'RUK-10', category: 'naradi', price: 45, image: '', availability: 'Skladem' },
        { id: 11, name: 'Metr svinovací 5m', code: 'METR-5', category: 'naradi', price: 120, image: '', availability: 'Skladem' },
        { id: 12, name: 'Geberit Duofix pro WC', code: 'GEB-DUO', category: 'voda', price: 4800, image: '', availability: 'Skladem' },
        { id: 13, name: 'Expanzní nádoba 35l', code: 'EXP-35', category: 'topeni', price: 1450, image: '', availability: 'Skladem' },
      ]
    }
  },
  computed: {
    currentCategoryName() {
      const cat = this.categories.find(c => c.id === this.selectedCategory)
      return cat ? cat.label : 'Všechny produkty'
    },
    filteredProducts() {
      let result = this.products
      if (this.selectedCategory !== 'all') {
        result = result.filter(p => p.category === this.selectedCategory)
      }
      if (this.search) {
        const q = this.search.toLowerCase()
        result = result.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.code.toLowerCase().includes(q)
        )
      }
      return result
    },
    cartTotalItems() {
      return this.cart.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotalPrice() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },
  methods: {
    getCategoryCount(catId) {
      if (catId === 'all') return this.products.length
      return this.products.filter(p => p.category === catId).length
    },
    addToCart(product) {
      const existing = this.cart.find(i => i.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      this.showCart = true
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
    },
    updateQuantity(item, change) {
      item.quantity += change
      if (item.quantity <= 0) {
        const idx = this.cart.indexOf(item)
        if (idx !== -1) this.removeFromCart(idx)
      }
    },
    async submitReservation() {
      if (!this.$refs.form.validate()) return
      
      this.loading = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Reservation:', {
        customer: this.formData,
        items: this.cart,
        total: this.cartTotalPrice
      })
      
      this.loading = false
      this.successDialog = true
      this.cart = []
      this.formData = { name: '', email: '', phone: '', note: '' }
      this.showCart = false
    }
  }
}
</script>

<style scoped>
.hero-shell {
  height: 350px;
  overflow: hidden;
}
.hero-image {
  height: 100%;
}
.z-index-1 { position: relative; z-index: 1; }
.cart-drawer {
  z-index: 1005 !important;
}
.cart-fab {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cart-fab:active {
  transform: scale(0.9);
}
.product-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 12px;
  overflow: hidden;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1) !important;
}
.filter-card {
  border-radius: 12px;
  overflow: hidden;
  position: sticky;
  top: 90px; /* Adjust based on header height */
}
</style>
