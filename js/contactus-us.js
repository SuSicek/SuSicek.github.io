document.addEventListener('DOMContentLoaded', function() {
  // Load content from JSON
  fetch('/web4/data/contact-content.json')
    .then(response => response.json())
    .then(data => {
      try { populateContent(data); } catch (e) { /* noop */ }
      initializeInteractions();
    })
    .catch(error => {
      console.error('Error loading content:', error);
      // Ensure interactions are initialized even if content fails
      initializeInteractions();
    });
});

function populateContent(data) {
  // Populate hero section (guarded)
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.textContent = data.hero?.title || '';
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = data.hero?.subtitle || '';

  // Leadership section (guarded)
  const leadershipTitle = document.getElementById('leadership-title');
  if (leadershipTitle && data.sections?.leadership) {
    leadershipTitle.innerHTML = `<ion-icon name="${data.sections.leadership.icon}"></ion-icon>${data.sections.leadership.title}`;
  }
  const leadershipGrid = document.getElementById('leadership-grid');
  if (leadershipGrid && data.sections?.leadership?.contacts) {
    leadershipGrid.innerHTML = data.sections.leadership.contacts.map(createContactCard).join('');
  }

  // Shop section (guarded)
  const shopTitle = document.getElementById('shop-title');
  if (shopTitle && data.sections?.shop) {
    shopTitle.innerHTML = `<ion-icon name="${data.sections.shop.icon}"></ion-icon>${data.sections.shop.title}`;
  }
  const shopSubtitle = document.getElementById('shop-subtitle');
  if (shopSubtitle && data.sections?.shop) shopSubtitle.textContent = data.sections.shop.subtitle || '';

  // Divisions section (dynamic variant if present)
  const divisionTabs = document.getElementById('division-tabs');
  const divisionContents = document.getElementById('division-contents');
  if (divisionTabs && divisionContents && data.sections?.divisions?.tabs) {
    const tabs = data.sections.divisions.tabs;
    divisionTabs.innerHTML = tabs.map((tab, index) => `
      <button class="division-tab ${index === 0 ? 'active' : ''}" data-division="${tab.id}" aria-controls="${tab.id}" aria-selected="${index===0}">
        <ion-icon name="${tab.icon}"></ion-icon> ${tab.name}
      </button>`).join('');
    divisionContents.innerHTML = tabs.map((tab, index) => `
      <div class="division-content" id="${tab.id}" ${index !== 0 ? 'style="display:none;"' : ''}>
        <div class="contact-grid">${tab.contacts.map(createContactCard).join('')}</div>
      </div>`).join('');
  }

  // Branches section (guarded)
  const branchesTitle = document.getElementById('branches-title');
  if (branchesTitle && data.sections?.branches) {
    branchesTitle.innerHTML = `<ion-icon name="${data.sections.branches.icon}"></ion-icon>${data.sections.branches.title}`;
  }
  const slideshow = document.getElementById('slideshow');
  if (slideshow && data.sections?.branches?.locations) {
    slideshow.innerHTML = data.sections.branches.locations.map(branch => `
      <div class="branch-slide">
        <div class="branch-info">
          <h3>${branch.name}</h3>
          <div class="contact-info">
            <div><ion-icon name="location-outline"></ion-icon>${branch.address}</div>
            <div><ion-icon name="call-outline"></ion-icon><a href="tel:${branch.phone}">${branch.phone}</a></div>
            <div><ion-icon name="mail-outline"></ion-icon><a href="mailto:${branch.email}">${branch.email}</a></div>
          </div>
        </div>
        <div class="branch-map"><iframe src="https://www.google.com/maps?q=${branch.mapQuery}&output=embed" allowfullscreen loading="lazy"></iframe></div>
      </div>`).join('');
  }

  // Footer (guarded)
  const flogo = document.getElementById('footer-logo');
  if (flogo && data.footer?.logo) flogo.src = data.footer.logo;
  const ftext = document.getElementById('footer-text');
  if (ftext && data.footer?.text) ftext.textContent = data.footer.text;
  const fct = document.getElementById('footer-contact-title');
  if (fct && data.footer?.contact?.title) fct.textContent = data.footer.contact.title;
  const fcl = document.getElementById('footer-contact-list');
  if (fcl && data.footer?.contact) {
    fcl.innerHTML = `
      <li><ion-icon name="location-outline"></ion-icon> ${data.footer.contact.address || ''}</li>
      <li><ion-icon name="call-outline"></ion-icon> <a href="tel:${data.footer.contact.phone}">${data.footer.contact.phone || ''}</a></li>
      <li><ion-icon name="mail-outline"></ion-icon> <a href="mailto:${data.footer.contact.email}">${data.footer.contact.email || ''}</a></li>`;
  }
  const fcr = document.getElementById('footer-copyright');
  if (fcr && data.footer?.copyright) fcr.textContent = data.footer.copyright;
}

function createContactCard(contact) {
  const contactInfo = (contact.email || contact.phone) ? `
    <div class="contact-info">
      ${contact.email ? `
        <div>
          <ion-icon name="mail-outline"></ion-icon>
          <a href="mailto:${contact.email}">${contact.email}</a>
        </div>
      ` : ''}
      ${contact.phone ? `
        <div>
          <ion-icon name="call-outline"></ion-icon>
          <a href="tel:${contact.phone}">${contact.phone}</a>
        </div>
      ` : ''}
    </div>
  ` : '';
  
  return `
    <div class="contact-card">
      <h3>${contact.name}</h3>
      <div class="role">${contact.role}</div>
      ${contactInfo}
    </div>
  `;
}

