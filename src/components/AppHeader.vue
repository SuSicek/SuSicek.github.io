<template>
  <header class="header" data-header :class="{ 'sticky': isSticky }">
    <div class="overlay" data-overlay @click="closeNav"></div>
    <!-- Header top section (logo + socials) - hidden when sticky -->
    <div class="header-top" :class="{ 'hidden': isSticky }">
      <div class="container">
        <router-link to="/" class="logo">
          <img :src="logoSrc" :alt="logoAlt" loading="eager">
        </router-link>
        <div class="header-socials" aria-label="Sledujte nás">
          <ul class="social-list">
            <li>
              <a class="social-link" href="https://www.facebook.com/uchytilsro" target="_blank" rel="noopener" aria-label="Facebook">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a class="social-link" href="https://www.instagram.com/uchytil_tzb_stavba_energetika" target="_blank" rel="noopener" aria-label="Instagram">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a class="social-link" href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
        <div class="header-btn-group">
          <button class="nav-open-btn" aria-label="Open Menu" data-nav-open-btn @click="openNav">
            <ion-icon name="menu-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="container header-bottom-inner">
        <nav class="navbar" :class="{ 'active': navOpen }" data-navbar>
          <!-- Mobile navbar top - only visible in mobile menu -->
          <div class="navbar-top mobile-only">
            <router-link to="/" class="logo">
              <img src="/fotky/logo.png" alt="UCHYTIL s.r.o. Logo" loading="lazy">
            </router-link>
            <button class="nav-close-btn" aria-label="Close Menu" data-nav-close-btn @click="closeNav">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <!-- Wrapper for right-aligned navbar content -->
          <div class="navbar-content-wrapper">
            <div class="services-rolldown" :class="{ 'open': servicesOpen }" id="servicesRolldown">
            <button 
              class="services-trigger" 
              id="servicesTrigger"
              @click="toggleServices"
              :aria-expanded="servicesOpen"
              aria-controls="servicesPanel"
              aria-haspopup="true"
            >
              <span class="services-trigger-label">Naše služby</span>
              <ion-icon name="chevron-down-outline" class="chevron"></ion-icon>
            </button>
            <ul class="services-panel" :class="{ 'open': servicesOpen }" id="servicesPanel">
              <li><router-link to="/division/energetika">Energetika</router-link></li>
              <li><router-link to="/division/prumysl">TZB</router-link></li>
              <li><router-link to="/division/stavebnictvi">Stavebnictví</router-link></li>
              <li><router-link to="/eshop">E-shop</router-link></li>
            </ul>
          </div>
          <div class="nav-divider" style="width:3px;height:32px;background:linear-gradient(180deg,#66666696);margin:0 18px;align-self:center;border-radius:2px;"></div>
          <ul class="navbar-list">
            <li class="navbar-item" v-for="item in menuItems" :key="item.text" style="margin-right: 24px;">
              <router-link 
                :to="item.href" 
                class="navbar-link"
                :class="{ 'active': $route.path === item.href }"
              >
                {{ item.text }}
              </router-link>
            </li>
          </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import contentData from '../../data/content.json'

