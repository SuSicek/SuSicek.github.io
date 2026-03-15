<template>
  <div class="prodejna-page text-center">
    <!-- Hero Section -->
    <v-sheet
      class="d-flex align-center justify-center position-relative"
      height="300"
      color="primary"
      style="overflow: hidden;"
    >
      
      <div class="position-relative z-index-1 text-white px-4">
        <h1 class="text-h2 font-weight-bold mb-4">Prodejna</h1>
        <p class="text-h5 font-weight-light" style="max-width: 800px; margin: 0 auto;">
          Skladové zásoby, odborné poradenství a materiál ihned k odběru.
        </p>
      </div>
    </v-sheet>

    <v-container class="py-12">
      
      <!-- Intro Section -->
      <v-row class="mb-16 align-center">
        <v-col cols="12" md="7" class="text-left">
          <h2 class="text-h4 text-primary font-weight-bold mb-6">Úvod</h2>
          <p class="text-body-1 mb-6 text-justify" style="font-size: 1.1rem !important; line-height: 1.8;">
            Kamenná prodejna <strong>VODO • TOPO • PLYN</strong> nabízí kompletní sortiment topenářského, vodoinstalačního i plynářského materiálu ihned k odběru – a k tomu odborné poradenství vycházející z více než 30 let zkušeností v oboru.
          </p>
          
          <v-row class="mb-6">
            <v-col cols="12">
              <v-card variant="outlined" color="primary" class="h-100 pa-4" style="border-width: 2px;">
                <div class="text-h6 font-weight-bold mb-4">Co u nás najdete</div>
                <v-list density="compact">
                  <v-list-item prepend-icon="mdi-check-circle" color="primary">Kompletní sortiment VODO • TOPO • PLYN</v-list-item>
                  <v-list-item prepend-icon="mdi-check-circle" color="primary">Skladové zásoby běžně používaného materiálu</v-list-item>
                  <v-list-item prepend-icon="mdi-check-circle" color="primary">Možnost zajištění kompletní dodávky včetně montáže</v-list-item>
                  <v-list-item prepend-icon="mdi-check-circle" color="primary">Individuální objednání a rychlé dodání neskladového zboží</v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
          
          <div class="d-flex align-center bg-grey-lighten-4 pa-4 rounded-lg">
             <p class="font-italic text-center text-body-1 mb-0">
               U nás najdete nejen materiál, ale i podporu odborníků, kteří vám pomohou dotáhnout každý projekt do úspěšného konce.
             </p>
          </div>
        </v-col>
        
        <v-col cols="12" md="5">
           <v-img 
             src="/fotky/prodejna/fotky prodejna/p1.jpg" 
             rounded="xl" 
             cover 
             class="elevation-6 border-primary" 
             style="border: 4px solid #1976D2; min-height: 400px;"
           ></v-img>
        </v-col>
      </v-row>

      <!-- Services Grid -->
      <div class="mb-16">
        <h2 class="text-h4 font-weight-bold text-center mb-10">Pro koho tu jsme</h2>
        <v-row justify="center">
          <!-- Craftsmen -->
          <v-col cols="12" md="4">
            <v-card class="h-100 ServiceCard" elevation="3">
              <v-img src="/fotky/jine/remeslnik.png" height="220" cover gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)">
                <v-card-title class="text-white position-absolute bottom-0 w-100 pb-4 text-h5">Pro řemeslníky</v-card-title>
              </v-img>
              <v-card-text class="pa-6 text-left">
                <v-list density="compact">
                  <v-list-item prepend-icon="mdi-cached">Systém vracení přebytků – šetří čas i náklady</v-list-item>
                  <v-list-item prepend-icon="mdi-account-hard-hat">Technické poradenství a pomoc s volbou řešení</v-list-item>
                  <v-list-item prepend-icon="mdi-handshake">Možnost pravidelných odběrů za výhodných podmínek</v-list-item>
                  <v-list-item prepend-icon="mdi-truck-fast">Rychlé vyřízení objednávek díky vlastnímu skladu</v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          
          <!-- Households -->
          <v-col cols="12" md="4">
            <v-card class="h-100 ServiceCard" elevation="3">
              <v-img src="/fotky/jine/domacnosti.png" height="220" cover gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)">
                <v-card-title class="text-white position-absolute bottom-0 w-100 pb-4 text-h5">Pro domácnosti</v-card-title>
              </v-img>
              <v-card-text class="pa-6 text-left">
                <v-list density="compact">
                  <v-list-item prepend-icon="mdi-home-analytics">Poradenství pro rekonstrukce a drobné opravy</v-list-item>
                  <v-list-item prepend-icon="mdi-water-pump">Pomoc s výběrem materiálu i technických komponentů</v-list-item>
                  <v-list-item prepend-icon="mdi-wrench">Zajištění kompletní dodávky s montáží</v-list-item>
                  <v-list-item prepend-icon="mdi-help-circle-outline">Ochotný personál, který poradí i laikům</v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Extra Services -->
          <v-col cols="12" md="4">
            <v-card class="h-100 ServiceCard" elevation="3">
              <v-img src="/fotky/jine/dronBrno.png" height="220" cover gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)">
                <v-card-title class="text-white position-absolute bottom-0 w-100 pb-4 text-h5">Služby navíc</v-card-title>
              </v-img>
              <v-card-text class="pa-6 text-left">
                 <v-list density="compact">
                  <v-list-item prepend-icon="mdi-truck-delivery">Závoz materiálu na místo realizace (dle domluvy)</v-list-item>
                  <v-list-item prepend-icon="mdi-puzzle">Zajištění atypických či specializovaných produktů</v-list-item>
                  <v-list-item prepend-icon="mdi-heart-outline">Individuální přístup a férové jednání</v-list-item>
                  <v-list-item prepend-icon="mdi-phone-forward">Možnost telefonické konzultace před návštěvou</v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- AKCE Section -->
      <div class="mb-16">
         <v-card rounded="xl" class="overflow-hidden border-action" elevation="4">
            <v-sheet color="red-lighten-5" class="pa-8 pa-md-12 text-center">
                <v-chip color="red" label class="mb-4 px-6 font-weight-bold" size="large">AKCE PRODEJNA</v-chip>
                <h2 class="text-h3 font-weight-bold text-red-darken-4 mb-2">Aktuální akční nabídka</h2>
                <p class="text-h6 text-red-darken-2 mb-8">Nejlepší ceny pro řemeslníky i domácnosti</p>
                
                <v-row justify="center">
                   <v-col cols="12" sm="6" md="3" v-for="(item, i) in actionItems" :key="i">
                      <v-card class="h-100 action-card" hover variant="elevated" color="white">
                         <div class="position-relative">
                            <v-img :src="item.image" height="200" contain class="pa-2 bg-white"></v-img>
                            <v-chip color="red" class="position-absolute top-0 right-0 ma-2 font-weight-bold" variant="flat">
                               -{{ item.discount }}%
                            </v-chip>
                         </div>
                         <v-card-item class="pt-4 text-left">
                            <div class="text-subtitle-1 font-weight-bold mb-2" style="min-height: 48px; line-height: 1.2;">{{ item.name }}</div>
                            <div class="d-flex align-end justify-space-between mt-auto">
                               <div>
                                   <div class="text-caption text-decoration-line-through text-grey">Původně: {{ item.oldPrice }} Kč</div>
                                   <div class="text-h5 font-weight-bold text-red">{{ item.price }} Kč</div>
                               </div>
                            </div>
                         </v-card-item>
                      </v-card>
                   </v-col>
                </v-row>
            </v-sheet>
         </v-card>
      </div>

      <!-- Trvale nízké ceny -->
      <div class="mb-16">
         <div class="text-center mb-10">
           <h2 class="text-h4 font-weight-bold text-primary mb-3">Zboží za trvale nízké ceny</h2>
           <p class="text-body-1 text-grey-darken-1" style="max-width: 700px; margin: 0 auto;">
             Vybrané zboží nabízíme dlouhodobě za výhodné ceny. Bez časového omezení a bez kompromisů v kvalitě.
           </p>
         </div>
         <v-row>
             <v-col cols="12" sm="6" md="3" v-for="(item, i) in lowPriceItems" :key="i">
                <v-card class="h-100 low-price-card" hover variant="outlined">
                   <v-img :src="item.image" height="180" contain class="pa-4 bg-white align-end"></v-img>
                   <v-divider></v-divider>
                   <v-card-item class="py-4 text-center">
                      <div class="text-subtitle-2 font-weight-bold mb-2 text-wrap">{{ item.name }}</div>
                      <v-chip color="primary" variant="flat" size="small">Super cena</v-chip>
                      <div class="text-h6 font-weight-bold text-primary mt-2">{{ item.price }} Kč</div>
                   </v-card-item>
                </v-card>
             </v-col>
         </v-row>
      </div>

      <!-- Sortiment -->
      <div class="mb-16">
        <h2 class="text-h4 font-weight-bold text-center mb-8">Kompletní sortiment</h2>
        
        <div class="d-flex justify-center mb-8">
           <v-tabs v-model="selectedSortimentTab" color="primary" align-tabs="center" class="rounded-pill">
              <v-tab v-for="tab in sortimentTabs" :key="tab.value" :value="tab.value">{{ tab.title }}</v-tab>
           </v-tabs>
        </div>

        <v-row dense>
          <v-col cols="6" sm="4" md="3" lg="2" v-for="cat in filteredAssortment" :key="cat.title">
            <v-card class="text-center py-8 h-100 category-card d-flex flex-column align-center justify-center" hover elevation="3" border>
               <v-icon size="48" color="primary" class="mb-4">{{ cat.icon }}</v-icon>
               <div class="text-subtitle-2 font-weight-bold text-uppercase px-2 text-high-emphasis">{{ cat.title }}</div>
            </v-card>
          </v-col>
        </v-row>
      </div>

       <!-- Rezervace -->
       <v-card class="mb-16 bg-blue-darken-3 text-white rounded-xl overflow-hidden elevation-10">
          <v-row no-gutters>
            <v-col cols="12" md="7" class="pa-8 pa-md-12 d-flex flex-column justify-center">
               <h2 class="text-h3 font-weight-bold mb-8">Jak rezervovat zboží?</h2>
               
               <div class="d-flex align-start mb-8">
                 <v-avatar color="white" size="50" class="mr-6">
                    <span class="text-h5 font-weight-bold text-primary">1</span>
                 </v-avatar>
                 <div>
                    <div class="text-h5 font-weight-bold mb-2">Kontaktujte nás</div>
                    <p class="text-grey-lighten-2 text-body-1">Zavolejte na prodejnu nebo napište e-mail. Ověříme pro vás dostupnost zboží.</p>
                 </div>
               </div>

               <div class="d-flex align-start mb-8">
                 <v-avatar color="white" size="50" class="mr-6">
                    <span class="text-h5 font-weight-bold text-primary">2</span>
                 </v-avatar>
                 <div>
                    <div class="text-h5 font-weight-bold mb-2">Připravíme k odběru</div>
                    <p class="text-grey-lighten-2 text-body-1">Vše pro vás nachystáme. Dáme vám vědět, jakmile bude objednávka kompletní.</p>
                 </div>
               </div>

               <div class="d-flex align-start">
                 <v-avatar color="white" size="50" class="mr-6">
                    <span class="text-h5 font-weight-bold text-primary">3</span>
                 </v-avatar>
                 <div>
                    <div class="text-h5 font-weight-bold mb-2">Vyzvednutí / Závoz</div>
                    <p class="text-grey-lighten-2 text-body-1">Stavte se osobně na Brněnské 41 nebo se domluvíme na závozu.</p>
                 </div>
               </div>
            </v-col> 
            <v-col cols="12" md="5" class="position-relative d-none d-md-block">
               <v-img src="/fotky/jine/kontejnerbig.png" cover class="h-100" style="filter: brightness(0.9);"></v-img>
            </v-col>
          </v-row>
       </v-card>

       <!-- Kontakty -->
       <div id="kontakty" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold mb-10 text-primary">Kontaktujte nás</h2>
          <v-row justify="center" align="stretch">
             <v-col cols="12" md="4">
                <v-card class="py-8 h-100 px-4" elevation="2">
                   <v-avatar color="primary-lighten-5" size="80" class="mb-4">
                      <v-icon color="primary" size="40">mdi-map-marker</v-icon>
                   </v-avatar>
                   <div class="text-h5 font-weight-bold mb-3">Kde nás najdete</div>
                   <div class="text-h6 text-grey-darken-1 mb-2">Brněnská 41</div>
                   <div class="text-body-1 text-grey">Žďár nad Sázavou</div>
                   <div class="mt-4">
                      <v-btn variant="outlined" color="primary" href="https://mapy.cz/s/pufonezuze" target="_blank">
                        Ukázat na mapě
                      </v-btn>
                   </div>
                </v-card>
             </v-col>
             
             <v-col cols="12" md="4">
                <v-card class="py-8 h-100 px-4" elevation="2">
                   <v-avatar color="primary-lighten-5" size="80" class="mb-4">
                      <v-icon color="primary" size="40">mdi-clock-outline</v-icon>
                   </v-avatar>
                   <div class="text-h5 font-weight-bold mb-3">Otvírací doba</div>
                   <div class="text-h4 font-weight-bold text-primary mb-2">Po – Pá</div>
                   <div class="text-h4 font-weight-bold text-primary">6:00 – 16:00</div>
                </v-card>
             </v-col>
             
             <v-col cols="12" md="4">
                <v-card class="py-8 h-100 px-4" elevation="2">
                   <v-avatar color="primary-lighten-5" size="80" class="mb-4">
                      <v-icon color="primary" size="40">mdi-phone-classic</v-icon>
                   </v-avatar>
                   <div class="text-h5 font-weight-bold mb-4">Vedoucí prodejny</div>
                   
                   <div class="mb-4">
                      <div class="text-subtitle-1 font-weight-bold">Jaroslav Ptáček</div>
                      <a href="tel:604293916" class="text-h6 text-decoration-none text-primary">604 293 916</a>
                   </div>
                   
                   <v-divider class="my-3 mx-10"></v-divider>

                   <div>
                      <div class="text-subtitle-1 font-weight-bold">Milan Šorf</div>
                      <a href="tel:737335109" class="text-h6 text-decoration-none text-primary">737 335 109</a>
                   </div>
                </v-card>
             </v-col>
          </v-row>
       </div>

    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ProdejnaView',
  data() {
    return {
      actionItems: [
        { name: 'Sprchová zástěna + vanička', image: '/fotky/prodejna/sprchová zástěna+vanička z litého mramoru.avif', price: '7 990', oldPrice: '10 500', discount: 24 },
        { name: 'Modul GEBERIT pro závěsné WC', image: '/fotky/prodejna/modul GEBERIT pro závěsné WC.avif', price: '4 490', oldPrice: '5 800', discount: 22 },
        { name: 'Automatické čerpadlo na vodu', image: '/fotky/prodejna/automatické čerpadlo na vodu.avif', price: '3 290', oldPrice: '4 100', discount: 19 },
        { name: 'Vodárna EBARA', image: '/fotky/prodejna/vodádna EBARA.avif', price: '8 500', oldPrice: '9 900', discount: 15 }
      ],
      lowPriceItems: [
        { name: 'Kanalizační roura DN400', image: '/fotky/prodejna/Roura-DN-400-Wavin.png', price: '890' },
        { name: 'Šachtové dno Tegra 1000', image: '/fotky/prodejna/šachtové dno Tegra-1000-prima.png', price: '3 200' },
        { name: 'Baterie dřezová stojánková', image: '/fotky/prodejna/baterie dřezová.png', price: '1 250' },
        { name: 'Podomítková baterie set', image: '/fotky/prodejna/podomítková baterie+příslušenství.jpg', price: '2 890' }
      ],
      sortimentTabs: [
        { title: 'Vše', value: 'all' },
        { title: 'Topení', value: 'topeni' },
        { title: 'Voda & Kanalizace', value: 'voda' },
        { title: 'Koupelny', value: 'koupelny' }
      ],
      selectedSortimentTab: 'all',
      assortmentCategories: [
        { title: 'Kotle a ohřívače', icon: 'mdi-water-boiler', type: 'topeni' },
        { title: 'Radiátory', icon: 'mdi-radiator', type: 'topeni' },
        { title: 'Podlahové topení', icon: 'mdi-heating-coil', type: 'topeni' },
        { title: 'Vodárny a čerpadla', icon: 'mdi-water-pump', type: 'voda' },
        { title: 'Sanitární keramika', icon: 'mdi-toilet', type: 'koupelny' },
        { title: 'Vany a sprchy', icon: 'mdi-shower', type: 'koupelny' },
        { title: 'Vodovodní baterie', icon: 'mdi-faucet', type: 'koupelny' },
        { title: 'Koupelnový nábytek', icon: 'mdi-cupboard-outline', type: 'koupelny' },
        { title: 'Vnitřní odpady', icon: 'mdi-pipe', type: 'voda' },
        { title: 'Venkovní kanalizace', icon: 'mdi-pipe-valve', type: 'voda' },
        { title: 'Šachty', icon: 'mdi-manhole', type: 'voda' },
        { title: 'Obklady a dlažby', icon: 'mdi-wall', type: 'koupelny' }
      ]
    }
  },
  computed: {
    filteredAssortment() {
      if (this.selectedSortimentTab === 'all') return this.assortmentCategories;
      return this.assortmentCategories.filter(item => item.type === this.selectedSortimentTab);
    }
  }
}
</script>

<style scoped>
.hero-content {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
}
.dimmed-bg {
  filter: brightness(0.6);
}
.drop-shadow {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}
.border-action {
  border: 4px solid #D32F2F;
}
.ServiceCard {
  transition: transform 0.3s;
}
.ServiceCard:hover {
  transform: translateY(-8px);
}
.action-card {
  transition: all 0.3s;
  border: 1px solid #eee;
}
.action-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 25px rgba(0,0,0,0.15);
}
.category-card {
  transition: all 0.2s;
  border: 1px solid transparent;
}
.category-card:hover {
  transform: translateY(-5px);
  background-color: #E3F2FD !important;
  border-color: #2196F3;
}
.low-price-card:hover {
  border-color: #2196F3;
}
</style>
