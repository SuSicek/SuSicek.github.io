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
import AboutUs from './views/AboutUsVuetify.vue'
import References from './views/ReferencesClean.vue'
import Career from './views/CareerClean.vue'
import ContactUs from './views/ContactUs.vue'
import DivisionView from './views/DivisionView.vue'
import ProdejnaView from './views/ProdejnaView.vue'
import ReferenceDetail from './views/ReferenceDetail.vue'
import JobDetail from './views/JobDetail.vue'
import StudentOpportunities from './views/StudentOpportunities.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/aboutus', name: 'AboutUs', component: AboutUs },
  { path: '/references', name: 'References', component: References },
  { path: '/career', name: 'Career', component: Career },
  { path: '/career/students', name: 'StudentOpportunities', component: StudentOpportunities },
  { path: '/career/:id', name: 'JobDetail', component: JobDetail, props: true },
  { path: '/contact-us', name: 'ContactUs', component: ContactUs },
  { path: '/division/:division', name: 'Division', component: DivisionView, props: true },
  { path: '/prodejna', name: 'Prodejna', component: ProdejnaView },
  { path: '/reference/:id', name: 'ReferenceDetail', component: ReferenceDetail, props: true },
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