<template>
  <section class="contact-section blue-rings-bg">
    <!-- Hero / Intro with image background -->
    <v-sheet class="contact-hero">
      <v-img :src="contactHero" cover class="contact-hero-bg" />
      <div class="contact-hero-overlay"></div>
      <v-container class="contact-container position-relative hero-content">
        <v-row align="center">
          <v-col cols="12" md="7" class="pr-md-8 d-flex align-center">
            <div class="text-content">
              <h1 class="contact-title text-h4 text-md-h3 mb-4 font-weight-bold">Spojte se s námi</h1>
              <p class="contact-sub text-subtitle-1 mb-6">Máte dotazy k našim službám v oblasti energetiky, TZB nebo stavebnictví? Ozvěte se – odpovíme obvykle do jednoho pracovního dne.</p>
              <div class="d-flex align-center flex-wrap contact-chips mb-4">
                <div class="contact-chip d-flex align-center">
                  <v-icon size="24" class="mr-2">mdi-phone</v-icon>
                  <span>+420 545 423 211</span>
                </div>
                <div class="contact-chip d-flex align-center">
                  <v-icon size="24" class="mr-2">mdi-email</v-icon>
                  <span>brno@uchytil.eu</span>
                </div>
                <div class="contact-chip d-flex align-center">
                  <v-icon size="24" class="mr-2">mdi-map-marker</v-icon>
                  <span>Brno, Česká republika</span>
                </div>
                <div class="contact-chip d-flex align-center">
                  <v-icon size="24" class="mr-2">mdi-domain</v-icon>
                  <span>IČO: 60734078</span>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="mt-8 mt-md-12 d-flex justify-center justify-md-end">
            <v-card elevation="4" class="pa-3 pa-md-4 contact-form-card contact-form-compact">
              <h2 class="text-h6 mb-2">Napište nám</h2>
              <v-form @submit.prevent="submit" ref="formRef">
                <v-text-field v-model="form.name" label="Jméno" :rules="[rules.required]" variant="outlined" density="compact" hide-details="auto" class="mb-2" />
                <v-text-field v-model="form.email" label="E‑mail" :rules="[rules.required, rules.email]" variant="outlined" density="compact" hide-details="auto" class="mb-2" />
                <v-text-field v-model="form.phone" label="Telefon" variant="outlined" density="compact" hide-details="auto" class="mb-2" />
                <v-select v-model="form.topic" :items="topics" label="Téma" variant="outlined" density="compact" hide-details="auto" class="mb-2" />
                <v-textarea v-model="form.message" label="Zpráva" :rules="[rules.required]" rows="2" variant="outlined" hide-details="auto" class="mb-2" />
                <v-checkbox v-model="form.agree" :rules="[rules.mustAgree]" label="Souhlasím se zpracováním údajů" density="compact" hide-details class="mb-2" />
                <v-btn type="submit" color="primary" :disabled="submitting" :loading="submitting" block class="mb-1">Odeslat</v-btn>
                <v-expand-transition>
                  <div v-if="submitted" class="success-msg mt-2">Děkujeme, zpráva byla připravena k odeslání.</div>
                </v-expand-transition>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Leadership contacts -->
    <v-container class="py-12 contact-container">
      <v-row justify="center" class="mb-6">
        <v-col cols="12" class="text-center">
          <h2 class="text-h5 text-md-h4 font-weight-bold">Vedení společnosti</h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-card class="leadership-card" elevation="3">
            <v-card-text class="text-center pa-6">
              <v-icon size="56" class="mb-3 text-primary">mdi-account-tie</v-icon>
              <h3 class="text-h6 font-weight-bold mb-1">Josef UCHYTIL</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">Jednatel</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="leadership-card" elevation="3">
            <v-card-text class="text-center pa-6">
              <v-icon size="56" class="mb-3 text-primary">mdi-account-tie</v-icon>
              <h3 class="text-h6 font-weight-bold mb-1">Ing. Richard ŠTĚPÁN</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">Ředitel společnosti</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="leadership-card" elevation="3">
            <v-card-text class="text-center pa-6">
              <v-icon size="56" class="mb-3 text-primary">mdi-account</v-icon>
              <h3 class="text-h6 font-weight-bold mb-1">Šárka ZÁBRŠOVÁ</h3>
              <p class="text-body-2 text-medium-emphasis mb-2">Asistentka ředitele</p>
              <div class="contact-details mt-3">
                <div class="d-flex align-center justify-center mb-1">
                  <v-icon size="18" class="mr-2">mdi-email</v-icon>
                  <a href="mailto:brno@uchytil.eu" class="text-body-2">brno@uchytil.eu</a>
                </div>
                <div class="d-flex align-center justify-center">
                  <v-icon size="18" class="mr-2">mdi-phone</v-icon>
                  <a href="tel:545423211" class="text-body-2">545 423 211</a>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Division contacts with tabs -->
    <v-sheet class="division-contacts-section">
      <v-img :src="divisionBg" cover class="division-bg" />
      <div class="division-overlay"></div>
      <v-container class="py-12 contact-container position-relative">
        <v-row justify="center" class="mb-6">
          <v-col cols="12" class="text-center">
            <h2 class="text-h5 text-md-h4 font-weight-bold mb-2 division-title">Kontakty na divize</h2>
            <p class="text-body-1 division-subtitle">Vyberte si oddělení a spojte se přímo s odpovědnou osobou</p>
          </v-col>
        </v-row>
      <v-row>
        <v-col cols="12">
          <v-tabs v-model="activeTab" bg-color="transparent" color="white" align-tabs="center" class="mb-6 division-tabs">
            <v-tab value="stavba" class="division-tab">
              <v-icon start>mdi-office-building</v-icon>
              Stavba
            </v-tab>
            <v-tab value="energetika" class="division-tab">
              <v-icon start>mdi-lightning-bolt</v-icon>
              Energetika
            </v-tab>
            <v-tab value="tzb" class="division-tab">
              <v-icon start>mdi-pipe</v-icon>
              TZB
            </v-tab>
             <v-tab value="ostatni" class="division-tab">
              <v-icon start>mdi-account-group</v-icon>
              Ostatní
            </v-tab>
          </v-tabs>

          <v-window v-model="activeTab">
            <!-- Stavba tab -->
            <v-window-item value="stavba">
              <v-row justify="center">
                <v-col cols="12" md="4" v-for="(contact, i) in divisionContacts.stavba" :key="i">
                  <v-card class="division-card" elevation="2">
                    <v-card-text class="text-center pa-5">
                      <v-icon size="48" class="mb-3 text-primary">mdi-account-circle</v-icon>
                      <h3 class="text-h6 font-weight-bold mb-1">{{ contact.name }}</h3>
                      <p class="text-body-2 text-medium-emphasis mb-3">{{ contact.role }}</p>
                      <div class="contact-details">
                        <div class="d-flex align-center justify-center mb-1" v-if="contact.email">
                          <v-icon size="16" class="mr-2">mdi-email</v-icon>
                          <a :href="'mailto:' + contact.email" class="text-body-2">{{ contact.email }}</a>
                        </div>
                        <div class="d-flex align-center justify-center" v-if="contact.phone">
                          <v-icon size="16" class="mr-2">mdi-phone</v-icon>
                          <a :href="'tel:' + contact.phone.replace(/\s/g, '')" class="text-body-2">{{ contact.phone }}</a>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-window-item>

            <!-- Energetika tab -->
            <v-window-item value="energetika">
              <v-row justify="center">
                <v-col cols="12" md="4" v-for="(contact, i) in divisionContacts.energetika" :key="i">
                  <v-card class="division-card" elevation="2">
                    <v-card-text class="text-center pa-5">
                      <v-icon size="48" class="mb-3 text-primary">mdi-account-circle</v-icon>
                      <h3 class="text-h6 font-weight-bold mb-1">{{ contact.name }}</h3>
                      <p class="text-body-2 text-medium-emphasis mb-3">{{ contact.role }}</p>
                      <div class="contact-details">
                        <div class="d-flex align-center justify-center mb-1" v-if="contact.email">
                          <v-icon size="16" class="mr-2">mdi-email</v-icon>
                          <a :href="'mailto:' + contact.email" class="text-body-2">{{ contact.email }}</a>
                        </div>
                        <div class="d-flex align-center justify-center" v-if="contact.phone">
                          <v-icon size="16" class="mr-2">mdi-phone</v-icon>
                          <a :href="'tel:' + contact.phone.replace(/\s/g, '')" class="text-body-2">{{ contact.phone }}</a>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-window-item>

            <!-- TZB tab -->
            <v-window-item value="tzb">
              <v-row justify="center">
                <v-col cols="12" md="4" v-for="(contact, i) in divisionContacts.tzb" :key="i">
                  <v-card class="division-card" elevation="2">
                    <v-card-text class="text-center pa-5">
                      <v-icon size="48" class="mb-3 text-primary">mdi-account-circle</v-icon>
                      <h3 class="text-h6 font-weight-bold mb-1">{{ contact.name }}</h3>
                      <p class="text-body-2 text-medium-emphasis mb-3">{{ contact.role }}</p>
                      <div class="contact-details">
                        <div class="d-flex align-center justify-center mb-1" v-if="contact.email">
                          <v-icon size="16" class="mr-2">mdi-email</v-icon>
                          <a :href="'mailto:' + contact.email" class="text-body-2">{{ contact.email }}</a>
                        </div>
                        <div class="d-flex align-center justify-center" v-if="contact.phone">
                          <v-icon size="16" class="mr-2">mdi-phone</v-icon>
                          <a :href="'tel:' + contact.phone.replace(/\s/g, '')" class="text-body-2">{{ contact.phone }}</a>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-window-item>

            <!-- Ostatni tab -->
            <v-window-item value="ostatni">
              <v-row justify="center">
                <v-col cols="12" md="4" v-for="(contact, i) in divisionContacts.ostatni" :key="i">
                  <v-card class="division-card" elevation="2">
                    <v-card-text class="text-center pa-5">
                      <v-icon size="48" class="mb-3 text-primary">mdi-account-circle</v-icon>
                      <h3 class="text-h6 font-weight-bold mb-1">{{ contact.name }}</h3>
                      <p class="text-body-2 text-medium-emphasis mb-3">{{ contact.role }}</p>
                      <div class="contact-details">
                        <div class="d-flex align-center justify-center mb-1" v-if="contact.email">
                          <v-icon size="16" class="mr-2">mdi-email</v-icon>
                          <a :href="'mailto:' + contact.email" class="text-body-2">{{ contact.email }}</a>
                        </div>
                        <div class="d-flex align-center justify-center" v-if="contact.phone">
                          <v-icon size="16" class="mr-2">mdi-phone</v-icon>
                          <a :href="'tel:' + contact.phone.replace(/\s/g, '')" class="text-body-2">{{ contact.phone }}</a>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
      </v-container>
    </v-sheet>

    <!-- Map / location with tabs -->
    <div class="map-wrapper">
      <v-container class="contact-container py-8">
        <v-row justify="center" class="mb-4">
          <v-col cols="12" class="text-center">
            <h2 class="text-h5 text-md-h4 font-weight-bold mb-2">Naše pobočky</h2>
            <p class="text-body-1">Vyberte si pobočku a najděte nás na mapě</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-tabs v-model="activeLocation" bg-color="#0c2b68" color="white" align-tabs="center" class="mb-4">
              <v-tab value="brno">
                <v-icon start>mdi-map-marker</v-icon>
                Brno
              </v-tab>
              <v-tab value="hodonin">
                <v-icon start>mdi-map-marker</v-icon>
                Hodonín
              </v-tab>
              <v-tab value="zdar">
                <v-icon start>mdi-map-marker</v-icon>
                Žďár nad Sázavou
              </v-tab>
              <v-tab value="zdar-prodejna">
                <v-icon start>mdi-store</v-icon>
                Žďár - prodejna
              </v-tab>
            </v-tabs>

            <v-window v-model="activeLocation">
              <!-- Brno -->
              <v-window-item value="brno">
                <v-card elevation="3" class="overflow-hidden">
                  <div class="map-embed" aria-label="Mapa pobočky Brno">
                    <iframe 
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=K+Terminálu+7,+619+00+Brno&zoom=15" 
                      width="100%" 
                      height="100%" 
                      style="border:0;" 
                      allowfullscreen="" 
                      loading="lazy" 
                      referrerpolicy="no-referrer-when-downgrade"
                      title="Mapa pobočky Brno"
                    ></iframe>
                  </div>
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">Pobočka Brno</h3>
                    <div class="d-flex align-center mb-1">
                      <v-icon size="18" class="mr-2">mdi-map-marker</v-icon>
                      <span>K Terminálu 7, 619 00 Brno</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>

              <!-- Hodonín -->
              <v-window-item value="hodonin">
                <v-card elevation="3" class="overflow-hidden">
                  <div class="map-embed" aria-label="Mapa pobočky Hodonín">
                    <iframe 
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=U+Elektrárny+1,+695+01+Hodonín&zoom=15" 
                      width="100%" 
                      height="100%" 
                      style="border:0;" 
                      allowfullscreen="" 
                      loading="lazy" 
                      referrerpolicy="no-referrer-when-downgrade"
                      title="Mapa pobočky Hodonín"
                    ></iframe>
                  </div>
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">Pobočka Hodonín</h3>
                    <div class="d-flex align-center mb-1">
                      <v-icon size="18" class="mr-2">mdi-map-marker</v-icon>
                      <span>U Elektrárny 1, 695 01 Hodonín</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>

              <!-- Žďár nad Sázavou -->
              <v-window-item value="zdar">
                <v-card elevation="3" class="overflow-hidden">
                  <div class="map-embed" aria-label="Mapa pobočky Žďár nad Sázavou">
                    <iframe 
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Brněnská+41,+591+01+Žďár+nad+Sázavou&zoom=15" 
                      width="100%" 
                      height="100%" 
                      style="border:0;" 
                      allowfullscreen="" 
                      loading="lazy" 
                      referrerpolicy="no-referrer-when-downgrade"
                      title="Mapa pobočky Žďár nad Sázavou"
                    ></iframe>
                  </div>
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">Pobočka Žďár nad Sázavou</h3>
                    <div class="d-flex align-center mb-1">
                      <v-icon size="18" class="mr-2">mdi-map-marker</v-icon>
                      <span>Brněnská 41, 591 01 Žďár nad Sázavou</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>

              <!-- Žďár - prodejna -->
              <v-window-item value="zdar-prodejna">
                <v-card elevation="3" class="overflow-hidden">
                  <div class="map-embed" aria-label="Mapa prodejny Žďár nad Sázavou">
                    <iframe 
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Brněnská+41,+591+01+Žďár+nad+Sázavou&zoom=15" 
                      width="100%" 
                      height="100%" 
                      style="border:0;" 
                      allowfullscreen="" 
                      loading="lazy" 
                      referrerpolicy="no-referrer-when-downgrade"
                      title="Mapa prodejny Žďár nad Sázavou"
                    ></iframe>
                  </div>
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-2">Prodejna Žďár nad Sázavou</h3>
                    <div class="d-flex align-center mb-1">
                      <v-icon size="18" class="mr-2">mdi-store</v-icon>
                      <span>Brněnská 41, 591 01 Žďár nad Sázavou</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Contact hero background image (easy to change)
