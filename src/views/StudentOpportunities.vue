<template>
  <div class="student-opportunities-page bg-white fill-height">
    <!-- Hero Header -->
    <div class="job-header py-16 position-relative overflow-hidden" style="min-height: 480px; display: flex; align-items: flex-end;">
        <!-- Background Image & Overlay -->
        <div class="job-header-bg position-absolute w-100 h-100" style="top:0; left:0; z-index:0; background-image: url('/fotky/stavba2.png'); background-size: cover; background-position: center;"></div>
        <div class="job-header-overlay position-absolute w-100 h-100 bg-black" style="top:0; left:0; z-index:1; opacity: 0.75;"></div>

        <v-container class="position-relative" style="z-index: 2;">
            <v-btn variant="text" color="white" class="mb-6 pl-0" :to="{ name: 'Career', hash: '#jobs' }">
                <v-icon start>mdi-arrow-left</v-icon> Zpět na kariéru
            </v-btn>
            
            <div>
                <v-chip color="primary" size="large" variant="flat" class="mb-4 font-weight-bold elevation-4" label>Studenti & Absolventi</v-chip>
                <h1 class="text-h3 font-weight-black mb-4 text-white">Nastartujte svou kariéru s námi</h1>
                <p class="text-h6 text-grey-lighten-2" style="max-width: 800px; line-height: 1.6;">
                    Hledáme talenty, kteří chtějí růst. Nabízíme prostor pro realizaci vašich nápadů, vedení zkušenými mentory a reálnou praxi na zajímavých projektech.
                </p>
            </div>
        </v-container>
    </div>

    <v-container class="job-content py-12" style="max-width: 1100px;">
        <v-row>
            <!-- Left Column: Details -->
            <v-col cols="12" md="7" class="pr-md-8">
                
                <div class="mb-12">
                   <h2 class="text-h4 font-weight-bold mb-6">Jsi student nebo absolvent stavebního a strojního oboru?</h2>
                   
                   <h3 class="text-h5 font-weight-bold mb-4 text-primary">Máš zájem o:</h3>
                   
                   <v-expansion-panels variant="accordion" class="mb-10 elevation-0">
                     <v-expansion-panel
                       v-for="(opp, i) in opportunities"
                       :key="i"
                       class="mb-2 rounded-lg border-thin"
                     >
                       <v-expansion-panel-title class="text-h6 font-weight-bold py-4">
                         {{ opp.title }}
                       </v-expansion-panel-title>
                       <v-expansion-panel-text>
                         <v-list density="compact">
                           <v-list-item v-for="(item, j) in opp.items" :key="j" prepend-icon="mdi-check-circle-outline">
                             {{ item }}
                           </v-list-item>
                         </v-list>
                       </v-expansion-panel-text>
                     </v-expansion-panel>
                   </v-expansion-panels>

                   <h2 class="text-h4 font-weight-bold mb-6 text-primary">Nabízíme</h2>
                   
                   <v-row class="mb-10">
                     <v-col cols="12" md="6" v-for="(offer, i) in offers" :key="i">
                       <v-card class="h-100 elevation-2 border-thin" color="grey-lighten-5">
                         <v-card-title class="text-primary font-weight-bold pt-4">{{ offer.title }}</v-card-title>
                         <v-card-text class="pt-2 text-body-1">
                           {{ offer.text }}
                         </v-card-text>
                       </v-card>
                     </v-col>
                   </v-row>

                   <div class="mb-10">
                     <h2 class="text-h4 font-weight-bold mb-4">Jaké to u nás je?</h2>
                     <p class="text-body-1 mb-4 text-grey-darken-2">
                       Nelišíme se od ostatních firem i my chodíme do práce pro peníze.
                       Je pro nás důležité dosahovat výsledky kvalitní prací, máme spokojené zákazníky, kteří se k nám vrací.
                     </p>
                     <p class="text-body-1 mb-4 text-grey-darken-2">
                       I když už nejsme malá rodinná firma, nevytratil duch spolupráce, pomoci a podpory s individuálním přístupem.
                       Uvědomujeme si, že naše výborné firemní výsledky, by nebyly bez atmosféry týmovosti a spolupráce uvnitř firmy.
                     </p>
                     <p class="text-body-1 mb-4 text-grey-darken-2">
                       Máme funkční organizaci práce a vzdělávání s cílem být na špici v oboru, ale i vychovávat mladou generaci vlastních odborníků.
                     </p>
                   </div>

                   <div class="mb-10">
                     <h2 class="text-h4 font-weight-bold mb-4">Co si cení naši zaměstnanci nejvíc?</h2>
                     <p class="text-body-1 mb-4 text-grey-darken-2">
                       U každého je to asi trochu něco jiného  
                       Někdo ocení stabilitu, přátelský kolektiv, vstřícnost, někdo možnost odborného růstu, někdo individuální přístup jiný možnost tvořivé seberealizace a rozmanitost.
                     </p>
                     <p class="text-body-1 mb-4 text-grey-darken-2">
                       Jisté ale je, že fluktuace v naší společnosti je dlouhodobě velmi nízká, což nám dává tušit, že zaměstnanci jsou u nás dlouhodobě spokojeni.
                     </p>
                   </div>
                </div>

            </v-col>

            <!-- Right Column: Form -->
            <v-col cols="12" md="5">
                <v-card class="position-sticky rounded-xl elevation-6 border-thin overflow-hidden" style="top: 100px;">
                    <div class="pa-8 bg-primary text-white">
                        <h3 class="text-h5 font-weight-bold mb-2">Mám zájem o spolupráci</h3>
                        <p class="text-body-2 opacity-90">Jste student nebo absolvent a chcete se k nám přidat? Napište nám!</p>
                    </div>
                    
                    <v-card-text class="pa-8 bg-grey-lighten-5">
                        <v-form ref="formRef" @submit.prevent="submitForm">
                            <v-text-field 
                                v-model="form.name" 
                                label="Jméno a příjmení" 
                                variant="outlined" 
                                bg-color="white"
                                density="comfortable" 
                                class="mb-3"
                                :rules="[v => !!v || 'Povinné']"
                            ></v-text-field>
                            
                            <v-text-field 
                                v-model="form.email" 
                                label="Email" 
                                variant="outlined" 
                                bg-color="white"
                                density="comfortable" 
                                type="email"
                                class="mb-3"
                                :rules="[v => !!v || 'Povinné', v => /.+@.+\..+/.test(v) || 'Neplatný email']"
                            ></v-text-field>

                            <v-text-field 
                                v-model="form.phone" 
                                label="Telefon" 
                                variant="outlined" 
                                bg-color="white"
                                density="comfortable" 
                                class="mb-3"
                            ></v-text-field>

                            <v-select
                                v-model="form.type"
                                label="O co máte zájem?"
                                :items="['Odborná praxe / Stáž', 'Brigáda', 'Vedení závěrečné práce', 'Práce na HPP (Absolvent)', 'Jiné']"
                                variant="outlined"
                                bg-color="white"
                                density="comfortable"
                                class="mb-3"
                                :rules="[v => !!v || 'Vyberte jednu z možností']"
                            ></v-select>

                             <v-textarea 
                                v-model="form.message" 
                                label="Zpráva / O co konkrétně máte zájem?" 
                                variant="outlined" 
                                bg-color="white"
                                density="comfortable" 
                                rows="3"
                                class="mb-4"
                            ></v-textarea>
                            
                            <!-- File input for CV -->
                             <v-file-input
                                v-model="form.cv"
                                label="Životopis (nepovinné)"
                                variant="outlined"
                                bg-color="white"
                                density="comfortable"
                                prepend-icon=""
                                prepend-inner-icon="mdi-paperclip"
                                class="mb-6"
                            ></v-file-input>

                            <v-btn block color="primary" size="large" type="submit" :loading="loading" class="rounded-pill font-weight-bold elevation-4">
                                Odeslat nezávazně
                            </v-btn>

                            <div class="mt-4 text-caption text-center text-medium-emphasis">
                                Odesláním formuláře souhlasíte se zpracováním osobních údajů.
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
                
                <!-- Direct Contact Info -->
                 <v-card class="mt-6 rounded-xl elevation-2 pa-6 border-thin text-center" color="#f8faff">
                    <p class="text-caption text-uppercase text-medium-emphasis mb-2 font-weight-bold">Personální oddělení</p>
                    <h4 class="text-h6 font-weight-bold text-primary mb-1">PhDr. Dagmar Bendová</h4>
                    <div class="d-flex justify-center align-center gap-3 mt-3">
                         <v-btn icon="mdi-email" variant="text" color="primary" href="mailto:dagmar.bendova@uchytil.eu"></v-btn>
                         <v-btn icon="mdi-phone" variant="text" color="primary" href="tel:+420603145928"></v-btn>
                    </div>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
    
    <!-- Success Snackbar -->
    <v-snackbar v-model="snackbar" color="success" location="top">
      Zpráva byla úspěšně odeslána. Brzy se vám ozveme!
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false">Zavřít</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref(null)
const loading = ref(false)
const snackbar = ref(false)

