<template>
  <div class="prodejna-page blue-rings-bg">
    <!-- Hero Section -->
    <v-sheet class="position-relative hero-shell py-16" color="primary">
        <div class="hero-content d-flex flex-column justify-center align-center h-100 text-center text-white p-4">
          <h1 class="text-h2 font-weight-bold mb-4">Prodejna a Sklad</h1>
          <p class="text-h5 font-weight-light" style="max-width: 800px">
            Nabízíme široký sortiment instalačního materiálu pro vodu, topení a plyn. 
            Vyberte si zboží online a vyzvedněte si ho připravené na prodejně.
          </p>
        </div>
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
              <h3 class="text-h6 font-weight-bold mb-3 text-primary">Odštěpný závod Žďár nad Sázavou</h3>
              <div class="d-flex align-start mb-3">
                <v-icon color="primary" class="mt-1 mr-3">mdi-map-marker</v-icon>
                <div>
                  <strong>UCHYTIL s.r.o.</strong><br>
                  Brněnská 41<br>
                  591 01 Žďár nad Sázavou
                </div>
              </div>
              <div class="d-flex align-center mb-3">
                <v-icon color="primary" class="mr-3">mdi-clock-outline</v-icon>
                <div>Po-Pá: 7:00 - 15:30</div>
              </div>
              <div class="d-flex align-center mb-1">
                <v-icon color="primary" class="mr-3">mdi-phone</v-icon>
                <div><a href="tel:560594111" class="text-decoration-none text-body-1 text-high-emphasis">560 594 111</a> (Spojovatelka)</div>
              </div>
              <div class="d-flex align-center">
                <v-icon color="primary" class="mr-3">mdi-email</v-icon>
                <div><a href="mailto:zdar@uchytil.eu" class="text-decoration-none text-body-1 text-high-emphasis">zdar@uchytil.eu</a></div>
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
                    :src="product.image || '/fotky/jine/logo.png'" 
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
                  <v-img :src="item.image || '/fotky/jine/logo.png'" cover></v-img>
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
        { id: 'odpad', label: 'Odpad a kanalizace', icon: 'mdi-pipe' },
        { id: 'naradi', label: 'Nářadí a ochranné pomůcky', icon: 'mdi-tools' }
      ],
      // Mock Data 
      products: [
        { id: 12, name: 'Geberit Duofix pro WC', code: 'GEB-DUO', category: 'voda', price: 4800, image: '/fotky/prodejna/modul GEBERIT pro závěsné WC.avif', availability: 'Skladem' },
        
        // Původní položky
        { id: 14, name: 'Drenážní spojka oranžová', code: 'DREN-SPOJ-OR', category: 'odpad', price: 55, image: '/fotky/prodejna/drenazni-spojka-oranz.webp', availability: 'Skladem' },
        { id: 15, name: 'Drenážní trubka žlutá (role 50m)', code: 'DREN-TR-ZL', category: 'odpad', price: 1200, image: '/fotky/prodejna/drenážní trubka žlutá.webp', availability: 'Skladem' },
        { id: 16, name: 'Drenážní trubka černá', code: 'DREN-TR-BK', category: 'odpad', price: 28, image: '/fotky/prodejna/drenážní trubka.webp', availability: 'Skladem' }, // Price per meter assumed
        { id: 17, name: 'Kanalizační roura PPKGM SN10', code: 'KAN-SN10', category: 'odpad', price: 450, image: '/fotky/prodejna/kanalizační roura PPKGM-SN10.webp', availability: 'Skladem' },
        { id: 18, name: 'Odbočka drenážní 45° DN 80/80', code: 'DREN-ODB-45', category: 'odpad', price: 89, image: '/fotky/prodejna/odbocka-drenazni-45-dn-80-80.webp', availability: 'Skladem' },
        { id: 19, name: 'Plastový poklop do 1,5t', code: 'POKLOP-1.5T', category: 'odpad', price: 890, image: '/fotky/prodejna/plastový poklop do 1,5t.webp', availability: 'Skladem' },
        { id: 20, name: 'Šachtové dno sběrné', code: 'SACH-DNO-SBER', category: 'odpad', price: 1500, image: '/fotky/prodejna/šachtové dno sběrné.webp', availability: 'Na dotaz' },
        { id: 21, name: 'Šachtové dno sestava + teleskop', code: 'SACH-DNO-SET', category: 'odpad', price: 3200, image: '/fotky/prodejna/šachtové dno sestava+teleskop.webp', availability: 'Skladem' },
        { id: 22, name: 'Šachtové dno WAVIN', code: 'WAVIN-DNO', category: 'odpad', price: 1850, image: '/fotky/prodejna/šachtové dno WAVIN sestava.webp', availability: 'Skladem' },
        { id: 23, name: 'Šachtové prodloužení', code: 'SACH-EXT', category: 'odpad', price: 950, image: '/fotky/prodejna/šachtové prodloužení.webp', availability: 'Skladem' },

        // Nové položky - Voda a sanita
        { id: 24, name: 'Automatické čerpadlo na vodu', code: 'CERP-AUTO', category: 'voda', price: 3490, image: '/fotky/prodejna/automatické čerpadlo na vodu.avif', availability: 'Skladem' },
        { id: 25, name: 'Baterie dřezová', code: 'BAT-DREZ', category: 'voda', price: 1290, image: '/fotky/prodejna/baterie dřezová.png', availability: 'Skladem' },
        { id: 26, name: 'Baterie na studenou vodu', code: 'BAT-STUD', category: 'voda', price: 690, image: '/fotky/prodejna/baterie na studenou vodu.jpg', availability: 'Skladem' },
        { id: 27, name: 'Baterie Novaservis', code: 'BAT-NOVA-1', category: 'voda', price: 1890, image: '/fotky/prodejna/baterie Novaservis.jpg', availability: 'Skladem' },
        { id: 28, name: 'Baterie nástěnná', code: 'BAT-NAST', category: 'voda', price: 1100, image: '/fotky/prodejna/baterie nástěnná.png', availability: 'Skladem' },
        { id: 29, name: 'Baterie stojánková dřezová', code: 'BAT-STOJ-DREZ', category: 'voda', price: 1450, image: '/fotky/prodejna/baterie stojánková dřezová.jpg', availability: 'Skladem' },
        { id: 30, name: 'Baterie s bidetovou sprškou', code: 'BAT-BIDET', category: 'voda', price: 2100, image: '/fotky/prodejna/baterie+bidetová sprška.jpg', availability: 'Skladem' },
        { id: 31, name: 'Domácí vodárna', code: 'DOM-VOD', category: 'voda', price: 5990, image: '/fotky/prodejna/domácí vodárna.jpg', availability: 'Na dotaz' },
        { id: 32, name: 'Kalové čerpadlo', code: 'CERP-KAL', category: 'voda', price: 2500, image: '/fotky/prodejna/kalové čerpadlo.png', availability: 'Skladem' },
        { id: 33, name: 'Modul pro závěsné WC', code: 'WC-MOD-2', category: 'voda', price: 3200, image: '/fotky/prodejna/modul pro závěsné WC.png', availability: 'Skladem' },
        { id: 34, name: 'Zazdívací modul pro závěsné WC', code: 'WC-MOD-ZAZD', category: 'voda', price: 3100, image: '/fotky/prodejna/zazdívací modul pro závěsné WC.webp', availability: 'Skladem' },
        { id: 35, name: 'Podomítková baterie komplet', code: 'BAT-PODOM-SET', category: 'voda', price: 3800, image: '/fotky/prodejna/podomítková baterie+příslušenství.jpg', availability: 'Skladem' },
        { id: 36, name: 'Sprchová sestava', code: 'SPRCH-SET-1', category: 'voda', price: 2800, image: '/fotky/prodejna/sprchová sestava.jpg', availability: 'Skladem' },
        { id: 37, name: 'Sprchová zástěna + vanička litý mramor', code: 'SPRCH-KOUT-MRAM', category: 'voda', price: 12500, image: '/fotky/prodejna/sprchová zástěna+vanička z litého mramoru.avif', availability: 'Na objednávku' },
        { id: 38, name: 'Sprchový odvodňovací kanálek', code: 'SPRCH-KANAL', category: 'voda', price: 2200, image: '/fotky/prodejna/sprchový odvodňovací kanálek.png', availability: 'Skladem' },
        { id: 39, name: 'Umyvadlo se skříňkou', code: 'UMYV-SKRIN', category: 'voda', price: 4500, image: '/fotky/prodejna/umyvadlo se skříňkou.jpg', availability: 'Skladem' },
        { id: 40, name: 'Vodárna EBARA', code: 'VOD-EBARA', category: 'voda', price: 8900, image: '/fotky/prodejna/vodádna EBARA.avif', availability: 'Na dotaz' },
        { id: 41, name: 'WC klozet JIKA Lyra', code: 'WC-JIKA-LYRA', category: 'voda', price: 2100, image: '/fotky/prodejna/wc klozet Jika lyra.webp', availability: 'Skladem' },
        { id: 42, name: 'WC klozet kombi univerzální', code: 'WC-KOMBI', category: 'voda', price: 3500, image: '/fotky/prodejna/WC klozet kombi univerzální dopojení.jpg', availability: 'Skladem' },
        { id: 43, name: 'WC klozet závěsná mísa', code: 'WC-ZAVES', category: 'voda', price: 2800, image: '/fotky/prodejna/WC klozet závěsná mísa.jpg', availability: 'Skladem' },
        { id: 44, name: 'Čerpadlo do vrtu', code: 'CERP-VRT', category: 'voda', price: 4200, image: '/fotky/prodejna/čerpadlo do vrtu.png', availability: 'Skladem' },
        { id: 45, name: 'Čerpadlo Moby', code: 'CERP-MOBY', category: 'voda', price: 1800, image: '/fotky/prodejna/čerpadlo moby.webp', availability: 'Skladem' },

        // Topení
        { id: 46, name: 'Oběhové čerpadlo elektronické', code: 'CERP-OBEH-E', category: 'topeni', price: 3200, image: '/fotky/prodejna/oběhové čerpadlo elektronické.webp', availability: 'Skladem' },
        { id: 47, name: 'Oběhové čerpadlo manuální', code: 'CERP-OBEH-M', category: 'topeni', price: 1800, image: '/fotky/prodejna/oběhové čerpadlo manuální.webp', availability: 'Skladem' },
        { id: 48, name: 'Ohřívač Dražice OKCE', code: 'BOJL-OKCE', category: 'topeni', price: 6500, image: '/fotky/prodejna/ohřívač Dražice OKCE.webp', availability: 'Skladem' },
        { id: 49, name: 'Ohřívač Dražice OKCV', code: 'BOJL-OKCV', category: 'topeni', price: 7200, image: '/fotky/prodejna/ohřívač Dražice OKCV.webp', availability: 'Skladem' },
        { id: 50, name: 'Ohřívač vody nepřímotopný stacionární 200l', code: 'BOJL-NTRR-200', category: 'topeni', price: 14500, image: '/fotky/prodejna/okc-ntrr-bp-ohrivac-vody-neprimotopny-stacionarni-okc-200-ntrr-bp--200l-bocni-priruba.webp', availability: 'Na objednávku' },
        { id: 51, name: 'Pokojový bezdrátový termostat', code: 'TERM-BEZDRAT', category: 'topeni', price: 1600, image: '/fotky/prodejna/pokojový bezdrátový termostat.webp', availability: 'Skladem' },

        // Odpad
        { id: 52, name: 'Kabelová chránička', code: 'KAB-CHRAN', category: 'odpad', price: 45, image: '/fotky/prodejna/kabelová chránička.jpeg', availability: 'Skladem' },
        { id: 53, name: 'Poklop pochozí do 200kg', code: 'POKLOP-200', category: 'odpad', price: 450, image: '/fotky/prodejna/poklop pochozí do 200kg.jpg', availability: 'Skladem' },
        { id: 54, name: 'Poklop Globax Kompotech', code: 'POKLOP-GLOBAX', category: 'odpad', price: 1200, image: '/fotky/prodejna/poklop-globax-kompotech-.jpg', availability: 'Skladem' },
        { id: 55, name: 'Poklop litinový B125', code: 'POKLOP-LITINA-B125', category: 'odpad', price: 2800, image: '/fotky/prodejna/poklop-litinovy-b125-12-5t-plny-teleskop-dn-300-bez-manzety.jpg', availability: 'Na objednávku' },
        { id: 56, name: 'Poklop litinový D400', code: 'POKLOP-LITINA-D400', category: 'odpad', price: 4500, image: '/fotky/prodejna/poklop-litinovy-d400-40t-mriz-teleskop-dn-300-bez-manzety.jpg', availability: 'Na objednávku' },
        { id: 57, name: 'Odbočka PPKGEA', code: 'ODB-PPKGEA', category: 'odpad', price: 120, image: '/fotky/prodejna/PPKGEA_ODBOCKA.png', availability: 'Skladem' },
        { id: 58, name: 'Roura DN 400 Wavin', code: 'ROURA-WAVIN-400', category: 'odpad', price: 850, image: '/fotky/prodejna/Roura-DN-400-Wavin.png', availability: 'Skladem' },
        { id: 59, name: 'Šroubovací sedlová odbočka KG', code: 'ODB-SEDLO-KG', category: 'odpad', price: 350, image: '/fotky/prodejna/sroubovaci-sedlova-odbocka-kg-korug-dn400-kg200.jpg', availability: 'Skladem' },
        { id: 60, name: 'Šachtové dno KG průběžné', code: 'SACH-DNO-KG', category: 'odpad', price: 950, image: '/fotky/prodejna/šachtové dno KG průběžné.jpg', availability: 'Skladem' },
        { id: 61, name: 'Šachtové dno s klapkou + prodloužení', code: 'SACH-DNO-KLAP', category: 'odpad', price: 2100, image: '/fotky/prodejna/šachtové dno s klapkou+prodloužení.png', availability: 'Skladem' },
        { id: 62, name: 'Šachtové dno Tegra 1000', code: 'TEGRA-1000', category: 'odpad', price: 4500, image: '/fotky/prodejna/šachtové dno Tegra-1000-prima.png', availability: 'Na objednávku' },
        { id: 63, name: 'Šachtové dno se zpětnou klapkou hladké', code: 'SACH-DNO-KLAP-HL', category: 'odpad', price: 2300, image: '/fotky/prodejna/šachtové_dno-se-zpetnou-klapkou-hlakde.png', availability: 'Skladem' }
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