const contactHero = ref('/fotky/energetika.png')
// Division section background image
const divisionBg = ref('/fotky/references/back.png')

const formRef = ref(null)
const submitting = ref(false)
const submitted = ref(false)
const topics = ['Dotaz', 'Energetika', 'TZB', 'Stavebnictví', 'Kariéra']

// Division tabs
const activeTab = ref('stavba')

// Location tabs
const activeLocation = ref('brno')

// Division contacts data
const divisionContacts = ref({
  tzb: [
    { name: 'Martin Konečný DiS.', role: 'Ředitel divize', email: 'martin.konecny@uchytil.eu', phone: '545 423 223' },
    { name: 'Ing. Markéta Miškářová', role: 'Asistentka', email: 'marketa.miskarova@uchytil.eu', phone: '545 423 235' },
    { name: 'Radim Došek', role: 'Vedoucí střediska projekce', email: 'radim.dosek@uchytil.eu', phone: '560 594 121' },
    { name: 'Martin Konečný DiS.', role: 'Vedoucí realizace TZB Brno', email: 'martin.konecny@uchytil.eu', phone: '545 423 223' },
    { name: 'Jaroslav Peřina', role: 'Vedoucí realizace Žďár n. S.', email: 'jaroslav.perina@uchytil.eu', phone: '560 594 117' },
    { name: 'Jaroslav Křivánek', role: 'Vedoucí střediska servis', email: 'jaroslav.krivanek@uchytil.eu', phone: '545 423 234' }
  ],
  stavba: [
    { name: 'Ing. Radek Tkáč', role: 'Ředitel divize', email: 'radek.tkac@uchytil.eu', phone: '545 423 238' },
    { name: 'Ing. Tereza Böhmová', role: 'Asistentka (zástup za J. Malou)', email: 'tereza.bohmova@uchytil.eu', phone: '545 423 246' },
    { name: 'Ing. Martin Hublík', role: 'Vedoucí střediska projekce', email: 'martin.hublik@uchytil.eu', phone: '545 423 244' },
    { name: 'Ing. Martin Hublík', role: 'Vedoucí realizace pozemní stavby', email: 'martin.hublik@uchytil.eu', phone: '545 423 244' },
    { name: 'Ing. Radek Tkáč', role: 'Vedoucí realizace liniové stavby', email: 'radek.tkac@uchytil.eu', phone: '545 423 238' },
    { name: 'Martin Vangel', role: 'Vedoucí střediska tepelné rozvody', email: 'martin.vangel@uchytil.eu', phone: '545 423 282' }
  ],
  energetika: [
    { name: 'Ing. Marek Dohnálek', role: 'Ředitel divize', email: 'marek.dohnalek@uchytil.eu', phone: '518 321 039' },
    { name: 'Ing. Miroslava Šupová', role: 'Asistentka', email: 'miroslava.supova@uchytil.eu', phone: '518 321 039' },
    { name: 'Ing. Matěj Obšil', role: 'Vedoucí střediska projekce', email: 'matej.obsil@uchytil.eu', phone: '545 423 232' },
    { name: 'Ing. Petr Zábranský', role: 'Vedoucí realizace strojního stř.', email: 'petr.zabransky@uchytil.eu', phone: '518 321 039' },
    { name: 'Jakub Grombíř', role: 'Vedoucí realizace střediska elektro', email: 'jakub.grombir@uchytil.eu', phone: '518 321 039' },
    { name: 'Jakub Šešulka', role: 'Vedoucí střediska servis', email: 'jakub.sesulka@uchytil.eu', phone: '518 342 447' }
  ],
  ostatni: [
    { name: 'Ivana Ješinová', role: 'Ekonomický úsek (spojovatelka)', email: 'ivana.jesinova@uchytil.eu', phone: '545 423 211' },
    { name: 'Ing. Jana Vacková', role: 'Personální úsek', email: 'jana.vackova@uchytil.eu', phone: '560 594 114' },
    { name: 'Ing. Tereza Böhmová', role: 'Organizačně-správní úsek', email: 'tereza.bohmova@uchytil.eu', phone: '545 423 246' },
    { name: 'Jaroslav Ptáček', role: 'Prodejna', email: 'jaroslav.ptacek@uchytil.eu', phone: '604 293 916' }
  ]
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  topic: '',
  message: '',
  agree: false
})