const form = ref({
    name: '',
    email: '',
    phone: '',
    type: null,
    message: '',
    cv: null
})

const opportunities = [
  {
    title: 'Odbornou praxi',
    items: [
      'Reálná praxe na projektech',
      'Chuť naučit se novým věcem',
      'Vyzkoušet si učivo v praxi',
      'Práci pod odborným vedením',
      'Získat zkušenost do CV'
    ]
  },
  {
    title: 'Odborné vedení závěrečných a diplomových prací',
    items: [
      'Reálné téma z praxe',
      'Odborné konzultace',
      'Praktické využití práce'
    ]
  },
  {
    title: 'Stáž',
    items: [
      'V praxi na reálných projektech',
      'Získání zkušeností',
      'Vyzkoušení jak to chodí v praxi',
      'Odborné vedení'
    ]
  },
  {
    title: 'Brigáda',
    items: [
      'Časovou flexibilitu',
      'Vydělat si peníze',
      'Načerpání zkušeností',
      'Získání nových dovedností',
      'Lepší přehled o oboru na reálných projektech'
    ]
  },
  {
    title: 'Zaměstnání',
    items: [
      'Peníze, benefity',
      'Zajímavé projekty',
      'Podpora týmu',
      'Odborný růst',
      'Stabilní start kariéry'
    ]
  }
]