export default {
  name: 'AppHeader',
  setup() {
    const navOpen = ref(false)
    const servicesOpen = ref(false)
    const isSticky = ref(false)
    const logoSrc = ref('')
    const logoAlt = ref('')
    const menuItems = ref([])

    const openNav = () => {
      navOpen.value = true
    }

    const closeNav = () => {
      navOpen.value = false
      servicesOpen.value = false
    }

    const toggleServices = () => {
      servicesOpen.value = !servicesOpen.value
    }

    const initStickyHeader = () => {
      const header = document.querySelector("[data-header]")
      const scrollThreshold = 80 // Reduced threshold for quicker response

      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY
        
        if (scrollY >= scrollThreshold) {
          // Make header sticky - only show navigation bar
          isSticky.value = true
          // Clean reset - remove all classes first
          header.classList.remove("active", "header-active")
          header.classList.add("sticky")
          
          // Force navbar visibility and positioning
          const navbar = header.querySelector('.navbar')
          const headerBottom = header.querySelector('.header-bottom')
          if (navbar && headerBottom) {
            navbar.style.display = 'block'
            navbar.style.position = 'relative'
            navbar.style.zIndex = '10000'
            headerBottom.style.display = 'block'
            headerBottom.style.position = 'relative'
            headerBottom.style.zIndex = '10000'
          }
        } else {
          // Show full header with logo and socials
          isSticky.value = false
          // Remove all sticky-related classes
          header.classList.remove("active", "sticky", "header-active")
          
          // Reset inline styles
          const navbar = header.querySelector('.navbar')
          const headerBottom = header.querySelector('.header-bottom')
          if (navbar && headerBottom) {
            navbar.style.display = ''
            navbar.style.position = ''
            navbar.style.zIndex = ''
            headerBottom.style.display = ''
            headerBottom.style.position = ''
            headerBottom.style.zIndex = ''
          }
        }
      })
    }

    onMounted(() => {
      // Load navigation data from JSON
      logoSrc.value = contentData.navigation.logo
      logoAlt.value = contentData.navigation.logoAlt
      menuItems.value = contentData.navigation.menuItems.map(item => ({
        text: item.text,
        href: item.href === 'aboutus.html' ? '/aboutus' :
              item.href === 'references.html' ? '/references' :
              item.href === 'career.html' ? '/career' :
              item.href === 'contact-us.html' ? '/contact-us' :
              item.href === 'eshop.html' ? '/eshop' : item.href
      }))
      
      // Initialize sticky header
      setTimeout(() => {
        initStickyHeader()
      }, 100)
    })

    return {
      navOpen,
      servicesOpen,
      isSticky,
      logoSrc,
      logoAlt,
      menuItems,
      openNav,
      closeNav,
      toggleServices
    }
  }
}
</script>

<style scoped>
/* Header sticky transitions */
.header {
  transition: all 0.3s ease;
}

/* Header top section - full visibility when not sticky */
.header-top {
  transition: all 0.3s ease;
  transform: translateY(0);
  opacity: 1;
  background: transparent;
}

.header-top.hidden {
  transform: translateY(-100%);
  opacity: 0;
  height: 0;
  overflow: hidden;
  padding: 0;
  margin: 0;
  background: transparent;
}

/* Header bottom section - no background by default */
.header-bottom {
  background: transparent;
  transition: all 0.3s ease;
}

/* Services dropdown base styles */
.services-rolldown {
  position: relative;
  display: inline-block;
}

.services-trigger {
  background: none;
  border: none;
  color: var(--white);
  font-size: 17px;
  font-family: var(--ff-poppins);
  font-weight: var(--fw-500);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  transition: all 0.3s ease;
  text-transform: capitalize;
  letter-spacing: normal;
}

.services-trigger:hover {
  color: var(--orange-soda);
}

.services-trigger .chevron {
  font-size: 18px;
  color: inherit;
  transition: transform 0.3s ease;
}

.services-rolldown.open .services-trigger .chevron {
  transform: rotate(180deg);
}

.services-trigger:hover .chevron {
  color: var(--orange-soda);
}

.services-panel {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  border-radius: 8px;
  padding: 8px 0;
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
  list-style: none;
  margin: 0;
}

.services-panel.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.services-panel li {
  margin: 0;
  padding: 0;
}

.services-panel a {
  display: block;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 0;
}

.services-panel a:hover {
  background-color: #f5f5f5;
  color: #000;
}

/* Mobile navbar top - only show in mobile menu */
.navbar-top.mobile-only {
  display: none;
}

/* Header base styles - override any global sticky behavior */
.header {
  background: transparent !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  z-index: 1000 !important;
}