function initializeInteractions() {
  // Dynamic (JSON-built) division tabs
  const dynTabs = document.querySelectorAll('.division-tab');
  const dynPanels = document.querySelectorAll('.division-content');
  if (dynTabs.length && dynPanels.length) {
    dynTabs.forEach(tab => tab.addEventListener('click', () => {
      dynTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const id = tab.getAttribute('data-division') || tab.getAttribute('aria-controls');
      dynPanels.forEach(p => p.style.display = (p.id === id) ? 'block' : 'none');
    }));
  }

  // Static division tabs used on this page
  const staticTabs = document.querySelectorAll('.div-tabs .div-tab');
  const staticPanels = document.querySelectorAll('.div-panels .div-tab-panel');
  if (staticTabs.length && staticPanels.length) {
    staticTabs.forEach(tab => tab.addEventListener('click', () => {
      staticTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      staticPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      const id = tab.getAttribute('aria-controls');
      const panel = document.getElementById(id);
      if (panel) panel.classList.add('active');
    }));
  }

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Logo/arrow color on scroll (guard elements)
  const logo = document.getElementById('mainLogo');
  const contentContainer = document.querySelector('.contact-container');
  const tabSection = document.querySelector('.division-tabs, .div-tabs');
  const branchesSection = document.querySelector('.branches-slideshow');
  if (logo && scrollTopBtn && contentContainer && tabSection && branchesSection) {
    logo.style.transition = 'filter 0.3s, all 0.3s';
    scrollTopBtn.style.transition = 'color 0.3s';
    window.addEventListener('scroll', function() {
      const contentRect = contentContainer.getBoundingClientRect();
      const tabRect = tabSection.getBoundingClientRect();
      const branchesRect = branchesSection.getBoundingClientRect();
      if ((contentRect.top < 80 && tabRect.top > 300) || branchesRect.top < 200) {
        logo.src = '/web4/fotky/logo.blue.png';
        scrollTopBtn.style.color = '#0074d9';
      } else {
        logo.src = '/web4/fotky/logo.png';
        scrollTopBtn.style.color = '#fff';
      }
    });
  }

  // Branches Slideshow (transform variant)
  const slideshow = document.getElementById('slideshow');
  const slides = document.querySelectorAll('.branch-slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  if (slideshow && slides.length > 0 && prevBtn && nextBtn) {
    function updateSlideshow() { slideshow.style.transform = `translateX(-${currentSlide * 100}%)`; }
    function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; updateSlideshow(); }
    function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateSlideshow(); }
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    let slideInterval = setInterval(nextSlide, 5000);
    const slideshowContainer = document.querySelector('.branches-slideshow');
    if (slideshowContainer) {
      slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
      slideshowContainer.addEventListener('mouseleave', () => { slideInterval = setInterval(nextSlide, 5000); });
    }
    document.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') prevSlide(); else if (e.key === 'ArrowRight') nextSlide(); });
  }
}
(async () => {
  try {
    const res = await fetch('../data/content.json', { cache: 'no-cache' });
    const data = await res.json();
    const f = data.footer || {};
    const c = f.contact || {};
    const phone = c.phone || '';
    const email = c.email || '';
    const ico = c.ico || f.ico || '';
    const ln = f.linkedin || '';
    const fb = f.facebook || '';
    const ph = document.getElementById('footer-phone');
    const em = document.getElementById('footer-email');
    const ic = document.getElementById('footer-ico');
    const lnk = document.getElementById('footer-linkedin');
    const fbk = document.getElementById('footer-facebook');
    if (ph && phone) { ph.textContent = phone; ph.href = 'tel:' + phone.replace(/\s+/g,''); }
    if (em && email) { em.textContent = email; em.href = 'mailto:' + email; }
    if (ic && ico) { ic.textContent = 'IČO: ' + ico; }
    if (lnk && ln) lnk.href = ln;
    if (fbk && fb) fbk.href = fb;
  } catch (e) { /* noop */ }
})();

// Simple branches slider
(function(){
  const slides = Array.from(document.querySelectorAll('.branches-slideshow .branch-slide'));
  if (!slides.length) return;
  let i = slides.findIndex(s=>s.classList.contains('active'));
  if (i < 0) { i = 0; slides[0].classList.add('active'); }
  const show = (n) => { slides[i].classList.remove('active'); i = (n + slides.length) % slides.length; slides[i].classList.add('active'); };
  const prev = document.getElementById('prevSlide');
  const next = document.getElementById('nextSlide');
  if (prev) prev.addEventListener('click', () => show(i-1));
  if (next) next.addEventListener('click', () => show(i+1));
})();


document.addEventListener('DOMContentLoaded', function() {
  try {
    const ref = document.querySelector('.shop-description-card');
    if (!ref) return;
    const cs = getComputedStyle(ref);
    const bg = cs.backgroundColor;
    const clr = cs.color;
    const radius = cs.borderRadius;
    const padding = cs.padding;
    const shadow = cs.boxShadow;
    document.querySelectorAll('.shop-contact-section .contact-card').forEach(card => {
      card.style.backgroundColor = bg;
      card.style.color = clr;
      if (radius) card.style.borderRadius = radius;
      if (padding) card.style.padding = padding;
      if (shadow && shadow !== 'none') card.style.boxShadow = shadow;
      card.querySelectorAll('a').forEach(a => { a.style.color = clr; });
    });
  } catch (e) { /* noop */ }
});