const offers = [
  {
    title: 'ČAS',
    text: 'Protože ze 30 - leté historie víme, jak důležité je zaučení, předávání zkušeností; Tvůj budoucí kolega se postará o to, aby se tvé teoretické studijní znalosti přeměnily v praktické dovednosti.'
  },
  {
    title: 'FINANČNÍ PROSTŘEDKY',
    text: 'Postaráme se o to, že ti pravidelně cinkne na bankovním účtu v čase rostoucí ohodnocení, navíc máme systém nastavený tak, že budeš mít možnost přímo ovlivnit výši svého výdělku.'
  },
  {
    title: 'BENEFITY',
    text: 'K pozici zaměstnance patří i zajímavé benefity - firemní vozidlo, 5 týdnů dovolené, příspěvky na penzijní nebo životní pojištění, úrazové pojištění stravné, AJ, fond FKSP a další.'
  },
  {
    title: 'OSOBNÍ PŘÍSTUP',
    text: 'Budeme ti pomáhat překonávat těžkosti, které tě v praxi bezpochyby potkají. Pokud budeš mít zájem, můžeš si vyzkoušet různé obory, kterým se firma věnuje, a pak si vybrat, co ti sedne nejvíc. Jistě i oceníš individuální řešení Tvých potřeb.'
  }
]

const submitForm = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    loading.value = true
    
    // Simulate API call
    setTimeout(() => {
        console.log('Form submitted:', form.value)
        loading.value = false
        snackbar.value = true
        formRef.value.reset()
    }, 1500)
}
</script>

<style scoped>
.text-blue-dark {
    color: #0c2b68;
}
.border-thin {
    border: 1px solid rgba(0,0,0,0.08);
}
</style>