import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { createRouter, createWebHistory } from 'vue-router'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import HomeView from './views/HomeView.vue'
import { useLazyLoad } from './composables/useLazyLoad'

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { title: 'UCHYTIL s.r.o. - Stavby, energetika, TZB | Brno', description: 'Společnost UCHYTIL s.r.o. poskytuje stavební služby, energetické řešení a technické zařízení budov. 32 let zkušeností v Brně a okolí.' } },
  { path: '/aboutus', name: 'AboutUs', component: () => import('./views/AboutUsVuetify.vue') },
  { path: '/certificates', name: 'Certificates', component: () => import('./views/CertificatesView.vue') },
  { path: '/eticky-kodex', name: 'Ethics', component: () => import('./views/EthicsView.vue') },
  { path: '/politika-spolecnosti', name: 'Policy', component: () => import('./views/PolicyView.vue') },
  { path: '/references', name: 'References', component: () => import('./views/ReferencesPage.vue') },
  { path: '/career', name: 'Career', component: () => import('./views/CareerPage.vue') },
  { path: '/career/students', name: 'StudentOpportunities', component: () => import('./views/StudentOpportunities.vue') },
  { path: '/career/:id', name: 'JobDetail', component: () => import('./views/JobDetail.vue'), props: true },
  { path: '/contact-us', name: 'ContactUs', component: () => import('./views/ContactUs.vue') },
  { path: '/division/:division', name: 'Division', component: () => import('./views/DivisionView.vue'), props: true },
  { path: '/prodejna', name: 'Prodejna', component: () => import('./views/ProdejnaView.vue') },
  { path: '/reference/:id', name: 'ReferenceDetail', component: () => import('./views/ReferenceDetail.vue'), props: true },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Always scroll to top when navigating to a new route to ensure users land at the page start
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// Navigation guard for setting page title and meta
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.description) {
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', to.meta.description)
    } else {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      metaDesc.content = to.meta.description
      document.head.appendChild(metaDesc)
    }
  }
  next()
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#031f68',
          secondary: '#047857',
          accent: '#00c6fb',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    }
  }
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')

// Initialize lazy loading after app is mounted
const { initLazyLoading } = useLazyLoad()
initLazyLoading()