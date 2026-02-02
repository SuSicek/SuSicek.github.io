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
                   <p class="text-h6 font-weight-regular mb-6" style="line-height: 1.8; color: #444;">
                       Spolupracujeme se středními i vysokými školami technického zaměření (VUT FAST, SPŠ Stavební a další). 
                       Věříme, že nejlepší způsob, jak se naučit řemeslo, je podívat se mu pod ruce přímo v terénu nebo v kanceláři.
                   </p>
                </div>

                <section class="mb-10">
                    <h2 class="text-h4 font-weight-bold mb-6 text-primary">Co nabízíme?</h2>
                    
                    <div class="mb-8">
                        <h3 class="text-h5 font-weight-bold mb-3 d-flex align-center text-blue-dark">
                            <v-icon start class="mr-3" color="primary">mdi-school-outline</v-icon> Odborné praxe a stáže
                        </h3>
                        <p class="text-body-1 text-grey-darken-2 pl-10">
                            Absolvujte u nás povinnou praxi nebo dlouhodobou stáž. Zapojíme vás do běžného chodu firmy, 
                            kde si vyzkoušíte práci na reálných zakázkách pod dohledem zkušených kolegů.
                        </p>
                    </div>

                    <div class="mb-8">
                        <h3 class="text-h5 font-weight-bold mb-3 d-flex align-center text-blue-dark">
                            <v-icon start class="mr-3" color="primary">mdi-briefcase-clock-outline</v-icon> Brigády v oboru
                        </h3>
                        <p class="text-body-1 text-grey-darken-2 pl-10">
                            Hledáte přivýdělek, který má smysl? Nabízíme brigády pro studenty SŠ a VŠ na stavbách, v projekci i administrativě.
                            Získejte náskok před spolužáky díky cenným zkušenostem.
                        </p>
                    </div>

                    <div class="mb-8">
                        <h3 class="text-h5 font-weight-bold mb-3 d-flex align-center text-blue-dark">
                            <v-icon start class="mr-3" color="primary">mdi-book-open-variant</v-icon> Vedení BP a DP
                        </h3>
                        <p class="text-body-1 text-grey-darken-2 pl-10">
                            Nabízíme konzultace a odborné vedení bakalářských a diplomových prací. 
                            Poskytneme vám podklady z našich realizovaných projektů a pomocnou ruku při řešení technických problémů.
                        </p>
                    </div>

                     <div class="mb-8">
                        <h3 class="text-h5 font-weight-bold mb-3 d-flex align-center text-blue-dark">
                            <v-icon start class="mr-3" color="primary">mdi-account-tie-hat</v-icon> Absolventský program
                        </h3>
                        <p class="text-body-1 text-grey-darken-2 pl-10">
                            Čerstvým absolventům nabízíme plynulý přechod do praxe. Čeká vás adaptační proces, 
                            kde se seznámíte s firemní kulturou a procesy, a postupně převezmete zodpovědnost za vlastní projekty.
                        </p>
                    </div>
                </section>
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