const rules = {
  required: v => !!v || 'Povinné pole',
  email: v => /.+@.+\..+/.test(v) || 'Neplatný e‑mail',
  mustAgree: v => v || 'Musíte souhlasit'
}

const submit = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  submitting.value = true
  // Simulate send
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
    // mailto fallback (could open email client)
    const mailto = `mailto:info@uchytil.cz?subject=${encodeURIComponent('Webový dotaz - ' + (form.value.topic || 'Obecný'))}&body=${encodeURIComponent(form.value.message + '\n\nJméno: ' + form.value.name + '\nTelefon: ' + form.value.phone)}`
    // window.location.href = mailto // Uncomment to actually trigger the mail client
  }, 800)
}
</script>

<style scoped>
.contact-section {
  background: linear-gradient(180deg, #ffffff 0%, #f7f9fb 60%, #f2f5f9 100%);
}
.contact-hero { position: relative; overflow: hidden; }
.contact-hero-bg { position: absolute; inset: 0; filter: brightness(0.55); }
.contact-hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.35)); }
.contact-title { color:#fff; }
.contact-sub { color:#e5edf5; }
.contact-container {
  width: 75%;
  max-width: 1700px;
  margin: 0 auto;
}
@media (max-width: 1280px){
  .contact-container { width: 92%; }
}
@media (max-width: 960px){
  .contact-container { width: 100%; }
}
.contact-chip {
  background: #0c2b68;
  color: #fff;
  padding: 8px 14px;
  border-radius: 32px;
  font-size: 0.9rem;
}
.contact-chips {
  gap: 8px;
}
@media (max-width: 600px) {
  .contact-chips {
    gap: 8px;
  }
}
@media (max-width: 400px) {
  .contact-chips {
    gap: 8px;
  }
}
.contact-form-card {
  border-radius: 18px;
}
.contact-form-compact {
  max-width: 460px;
}
.success-msg {
  color: #0c7e43;
  font-weight: 600;
}
.leadership-card {
  border-radius: 16px;
  transition: box-shadow .25s ease, transform .25s ease;
  height: 100%;
}
.leadership-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15);
}
.leadership-card .contact-details a {
  color: #031f68;
  text-decoration: none;
}
.leadership-card .contact-details a:hover {
  text-decoration: underline;
}
.division-contacts-section {
  position: relative;
  overflow: hidden;
}
.division-bg {
  position: absolute;
  inset: 0;
  filter: brightness(0.5);
}
.division-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.45));
}
.division-title {
  color: #fff;
}
.division-subtitle {
  color: #e5edf5;
}
.division-contacts-section :deep(.v-tab) {
  color: rgba(255,255,255,0.85);
}
.division-contacts-section :deep(.v-tab--selected) {
  color: #fff;
}

