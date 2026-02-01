<template>
  <div class="job-detail-page bg-white fill-height">
    <!-- Hero Header -->
    <div class="job-header py-16 position-relative overflow-hidden" style="min-height: 480px; display: flex; align-items: flex-end;">
        <!-- Background Image & Overlay -->
        <div class="job-header-bg position-absolute w-100 h-100" style="top:0; left:0; z-index:0; background-image: url('/fotky/stavba3.png'); background-size: cover; background-position: center;"></div>
        <div class="job-header-overlay position-absolute w-100 h-100 bg-black" style="top:0; left:0; z-index:1; opacity: 0.75;"></div>

        <v-container class="position-relative" style="z-index: 2;">
            <v-btn variant="text" color="white" class="mb-6 pl-0" :to="{ name: 'Career', hash: '#jobs' }">
                <v-icon start>mdi-arrow-left</v-icon> Zpět na kariéru
            </v-btn>
            
            <div v-if="job">
                <v-chip color="primary" size="large" variant="flat" class="mb-4 font-weight-bold elevation-4" label>{{ job.division }}</v-chip>
                <h1 class="text-h3 font-weight-black mb-4 text-white">{{ job.title }}</h1>
                <div class="d-flex align-center text-grey-lighten-2">
                    <v-icon start class="mr-2">mdi-map-marker</v-icon>
                    <span class="text-h6">{{ job.location }}</span>
                </div>
            </div>
            <div v-else class="text-center py-12">
                <v-progress-circular indeterminate color="white"></v-progress-circular>
            </div>
        </v-container>
    </div>

    <v-container v-if="job" class="job-content py-12" style="max-width: 1000px;">
        <v-row>
            <!-- Left Column: Details -->
            <v-col cols="12" md="7" class="pr-md-8">
                <section class="mb-10">
                    <h2 class="text-h5 font-weight-bold mb-6 d-flex align-center text-primary">
                        <v-icon start class="mr-3">mdi-wrench</v-icon> Náplň práce
                    </h2>
                    <v-list density="compact" class="bg-transparent">
                        <v-list-item v-for="(item, i) in job.duties" :key="i" class="px-0">
                            <template v-slot:prepend>
                                <v-icon color="primary" size="small" class="mt-1">mdi-circle-medium</v-icon>
                            </template>
                            <v-list-item-title class="text-body-1 text-wrap" style="line-height: 1.6;">{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </section>

                <section class="mb-10">
                    <h2 class="text-h5 font-weight-bold mb-6 d-flex align-center text-primary">
                        <v-icon start class="mr-3">mdi-certificate</v-icon> Požadavky
                    </h2>
                    <v-list density="compact" class="bg-transparent">
                        <v-list-item v-for="(item, i) in job.requirements" :key="i" class="px-0">
                            <template v-slot:prepend>
                                <v-icon color="primary" size="small" class="mt-1">mdi-circle-medium</v-icon>
                            </template>
                            <v-list-item-title class="text-body-1 text-wrap" style="line-height: 1.6;">{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </section>

                <section class="mb-10">
                    <h2 class="text-h5 font-weight-bold mb-6 d-flex align-center text-primary">
                        <v-icon start class="mr-3">mdi-gift</v-icon> Nabízíme
                    </h2>
                    <v-list density="compact" class="bg-transparent">
                        <v-list-item v-for="(item, i) in job.offers" :key="i" class="px-0">
                            <template v-slot:prepend>
                                <v-icon color="success" size="small" class="mt-1">mdi-check</v-icon>
                            </template>
                            <v-list-item-title class="text-body-1 text-wrap" style="line-height: 1.6;">{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </section>
            </v-col>

            <!-- Right Column: Form & Contact -->
            <v-col cols="12" md="5">
                <v-card class="position-sticky rounded-xl elevation-4 border-thin" style="top: 100px;">
                    <div class="pa-6 bg-primary text-white">
                        <h3 class="text-h5 font-weight-bold">Mám zájem o pozici</h3>
                        <p class="text-caption opacity-80 mt-1">Zašlete nám své kontaktní údaje a my se vám ozveme.</p>
                    </div>
                    
                    <v-card-text class="pa-6">
                        <v-form ref="appFormRef" @submit.prevent="submitApplication">
                            <v-text-field 
                                v-model="appForm.name" 
                                label="Jméno a příjmení" 
                                variant="outlined" 
                                density="comfortable" 
                                class="mb-2"
                                :rules="[v => !!v || 'Povinné']"
                            ></v-text-field>
                            
                            <v-text-field 
                                v-model="appForm.email" 
                                label="Email" 
                                variant="outlined" 
                                density="comfortable" 
                                type="email"
                                class="mb-2"
                                :rules="[v => !!v || 'Povinné', v => /.+@.+\..+/.test(v) || 'Neplatný email']"
                            ></v-text-field>
                            
                            <v-text-field 
                                v-model="appForm.phone" 
                                label="Telefon" 
                                variant="outlined" 
                                density="comfortable" 
                                class="mb-2"
                                :rules="[v => !!v || 'Povinné']"
                            ></v-text-field>

                            <v-textarea 
                                v-model="appForm.message" 
                                label="Zpráva pro nás" 
                                variant="outlined" 
                                rows="3"
                                class="mb-2"
                            ></v-textarea>

                            <v-file-input 
                                v-model="appForm.cv" 
                                label="Nahrát životopis" 
                                variant="outlined" 
                                density="comfortable"
                                prepend-icon=""
                                append-inner-icon="mdi-paperclip"
                                show-size
                                accept=".pdf,.doc,.docx"
                                class="mb-4"
                            ></v-file-input>

                            <v-checkbox 
                                v-model="appForm.agree" 
                                label="Souhlasím se zpracováním os. údajů" 
                                color="primary"
                                density="compact"
                                :rules="[v => !!v || 'Nutný souhlas']"
                                class="mb-2"
                            ></v-checkbox>

                            <v-btn 
                                block 
                                color="primary" 
                                size="large" 
                                type="submit" 
                                :loading="submitting" 
                                :disabled="submitted"
                                class="font-weight-bold"
                            >
                                <span v-if="!submitted">Odeslat nezávazně</span>
                                <span v-else>Odesláno <v-icon end>mdi-check</v-icon></span>
                            </v-btn>

                            <v-alert v-if="submitted" type="success" variant="tonal" class="mt-4 text-caption border-0">
                                Děkujeme! Vaši zprávu jsme přijali a brzy se ozveme.
                            </v-alert>
                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <div class="pa-6 bg-grey-lighten-5">
                        <div class="text-subtitle-2 text-medium-emphasis mb-3 text-uppercase font-weight-bold">Kontaktní osoba</div>
                        <div class="d-flex align-center">
                             <v-avatar color="primary" size="40" class="mr-3 font-weight-bold text-white">DB</v-avatar>
                             <div>
                                <div class="font-weight-bold text-body-2">{{ job.contact.name }}</div>
                                <div class="text-caption text-medium-emphasis">{{ job.contact.email }}</div>
                             </div>
                        </div>
                    </div>

                    <v-divider></v-divider>

                    <div class="pa-6">
                        <v-btn 
                            block 
                            color="#031f68" 
                            size="large" 
                            variant="elevated"
                            class="font-weight-bold text-white"
                            prepend-icon="mdi-share-variant" 
                            @click="copyJobLink"
                        >
                            Sdílet pozici
                            <v-tooltip activator="parent" v-model="showShareTooltip" location="top" :open-on-hover="false">Odkaz zkopírován!</v-tooltip>
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <!-- Simple footer call to action -->
    <div class="bg-grey-lighten-4 py-12 text-center">
        <v-container>
            <h3 class="text-h5 font-weight-bold mb-4">Nevybrali jste si?</h3>
            <p class="text-body-1 text-medium-emphasis mb-6">Podívejte se na ostatní volné pozice.</p>
            <v-btn color="primary" variant="outlined" size="large" @click="router.push('/career')">Zobrazit všechny pozice</v-btn>
        </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { careerJobs } from '@/data/careerJobs.js'

const route = useRoute()
const router = useRouter()
const job = ref(null)

// Share logic
const showShareTooltip = ref(false)
const copyJobLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showShareTooltip.value = true
        setTimeout(() => showShareTooltip.value = false, 2000)
    })
}

