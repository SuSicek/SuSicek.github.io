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
import EshopView from './views/EshopView.vue'
import ReferenceDetail from './views/ReferenceDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/aboutus', name: 'AboutUs', component: AboutUs },
  { path: '/references', name: 'References', component: References },
  { path: '/career', name: 'Career', component: Career },
  { path: '/contact-us', name: 'ContactUs', component: ContactUs },
  { path: '/division/:division', name: 'Division', component: DivisionView, props: true },
  { path: '/eshop', name: 'Eshop', component: EshopView },
  { path: '/reference/:id', name: 'ReferenceDetail', component: ReferenceDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#2256A1',
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