/* Larger, more tappable tabs for contact & location selectors */
.division-contacts-section :deep(.v-tab),
.map-wrapper :deep(.v-tab),
.contact-section :deep(.v-tab) {
  font-size: 1.05rem;
  padding: 10px 18px;
  min-height: 52px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.division-contacts-section :deep(.v-tab .v-icon),
.map-wrapper :deep(.v-tab .v-icon),
.contact-section :deep(.v-tab .v-icon) {
  font-size: 1.15rem;
}
.division-contacts-section :deep(.v-tab--selected),
.map-wrapper :deep(.v-tab--selected) {
  font-weight: 800;
}

/* Slight spacing between tabs when they have transparent background */
.division-contacts-section :deep(.v-tabs) {
  gap: 8px;
}
.division-card {
  border-radius: 14px;
  transition: box-shadow .25s ease, transform .25s ease;
  height: 100%;
  background: rgba(255,255,255,0.96);
}
.division-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px -6px rgba(0,0,0,0.12);
}
.division-card .contact-details a {
  color: #031f68;
  text-decoration: none;
  font-size: 0.875rem;
}
.division-card .contact-details a:hover {
  text-decoration: underline;
}
.map-wrapper {
  padding: 0 0 80px;
}
.map-wrapper :deep(.v-tab) {
  color: white;
}
.map-embed { height: 450px; position: relative; }
.map-embed iframe { display: block; }

/* Titles: larger and uppercase for the Contact section */
.contact-section .contact-title,
.contact-section h2,
.contact-section h3 {
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.contact-section .contact-title {
  font-size: clamp(0.7rem, 2vw, 1.2rem);
  font-weight: 900;
}

.contact-section h2 {
  font-size: clamp(1.4rem, 3.2vw, 2rem);
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.contact-section h3 {
  font-size: clamp(1.05rem, 2.0vw, 1.25rem);
  font-weight: 800;
}

.division-title {
  text-transform: uppercase;
  font-size: clamp(1.2rem, 2.8vw, 1.7rem);
  font-weight: 900;
}

/* Hero content spacing - more space on top */
.hero-content {
  padding-top: clamp(80px, 12vh, 120px);
  padding-bottom: clamp(48px, 8vh, 80px);
}
</style>