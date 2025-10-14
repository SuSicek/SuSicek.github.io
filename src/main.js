import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import AboutUs from './views/AboutUs.vue'
import ContactUs from './views/ContactUs.vue'
import Career from './views/Career.vue'
import Job from './views/Job.vue'
import References from './views/References.vue'
import ReferenceTemplate from './views/ReferenceTemplate.vue'
import DivisionTemplate from './views/DivisionTemplate.vue'
import Eshop from './views/Eshop.vue'

// Import global styles
import '../css/style.css'
import '../css/reststyle.css'
import '../css/aboutus.css'
import '../css/career.css'
import '../css/con-style.css'
import '../css/division.css'
import '../css/eshop-style.css'
import '../css/job.css'
import '../css/reference.css'
import '../css/references.css'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/aboutus', name: 'AboutUs', component: AboutUs },
  { path: '/contact-us', name: 'ContactUs', component: ContactUs },
  { path: '/career', name: 'Career', component: Career },
  { path: '/job', name: 'Job', component: Job },
  { path: '/references', name: 'References', component: References },
  { path: '/reference/:id', name: 'ReferenceTemplate', component: ReferenceTemplate, props: true },
  { path: '/division/:division', name: 'DivisionTemplate', component: DivisionTemplate, props: true },
  { path: '/eshop', name: 'Eshop', component: Eshop }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')