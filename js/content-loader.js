// Content loader and renderer
class ContentRenderer {
    constructor() {
        this.content = null;
    }

    async loadContent() {
        try {
            const response = await fetch('../data/content.json');
            this.content = await response.json();
            this.renderContent();
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    renderContent() {
        if (!this.content) return;

        this.renderMeta();
        this.renderNavigation();
        this.renderHero();
        this.renderAboutUs();
        this.renderEshop();
        this.renderShop();
        this.renderJobs();
        this.renderReferences();
        this.renderContact();
        this.renderFooter();
        
        // Initialize interactive features after content is loaded
        setTimeout(() => {
            this.initializeJobTabs();
            // Re-initialize main.js slideshow after content is loaded
            this.reinitializeMainSlideshow();
        }, 800); // Even longer delay to ensure main.js doesn't interfere
    }

    renderMeta() {
        document.title = this.content.meta.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', this.content.meta.description);
        }
    }

    renderNavigation() {
        const nav = this.content.navigation;
        
        // Logo
        const logos = document.querySelectorAll('.logo img');
        logos.forEach(logo => {
            logo.src = nav.logo;
            logo.alt = nav.logoAlt;
        });

        // Menu items
        const navbarList = document.querySelector('.navbar-list');
        if (navbarList) {
            navbarList.innerHTML = nav.menuItems.map(item => 
                `<li><a href="${item.href}" class="navbar-link" data-nav-link>${item.text}</a></li>`
            ).join('');
        }

        // When rendering navigation, if menuItems[].type === "select", render a <select> with options from menuItems[].select
        // Do NOT render a <li> with links for "Naše služby" as a dropdown, only as a select
        const servicesMenuItem = nav.menuItems.find(item => item.text === 'Naše služby');
        if (servicesMenuItem && servicesMenuItem.type === 'select') {
            const selectElement = document.createElement('select');
            selectElement.className = 'services-select';

            // Options
            servicesMenuItem.select.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                selectElement.appendChild(optionElement);
            });

            // Replace the "Naše služby" <li> with the <select>
            const servicesListItem = Array.from(navbarList.children).find(li => li.textContent.includes('Naše služby'));
            if (servicesListItem) {
                servicesListItem.replaceWith(selectElement);
            }
        }
    }

    renderHero() {
        const hero = this.content.hero;
        const slideshow = document.querySelector('.slideshow');
        if (!slideshow) return;

        // Slides
        const slides = hero.slides.map((slide, index) => `
            <div class="slide">
                <div class="slide__img" style="background-image: url(${slide.image})"></div>
                <div class="slide__text">
                    <span class="slide__text-line">${slide.text}</span>
                </div>
            </div>
        `).join('');

        // Thumbnails
        const thumbnails = hero.slides.map((slide, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="thumbnail-img" style="background-image:url(${slide.thumbnail})"></div>
            </div>
        `).join('');

        slideshow.innerHTML = `
            ${slides}
            <div class="thumbnails">
                ${thumbnails}
            </div>
            <div class="slide-counter">
                <div class="counter-container">
                    <div class="counter-strip">
                        <div class="counter-number">01</div>
                    </div>
                </div>
                <div class="counter-separator"></div>
                <div class="counter-total">0${hero.slides.length}</div>
            </div>
        `;
    }

    renderAboutUs() {
        const aboutUs = this.content.aboutUs;
        
        // Title
        const aboutUsText = document.querySelector('.AboutUs-text');
        if (aboutUsText) aboutUsText.textContent = aboutUs.title;

        // Company info
        const factNumber = document.querySelector('.fact.number');
        if (factNumber) factNumber.textContent = aboutUs.subtitle;

        const factDescription = document.querySelector('.fact.description');
        if (factDescription) factDescription.textContent = aboutUs.description;

        // Divisions
        const heading = document.querySelector('.heading');
        if (heading) heading.textContent = aboutUs.divisionsTitle;

        const thumbnails = document.querySelector('.AboutUs-thumbnails');
        if (thumbnails) {
            thumbnails.innerHTML = aboutUs.divisions.map(division => `
                <button class="thumbnail AboutUs-thumb" onclick="window.location.href='../html/division-template.html?division=${division.name.toLowerCase()}'">
                    <div class="thumbnail-img" style="background-image:url(${division.image})"></div>
                    <span class="thumb-label">${division.name}</span>
                </button>
            `).join('');
        }
    }

    renderEshop() {
        const eshop = this.content.eshop;
        
        const eshopTitle = document.querySelector('.eshop-title');
        if (eshopTitle) eshopTitle.textContent = eshop.title;

        const eshopDescription = document.querySelector('.eshop-description');
        if (eshopDescription) eshopDescription.textContent = eshop.description;

        const eshopBtn = document.querySelector('.eshop-cta-btn');
        if (eshopBtn) {
            eshopBtn.textContent = eshop.buttonText;
            eshopBtn.href = eshop.buttonLink;
        }
    }

    renderShop() {
        const shop = this.content.shop;
        
        // Header - Add title rendering (preserve ion-icon and add span for text)
        const shopTitleElement = document.querySelector('#shop-title');
        if (shopTitleElement) {
          const iconName = shop.icon || 'storefront-outline';
          shopTitleElement.innerHTML = `
            <ion-icon name="${iconName}"></ion-icon>
            <span class="shop-title-text">${shop.title}</span>
          `;
        }

        const shopSubtitleElement = document.querySelector('#shop-subtitle');
        if (shopSubtitleElement) shopSubtitleElement.textContent = shop.subtitle;

        // Image
        const shopImage = document.querySelector('.shop-image');
        if (shopImage) {
            shopImage.src = shop.image;
            shopImage.alt = shop.imageAlt;
        }

        // Advice card
        const cardIcon = document.querySelector('.card-icon ion-icon');
        if (cardIcon) cardIcon.setAttribute('name', shop.advice.icon);

        const cardTitle = document.querySelector('.card-title');
        if (cardTitle) cardTitle.textContent = shop.advice.title;

        const cardDescription = document.querySelector('.card-description');
        if (cardDescription) cardDescription.textContent = shop.advice.description;

        // Contact cards
        const contactCards = document.querySelector('.contact-cards');
        if (contactCards) {
            contactCards.innerHTML = shop.contactCards.map(card => `
                <div class="contact-card">
                    <div class="contact-icon">
                        <ion-icon name="${card.icon}"></ion-icon>
                    </div>
                    <div class="contact-info">
                        <h4>${card.title}</h4>
                        <p>${card.content}</p>
                        ${card.badge ? `<span class="status-badge">${card.badge}</span>` : ''}
                    </div>
                </div>
            `).join('');
        }

        // Actions
        const shopActions = document.querySelector('.shop-actions');
        if (shopActions) {
            shopActions.innerHTML = shop.actions.map(action => `
                <a href="${action.href}" class="shop-cta-btn ${action.type}">${action.text}</a>
            `).join('');
        }
    }

    renderJobs() {
        const jobs = this.content.jobs;
        
        // Title
        const jobsTitle = document.querySelector('#jobs .section-title');
        if (jobsTitle) jobsTitle.textContent = jobs.title;

        // Tabs navigation
        const jobsTabs = document.querySelector('#jobsTabs');
        if (jobsTabs) {
            jobsTabs.innerHTML = jobs.tabs.map((tab, index) => `
                <div class="job-tab ${index === 0 ? 'active' : ''}" data-tab="${tab.id}">${tab.name}</div>
            `).join('');
        }

        // Tab content
        const sectionContent = document.querySelector('#jobs .section-content');
        if (sectionContent) {
            sectionContent.innerHTML = jobs.tabs.map((tab, index) => `
                <div class="jobs-tab-content ${index === 0 ? 'active' : ''}" id="${tab.id}">
                    ${tab.jobs.map(job => `
                        <div class="job-item">
                            <h3 class="job-title">${job.title}</h3>
                            <p class="job-location">${job.location}</p>
                            <p class="job-description">${job.description}</p>
                            <button class="job-apply-btn">Přihlásit se</button>
                        </div>
                    `).join('')}
                </div>
            `).join('');
        }
    }

    renderReferences() {
        const references = this.content.references;
        
        // Header
        const sectionSubtitle = document.querySelector('#references .section-subtitle');
        if (sectionSubtitle) sectionSubtitle.textContent = references.subtitle;

        const sectionTitle = document.querySelector('#references .section-title');
        if (sectionTitle) sectionTitle.textContent = references.title;

        const sectionText = document.querySelector('#references .section-text');
        if (sectionText) sectionText.textContent = references.description;

        // Projects grid
        const referencesGrid = document.querySelector('.references-grid');
        if (referencesGrid) {
            referencesGrid.innerHTML = references.projects.map(project => `
                <div class="reference-card">
                    <img src="${project.image}" alt="${project.imageAlt}" class="reference-image">
                    <div class="reference-content">
                        <h3 class="reference-title">${project.title}</h3>
                        <span class="reference-category">${project.category}</span>
                        <p class="reference-description">${project.description}</p>
                        <div class="reference-details">
                            <span class="reference-location">${project.location}</span>
                            <span class="reference-year">${project.year}</span>
                        </div>
                        <a href="#" class="reference-btn">Více informací</a>
                    </div>
                </div>
            `).join('');
        }

        // CTA button
        const referencesBtn = document.querySelector('.references-btn');
        if (referencesBtn) {
            referencesBtn.textContent = references.ctaText;
            referencesBtn.href = references.ctaLink;
        }
    }

    renderContact() {
        const contact = this.content.contact;
        const ctaSubtitle = document.querySelector('.cta .section-subtitle');
        if (ctaSubtitle) ctaSubtitle.textContent = contact.subtitle;

        const ctaTitle = document.querySelector('.cta .section-title');
        if (ctaTitle) ctaTitle.textContent = contact.title;

        const ctaText = document.querySelector('.cta .section-text');
        if (ctaText) ctaText.textContent = contact.description;

        const ctaBtn = document.querySelector('.cta .btn');
        if (ctaBtn) {
            ctaBtn.textContent = contact.buttonText;
            ctaBtn.setAttribute('href', '../html/contact-us.html');
            ctaBtn.classList.add('cta-link-btn');
            // If it's a <button>, convert to <a>
            if (ctaBtn.tagName.toLowerCase() === 'button') {
                const a = document.createElement('a');
                a.className = ctaBtn.className;
                a.textContent = ctaBtn.textContent;
                a.setAttribute('href', '../html/contact-us.html');
                a.classList.add('cta-link-btn');
                ctaBtn.parentNode.replaceChild(a, ctaBtn);
            }
        }

        // Inject gradient text color and transparent containers for contact-us tabs if on that page
        if (window.location.pathname.endsWith('contact-us.html')) {
            // Gradient text for active tab and transparent containers
            const styleId = 'contact-us-gradient-style';
            if (!document.getElementById(styleId)) {
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                    .contact-tabs, .contact-tabs-container {
                        background: transparent !important;
                        box-shadow: none !important;
                    }
                    .contact-tab.active {
                        background: transparent !important;
                        font-weight: bold;
                        color: transparent !important;
                        box-shadow: none !important;
                        border: none !important;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    renderFooter() {
        const footer = this.content.footer;
        
        // Logo
        const footerLogo = document.getElementById('footer-logo');
        if (footerLogo && footer.logo) {
            footerLogo.src = footer.logo;
        }

        // Text
        const footerText = document.getElementById('footer-text');
        if (footerText && footer.text) {
            footerText.textContent = footer.text;
        }

        // Contact title
        const contactTitle = document.getElementById('footer-contact-title');
        if (contactTitle && footer.contact.title) {
            contactTitle.textContent = footer.contact.title;
        }

        // Contact list
        const contactList = document.getElementById('footer-contact-list');
        if (contactList && footer.contact) {
            const contactItems = [];
            
            if (footer.contact.phone) {
              contactItems.push(`
                <li>
                  <ion-icon name="call-outline"></ion-icon>
                  <a href="tel:${footer.contact.phone}">${footer.contact.phone}</a>
                </li>
              `);
            }
            
            if (footer.contact.email) {
              contactItems.push(`
                <li>
                  <ion-icon name="mail-outline"></ion-icon>
                  <a href="mailto:${footer.contact.email}">${footer.contact.email}</a>
                </li>
              `);
            }
            
            if (footer.contact.ico) {
              contactItems.push(`
                <li class="footer-ico">
                  ${footer.contact.ico}
                </li>
              `);
            }
            
            contactList.innerHTML = contactItems.join('');
        }

        // Social links
        if (footer.social) {
            const footerContact = document.querySelector('.footer-contact');
            if (footerContact) {
                const socialDiv = document.createElement('div');
                socialDiv.className = 'footer-social';
                
                if (footer.social.facebook) {
                  socialDiv.innerHTML += `
                    <a href="${footer.social.facebook}" target="_blank" rel="noopener">
                      <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                  `;
                }
                
                if (footer.social.linkedin) {
                  socialDiv.innerHTML += `
                    <a href="${footer.social.linkedin}" target="_blank" rel="noopener">
                      <ion-icon name="logo-linkedin"></ion-icon>
                    </a>
                  `;
                }
                
                footerContact.appendChild(socialDiv);
            }
        }

        // Copyright
        const footerCopyright = document.getElementById('footer-copyright');
        if (footerCopyright && footer.copyright) {
            footerCopyright.textContent = footer.copyright;
        }
    }

    initializeSlideshow() {
        // Check if slideshow already initialized by main.js
        if (window.slideshowInitialized) return;
        
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const counterNumber = document.querySelector('.counter-number');

        if (slides.length === 0) return;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.style.display = 'block';
                    slide.classList.add('active');
                } else {
                    slide.style.display = 'none';
                    slide.classList.remove('active');
                }
            });
            
            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });

            if (counterNumber) {
                counterNumber.textContent = (index + 1).toString().padStart(2, '0');
            }
        }

        // Initialize first slide
        showSlide(0);

        // Add thumbnail click handlers
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-advance slideshow
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);

        // Mark as initialized
        window.slideshowInitialized = true;
    }
    

    initializeJobTabs() {
        // Make sure we wait for any potential main.js interference to finish
        setTimeout(() => {
            const jobTabs = document.querySelectorAll('.job-tab');
            const jobContents = document.querySelectorAll('.jobs-tab-content');
            const tabsContainer = document.getElementById('jobsTabs');
            const tabPrev = document.getElementById('tabPrev');
            const tabNext = document.getElementById('tabNext');

            if (jobTabs.length === 0) return;

            let currentTabIndex = 0;

            // Make arrows visible if there are multiple tabs
            if (jobTabs.length > 1) {
                if (tabPrev) tabPrev.classList.add('active');
                if (tabNext) tabNext.classList.add('active');
            }

            function showTab(index) {
                jobTabs.forEach((tab, i) => {
                    tab.classList.toggle('active', i === index);
                });
                
                jobContents.forEach((content, i) => {
                    content.classList.toggle('active', i === index);
                });
            }

            // Add click handlers to tabs
            jobTabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    currentTabIndex = index;
                    showTab(currentTabIndex);
                });
            });

            // Add arrow navigation with force re-attachment
            if (tabPrev) {
                // Remove any existing event listeners
                const newTabPrev = tabPrev.cloneNode(true);
                tabPrev.parentNode.replaceChild(newTabPrev, tabPrev);
                
                newTabPrev.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    currentTabIndex = currentTabIndex > 0 ? currentTabIndex - 1 : jobTabs.length - 1;
                    showTab(currentTabIndex);
                    
                    // Scroll tabs within container only, not the whole page
                    if (tabsContainer) {
                        const activeTab = jobTabs[currentTabIndex];
                        activeTab.scrollIntoView({ 
                            behavior: 'smooth', 
                            inline: 'center',
                            block: 'nearest' // Prevent vertical scrolling
                        });
                    }
                    
                    return false;
                });
            }

            if (tabNext) {
                // Remove any existing event listeners
                const newTabNext = tabNext.cloneNode(true);
                tabNext.parentNode.replaceChild(newTabNext, tabNext);
                
                newTabNext.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    currentTabIndex = currentTabIndex < jobTabs.length - 1 ? currentTabIndex + 1 : 0;
                    showTab(currentTabIndex);
                    
                    // Scroll tabs within container only, not the whole page
                    if (tabsContainer) {
                        const activeTab = jobTabs[currentTabIndex];
                        activeTab.scrollIntoView({ 
                            behavior: 'smooth', 
                            inline: 'center',
                            block: 'nearest' // Prevent vertical scrolling
                        });
                    }
                    
                    return false;
                });
            }

            // Initialize first tab
            showTab(0);
        }, 100);
    }

    reinitializeMainSlideshow() {
        // Wait a bit more for main.js to be loaded
        setTimeout(() => {
            // Force re-run the main.js slideshow initialization
            const slideshowScript = document.createElement('script');
            slideshowScript.textContent = `
                // Re-initialize slideshow after content is loaded
                if (window.gsap && document.querySelector('.slideshow')) {
                    const slideshow = document.querySelector('.slideshow');
                    const slides = slideshow.querySelectorAll('.slide');
                    const thumbnails = slideshow.querySelectorAll('.thumbnail');
                    
                    if (slides.length > 0) {
                        // Clear any existing classes
                        slides.forEach(slide => slide.classList.remove('active'));
                        thumbnails.forEach(thumb => thumb.classList.remove('active'));
                        
                        // Set first slide as active
                        slides[0].classList.add('active');
                        slides[0].style.visibility = 'visible';
                        if (thumbnails.length > 0) {
                            thumbnails[0].classList.add('active');
                        }
                        
                        // Initialize GSAP animations for text
                        slides.forEach((slide, idx) => {
                            const textLines = slide.querySelectorAll('.slide__text-line');
                            if (textLines.length > 0) {
                                gsap.set(textLines, { y: 100, opacity: 0 });
                                if (idx === 0) {
                                    gsap.to(textLines, {
                                        y: 0,
                                        opacity: 1,
                                        duration: 1.2,
                                        stagger: 0.1,
                                        delay: 0.5,
                                        ease: 'power2.out'
                                    });
                                }
                            }
                        });
                        
                        // Add thumbnail click handlers
                        thumbnails.forEach((thumbnail, index) => {
                            thumbnail.addEventListener('click', () => {
                                if (index !== getCurrentSlideIndex()) {
                                    showSlide(index);
                                }
                            });
                        });
                        
                        function getCurrentSlideIndex() {
                            return Array.from(slides).findIndex(slide => slide.classList.contains('active'));
                        }
                        
                        function showSlide(targetIndex) {
                            const currentIndex = getCurrentSlideIndex();
                            if (currentIndex === targetIndex) return;
                            
                            const currentSlide = slides[currentIndex];
                            const targetSlide = slides[targetIndex];
                            const currentTextLines = currentSlide.querySelectorAll('.slide__text-line');
                            const targetTextLines = targetSlide.querySelectorAll('.slide__text-line');
                            

                            // Hide current
                            gsap.to(currentTextLines, {
                                y: -100,
                                opacity: 0,
                                duration: 0.6,
                                ease: 'power2.inOut'
                            });
                            
                            setTimeout(() => {
                                currentSlide.classList.remove('active');
                                targetSlide.classList.add('active');
                                
                                // Update thumbnails
                                thumbnails.forEach((thumb, i) => {
                                    thumb.classList.toggle('active', i === targetIndex);
                                });
                                
                                // Show new text
                                gsap.set(targetTextLines, { y: 100, opacity: 0 });
                                gsap.to(targetTextLines, {
                                    y: 0,
                                    opacity: 1,
                                    duration: 0.8,
                                    stagger: 0.1,
                                    delay: 0.2,
                                    ease: 'power2.out'
                                });
                                
                                // Update counter
                                const counterNumber = document.querySelector('.counter-number');
                                if (counterNumber) {
                                    counterNumber.textContent = (targetIndex + 1).toString().padStart(2, '0');
                                }
                            }, 300);
                        }
                        
                        // Auto-advance slideshow
                        setInterval(() => {
                            const currentIndex = getCurrentSlideIndex();
                            const nextIndex = (currentIndex + 1) % slides.length;
                            showSlide(nextIndex);
                        }, 5000);
                    }
                }
            `;
            document.head.appendChild(slideshowScript);
        }, 500);
    }
}

// Initialize content renderer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const renderer = new ContentRenderer();
    renderer.loadContent();
});

// References: delegate clicks to open detail page using the same loader flow as divisions
(function(){
  const GRID_SELECTOR = '#references .references-grid';
  function slugify(str){
    return (str||'').toString().toLowerCase()
      .normalize('NFD').replace(/\p{Diacritic}/gu,'')
      .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  }
  function findCard(target){
    const grid = document.querySelector(GRID_SELECTOR);
    if (!grid) return null;
    let node = target;
    while (node && node !== grid && !node.classList?.contains('reference-card')) node = node.parentElement;
    return (node && node !== grid) ? node : null;
  }
  document.addEventListener('click', function(e){
    const card = findCard(e.target);
    if (!card) return;
    e.preventDefault();
    const title = (card.querySelector('.reference-title')?.textContent || 'Reference').trim();
    const imgEl = card.querySelector('img, .reference-image');
    let img = '';
    if (imgEl) {
      if (imgEl.tagName === 'IMG') img = imgEl.getAttribute('src') || '';
      else {
        const bg = getComputedStyle(imgEl).backgroundImage;
        const m = bg && bg !== 'none' ? bg.match(/url\(["']?(.*?)["']?\)/) : null;
        img = m && m[1] ? m[1] : '';
      }
    }
    const desc = (card.querySelector('.reference-description')?.textContent || '').trim();
    const category = (card.querySelector('.reference-category')?.textContent || '').trim();
    const location = (card.querySelector('.reference-location')?.textContent || '').trim();
    const year = (card.querySelector('.reference-year')?.textContent || '').trim();

    const payload = { title, img, desc, category, location, year, slug: slugify(title) };
    try { sessionStorage.setItem('selectedReference', JSON.stringify(payload)); } catch {}

    const url = `reference-template.html?ref=${encodeURIComponent(payload.slug)}`;
    window.location.href = url;
  }, false);
})();

// Reference detail rendering (on reference-template.html)
(function(){
  if (!/reference-template\.html$/i.test(location.pathname)) return;
  function el(id){ return document.getElementById(id); }
  let data = null;
  try {
    const raw = sessionStorage.getItem('selectedReference');
    if (raw) data = JSON.parse(raw);
  } catch {}
  data = Object.assign({ title: 'Reference', img: '', desc: '', category: '', location: '', year: '' }, data || {});

  // Set page title
  document.title = (data.title ? data.title + ' – Reference' : 'Reference detail');

  const titleEl = el('ref-title');
  const imgEl = el('ref-image');
  const descEl = el('ref-description');
  const catEl = el('ref-category');
  const locEl = el('ref-location');
  const yearEl = el('ref-year');

  // New: breadcrumb title
  const crumbEl = el('ref-title-crumb');
  if (crumbEl) crumbEl.textContent = data.title;

  // New: hero background
  const heroBg = el('ref-hero-bg');
  if (heroBg) {
    if (data.img) {
      heroBg.style.backgroundImage = `url('${data.img}')`;
      heroBg.style.display = '';
    } else {
      heroBg.style.backgroundImage = '';
      heroBg.style.display = 'none';
    }
  }

  if (titleEl) titleEl.textContent = data.title;
  if (imgEl) {
    if (data.img) { imgEl.src = data.img; imgEl.style.display = ''; }
    else { imgEl.style.display = 'none'; }
  }
  if (descEl) descEl.textContent = data.desc;
  if (catEl) { catEl.textContent = data.category; catEl.style.display = data.category ? 'inline-flex' : 'none'; }
  if (locEl) { locEl.textContent = data.location; locEl.style.display = data.location ? '' : 'none'; }
  if (yearEl) { yearEl.textContent = data.year; yearEl.style.display = data.year ? '' : 'none'; }

  // New: sidebar specs
  const locSpec = el('ref-location-spec'); if (locSpec) locSpec.textContent = data.location || '';
  const yearSpec = el('ref-year-spec'); if (yearSpec) yearSpec.textContent = data.year || '';
  const catSpec = el('ref-category-spec'); if (catSpec) catSpec.textContent = data.category || '';
})();