/* Remove any global active/sticky classes when not in our sticky mode */
.header:not(.sticky) {
  background: transparent !important;
  box-shadow: none !important;
}

/* When header is sticky, apply single clean background that covers all content */
.header.sticky {
  backdrop-filter: blur(10px) !important;
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
  min-height: 50px !important;
  padding: 0 !important;
}

.header.sticky .header-bottom {
  padding: 8px 0 !important;
  background: transparent !important;
  min-height: auto !important;
}

.header.sticky .navbar {
  padding: 0 !important;
  margin: 0 !important;
  position: relative !important;
  z-index: 10000 !important;
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  width: 100% !important;
}

/* Ensure proper navbar layout when sticky */
.header.sticky .navbar-list {
  margin: 0 !important;
  display: flex !important;
  align-items: center !important;
  height: 100% !important;
  position: relative !important;
  z-index: 10001 !important;
}

.header.sticky .header-bottom-inner {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  height: 100% !important;
  width: 100% !important;
  position: relative !important;
  z-index: 10000 !important;
}

/* Make sure container fills the full width */
.header.sticky .container {
  width: 100% !important;
  max-width: none !important;
  padding: 0 20px !important;
}

/* Hide header-top completely when sticky to prevent double headers */
.header.sticky .header-top {
  display: none !important;
  height: 0 !important;
  opacity: 0 !important;
  overflow: hidden !important;
}

/* Disable any global header active styles */
.header.active:not(.sticky) {
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

/* Clean backgrounds for non-sticky state */
.header:not(.sticky) .header-top,
.header:not(.sticky) .header-bottom {
  background: transparent !important;
}

/* Clean sticky header styles - no duplicate backgrounds */
.header.sticky .header-top {
  background: transparent !important;
}

.header.sticky .header-bottom {
  background: transparent !important;
}

/* Ensure navbar alignment and proper containment */
.header.sticky .navbar {
  display: flex !important;
  justify-content: flex-start !important;
  align-items: center !important;
  min-height: 50px !important;
  width: 100% !important;
}

/* Ensure all navbar elements are contained */
.header.sticky .services-rolldown,
.header.sticky .navbar-list,
.header.sticky .nav-divider {
  position: relative !important;
  z-index: 10002 !important;
}

/* Make navbar text black in sticky mode */
.header.sticky .navbar-link,
.header.sticky .services-trigger {
  color: #000000 !important;
  font-weight: 500 !important;
}

.header.sticky .navbar-link:hover,
.header.sticky .services-trigger:hover {
  color: #333333 !important;
}

.header.sticky .services-trigger .chevron {
  color: #000000 !important;
}

.header.sticky .services-rolldown {
  margin-right: 18px !important;
  z-index: 10003 !important;
}

/* Normal navbar wrapper - no special styling */
.navbar-content-wrapper {
  display: contents;
}

/* Force navbar content to align to the right using wrapper ONLY when sticky */
.header.sticky .navbar-content-wrapper {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  width: 100% !important;
  margin-left: auto !important;
}

.header.sticky .navbar-content-wrapper > * {
  display: flex !important;
  align-items: center !important;
}

/* Ensure services dropdown is contained within background */
.header.sticky .services-panel {
  top: 100% !important;
  margin-top: 0 !important;
  z-index: 10004 !important;
  position: absolute !important;
}

.header.sticky .services-panel a {
  color: #000000 !important;
}

.header.sticky .services-panel a:hover {
  color: #333333 !important;
}

/* Mobile responsive - show navbar-top only in mobile menu */
@media (max-width: 768px) {
  .navbar.active .navbar-top.mobile-only {
    display: flex;
  }
  
  .header.sticky {
    min-height: 45px !important;
  }
  
  .header.sticky .header-bottom {
    padding: 6px 0 !important;
  }
  
  .header.sticky .container {
    padding: 0 15px !important;
  }
}
</style>