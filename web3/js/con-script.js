document.addEventListener('DOMContentLoaded', function() {
  // Load content from JSON
  fetch('/web3/data/contact-content.json')
    .then(response => response.json())
    .then(data => {
      populateContent(data);
      initializeInteractions();
    })
    .catch(error => console.error('Error loading content:', error));
});

function populateContent(data) {
  // Populate hero section
  document.getElementById('hero-title').textContent = data.hero.title;
  document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
  
  // Populate leadership section
  const leadershipTitle = document.getElementById('leadership-title');
  leadershipTitle.innerHTML = `<ion-icon name="${data.sections.leadership.icon}"></ion-icon>${data.sections.leadership.title}`;
  
  const leadershipGrid = document.getElementById('leadership-grid');
  leadershipGrid.innerHTML = data.sections.leadership.contacts.map(contact => 
    createContactCard(contact)
  ).join('');
  
  // Populate shop section
  const shopTitle = document.getElementById('shop-title');
  shopTitle.innerHTML = `<ion-icon name="${data.sections.shop.icon}"></ion-icon>${data.sections.shop.title}`;
  document.getElementById('shop-subtitle').textContent = data.sections.shop.subtitle;
  
  // Populate divisions section
  const divisionsTitle = document.getElementById('divisions-title');
  divisionsTitle.innerHTML = `<ion-icon name="${data.sections.divisions.icon}"></ion-icon>${data.sections.divisions.title}`;
  
  // Create division tabs
  const divisionTabs = document.getElementById('division-tabs');
  divisionTabs.innerHTML = data.sections.divisions.tabs.map((tab, index) => 
    `<button class="division-tab ${index === 0 ? 'active' : ''}" data-division="${tab.id}">
      <ion-icon name="${tab.icon}"></ion-icon> ${tab.name}
    </button>`
  ).join('');
  
  // Create division contents
  const divisionContents = document.getElementById('division-contents');
  divisionContents.innerHTML = data.sections.divisions.tabs.map((tab, index) => 
    `<div class="division-content" id="${tab.id}" ${index !== 0 ? 'style="display: none;"' : ''}>
      <div class="contact-grid">
        ${tab.contacts.map(contact => createContactCard(contact)).join('')}
      </div>
    </div>`
  ).join('');
  
  // Populate branches section
  const branchesTitle = document.getElementById('branches-title');
  branchesTitle.innerHTML = `<ion-icon name="${data.sections.branches.icon}"></ion-icon>${data.sections.branches.title}`;
  
  const slideshow = document.getElementById('slideshow');
  slideshow.innerHTML = data.sections.branches.locations.map(branch => 
    `<div class="branch-slide">
      <div class="branch-info">
        <h3>${branch.name}</h3>
        <div class="contact-info">
          <div>
            <ion-icon name="location-outline"></ion-icon>
            ${branch.address}
          </div>
          <div>
            <ion-icon name="call-outline"></ion-icon>
            <a href="tel:${branch.phone}">${branch.phone}</a>
          </div>
          <div>
            <ion-icon name="mail-outline"></ion-icon>
            <a href="mailto:${branch.email}">${branch.email}</a>
          </div>
        </div>
      </div>
      <div class="branch-map">
        <iframe src="https://www.google.com/maps?q=${branch.mapQuery}&output=embed" allowfullscreen loading="lazy"></iframe>
      </div>
    </div>`
  ).join('');
  
  // Populate footer
  document.getElementById('footer-logo').src = data.footer.logo;
  document.getElementById('footer-text').textContent = data.footer.text;
  document.getElementById('footer-contact-title').textContent = data.footer.contact.title;
  
  const footerContactList = document.getElementById('footer-contact-list');
  footerContactList.innerHTML = `
    <li><ion-icon name="location-outline"></ion-icon> ${data.footer.contact.address}</li>
    <li><ion-icon name="call-outline"></ion-icon> <a href="tel:${data.footer.contact.phone}">${data.footer.contact.phone}</a></li>
    <li><ion-icon name="mail-outline"></ion-icon> <a href="mailto:${data.footer.contact.email}">${data.footer.contact.email}</a></li>
  `;
  
  document.getElementById('footer-copyright').textContent = data.footer.copyright;
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
  // Division tabs switching
  const divisionTabs = document.querySelectorAll('.division-tab');
  const divisionContents = document.querySelectorAll('.division-content');
  
  divisionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      divisionTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      divisionContents.forEach(content => {
        content.style.display = 'none';
      });
      
      const divisionId = tab.dataset.division;
      document.getElementById(divisionId).style.display = 'block';
    });
  });
  
  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Logo and arrow color change on scroll (with smooth transition)
  const logo = document.getElementById('mainLogo');
  const contentContainer = document.querySelector('.contact-container');
  const tabSection = document.querySelector('.division-tabs');
  const branchesSection = document.querySelector('.branches-slideshow');

  if (logo && scrollTopBtn && contentContainer && tabSection && branchesSection) {
    // Ensure logo and arrow have transition
    logo.style.transition = 'filter 0.3s, all 0.3s';
    scrollTopBtn.style.transition = 'color 0.3s';

    window.addEventListener('scroll', function() {
      const contentRect = contentContainer.getBoundingClientRect();
      const tabRect = tabSection.getBoundingClientRect();
      const branchesRect = branchesSection.getBoundingClientRect();

      // Turn blue when content container reached, turn white earlier before tab section, then blue again for branches
      if ((contentRect.top < 80 && tabRect.top > 300) || branchesRect.top < 200) {
        logo.src = '/web3/fotky/logo.blue.png';
        scrollTopBtn.style.color = '#0074d9';
      } else {
        logo.src = '/web3/fotky/logo.png';
        scrollTopBtn.style.color = '#fff';
      }
    });
  }
  
  // Branches Slideshow
  const slideshow = document.getElementById('slideshow');
  const slides = document.querySelectorAll('.branch-slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  
  let currentSlide = 0;
  
  // Only proceed if all elements exist
  if (slideshow && slides.length > 0 && prevBtn && nextBtn) {
    
    // Update slideshow position
    function updateSlideshow() {
      slideshow.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Go to specific slide
    function goToSlide(index) {
      currentSlide = index;
      updateSlideshow();
    }
    
    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlideshow();
    }
    
    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlideshow();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance slides (optional)
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slideshowContainer = document.querySelector('.branches-slideshow');
    slideshowContainer.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
  }
}