// Form logic
const appFormRef = ref(null)
const submitting = ref(false)
const submitted = ref(false)
const appForm = ref({
  name: '',
  email: '',
  phone: '',
  cv: null,
  message: '',
  agree: false
})

onMounted(() => {
    // Scroll to top
    window.scrollTo(0, 0)
    
    // Find job
    const id = route.params.id
    if(id) {
        job.value = careerJobs.find(j => j.id == id)
        if(!job.value) {
            // Handle not found - redirect or show error
            router.replace('/career')
        }
    }
})

const submitApplication = async () => {
    if (!appFormRef.value) return
    const { valid } = await appFormRef.value.validate()
    if (!valid) return

    submitting.value = true
    
    // Simulate API call
    setTimeout(() => {
        submitting.value = false
        submitted.value = true
        
        // Construct mailto link as fallback
        const subject = `Žádost o pozici: ${job.value.title}`
        const body = `Dobrý den,\n\nmám zájem o pozici ${job.value.title}.\n\nJméno: ${appForm.value.name}\nEmail: ${appForm.value.email}\nTelefon: ${appForm.value.phone}\n\nZpráva:\n${appForm.value.message}`
        const mailto = `mailto:${job.value.contact?.email || 'info@uchytil.eu'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        
        // window.location.href = mailto
    }, 1500)
}
</script>

<style scoped>
.text-blue-dark { color: #031f68; }
.border-thin { border: 1px solid rgba(0,0,0,0.08); }
</style>