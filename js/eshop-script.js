document.addEventListener('DOMContentLoaded', function() {
  // Load content from JSON
  fetch('/web4/data/eshop-content.json')
    .then(response => response.json())
    .then(data => {
      populateContent(data);
      initializeFilters(data);
      initializeInteractions();
      initializeReservationSystem();
    })
    .catch(error => console.error('Error loading eshop content:', error));
});

let allProducts = [];
let filteredProducts = [];
let displayedProducts = 12;
let reservationItems = [];

function populateContent(data) {
  // Don't populate hero title - keep static "E-SHOP UCHYTIL"
  // document.getElementById('hero-title').textContent = data.hero.title;
  document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
  document.getElementById('hero-image').src = data.hero.image;
  
  // Populate hero features
  const heroFeatures = document.getElementById('hero-features');
  heroFeatures.innerHTML = data.hero.features.map(feature => 
    `<div class="hero-feature">
      <ion-icon name="${feature.icon}"></ion-icon>
      <span>${feature.text}</span>
    </div>`
  ).join('');
  
  // Populate categories with images
  const categoriesGrid = document.getElementById('categoriesGrid');
  categoriesGrid.innerHTML = data.categories.map(category => 
    `<div class="category-card" data-category="${category.id}">
      <div class="category-image">
        ${category.image ? 
          `<img src="${category.image}" alt="${category.name}">` : 
          `<div class="category-icon-fallback">
            <ion-icon name="${category.icon}"></ion-icon>
           </div>`
        }
      </div>
      <div class="category-content">
        <h3>${category.name}</h3>
        <p>${category.description}</p>
        <div class="category-stats">
          <span class="product-count">${category.productCount} produktů</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </div>
      </div>
    </div>`
  ).join('');
  
  // Add reservation process section
  if (data.reservationProcess) {
    addReservationProcessSection(data.reservationProcess);
  }
  
  // Add shop info section
  if (data.shopInfo) {
    addShopInfoSection(data.shopInfo);
  }
  
  // Store products globally
  allProducts = data.products;
  filteredProducts = [...allProducts];
  
  // Populate category filter
  const categoryFilter = document.getElementById('categoryFilter');
  data.categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categoryFilter.appendChild(option);
  });
  
  // Initial product display
  displayProducts();
  
  // Populate CTA section
  document.getElementById('cta-title').textContent = data.cta.title;
  document.getElementById('cta-text').textContent = data.cta.text;
  
  // Populate footer
  populateFooter(data.footer);
}

function displayProducts() {
  const productsGrid = document.getElementById('productsGrid');
  const productsToShow = filteredProducts.slice(0, displayedProducts);
  
  productsGrid.innerHTML = productsToShow.map(product => {
    const availability = product.availability || 'Na objednávku';
    const minReservationTime = product.minReservationTime || '1 den';
    
    return `<div class="product-card" data-product="${product.id}">
      <div class="product-image" data-gallery='${JSON.stringify(product.gallery || [])}'>
        <img src="${product.image}" alt="${product.name}">
        ${product.gallery && product.gallery.length > 1 ? 
          `<div class="product-gallery-indicator">
            <ion-icon name="images-outline"></ion-icon>
            ${product.gallery.length} fotek
          </div>` : ''
        }
        <div class="availability-badge ${availability === 'Skladem' ? 'available' : 'order'}">
          ${availability}
        </div>
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
      </div>
      <div class="product-content">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-meta">
          <small>Minimum rezervace: ${minReservationTime}</small>
        </div>
        <div class="product-footer">
          <span class="product-price">${product.price}</span>
          <button class="product-btn" data-product-id="${product.id}">
            <ion-icon name="calendar-outline"></ion-icon>
            Rezervovat
          </button>
        </div>
      </div>
    </div>`
  }).join('');
  
  // Show/hide load more button
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (displayedProducts >= filteredProducts.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-flex';
  }
}

function initializeFilters(data) {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortFilter = document.getElementById('sortFilter');
  
  // Search functionality
  searchInput.addEventListener('input', (e) => {
    filterProducts();
  });
  
  // Category filter
  categoryFilter.addEventListener('change', (e) => {
    filterProducts();
    // Scroll to products section when category is selected
    if (e.target.value) {
      const productsSection = document.querySelector('.section-alt');
      if (productsSection) {
        productsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
  
  // Sort functionality
  sortFilter.addEventListener('change', (e) => {
    sortProducts(e.target.value);
  });
  
  // Category card clicks
  document.addEventListener('click', (e) => {
    const categoryCard = e.target.closest('.category-card');
    if (categoryCard) {
      const categoryId = categoryCard.dataset.category;
      categoryFilter.value = categoryId;
      filterProducts();
      // Scroll to products section
      const productsSection = document.querySelector('.section-alt');
      if (productsSection) {
        productsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
}

function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryFilter').value;
  
  filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                         product.description.toLowerCase().includes(searchTerm);
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  displayedProducts = 12;
  displayProducts();
}

function sortProducts(sortBy) {
  filteredProducts.sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price':
        return parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, ''));
      case 'price-desc':
        return parseFloat(b.price.replace(/[^\d]/g, '')) - parseFloat(a.price.replace(/[^\d]/g, ''));
      default:
        return 0;
    }
  });
  
  displayProducts();
}

function initializeInteractions() {
  // Load more button
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      displayedProducts += 12;
      displayProducts();
    });
  }
  
  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Logo color change on scroll
  const logo = document.getElementById('mainLogo');
  const heroSection = document.querySelector('.eshop-hero');
  
  if (logo && scrollTopBtn && heroSection) {
    window.addEventListener('scroll', () => {
      const heroRect = heroSection.getBoundingClientRect();
      
      if (heroRect.bottom < 100) {
  logo.src = '/web4/fotky/logo.blue.png';
        scrollTopBtn.style.color = '#0074d9';
      } else {
  logo.src = '/web4/fotky/logo.png';
        scrollTopBtn.style.color = '#fff';
      }
    });
  }
}

function populateFooter(footerData) {
  document.getElementById('footer-logo').src = footerData.logo;
  document.getElementById('footer-text').textContent = footerData.text;
  document.getElementById('footer-contact-title').textContent = footerData.contact.title;
  
  const footerContactList = document.getElementById('footer-contact-list');
  footerContactList.innerHTML = `
    <li><ion-icon name="location-outline"></ion-icon> ${footerData.contact.address}</li>
    <li><ion-icon name="call-outline"></ion-icon> <a href="tel:${footerData.contact.phone}">${footerData.contact.phone}</a></li>
    <li><ion-icon name="mail-outline"></ion-icon> <a href="mailto:${footerData.contact.email}">${footerData.contact.email}</a></li>
  `;
  
  document.getElementById('footer-copyright').textContent = footerData.copyright;
}

function addReservationProcessSection(processData) {
  const container = document.querySelector('.section-alt');
  const processSection = document.createElement('section');
  processSection.className = 'section';
  processSection.innerHTML = `
    <div class="container">
      <div class="section-title">
        <h2>
          <ion-icon name="information-circle-outline"></ion-icon>
          ${processData.title}
        </h2>
        <p class="section-subtitle">Jednoduché kroky k získání vašich produktů</p>
      </div>
      <div class="process-steps">
        ${processData.steps.map(step => `
          <div class="process-step">
            <div class="step-number">${step.number}</div>
            <ion-icon name="${step.icon}" class="step-icon"></ion-icon>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  container.parentNode.insertBefore(processSection, container.nextSibling);
}

function addShopInfoSection(shopData) {
  const processSection = document.querySelector('.section:last-of-type');
  const shopSection = document.createElement('section');
  shopSection.className = 'section section-alt';
  shopSection.innerHTML = `
    <div class="container">
      <div class="section-title">
        <h2>
          <ion-icon name="storefront-outline"></ion-icon>
          ${shopData.title}
        </h2>
        <p class="section-subtitle">Navštivte naši moderní prodejnu pro osobní konzultace</p>
      </div>
      <div class="shop-info-content">
        <div class="shop-details-card">
          <h3>Informace o prodejně</h3>
          <p><strong>Adresa:</strong> ${shopData.address}</p>
          <div class="shop-hours">
            <h4>Otevírací doba:</h4>
            <p>${shopData.hours.weekdays}</p>
            <p>${shopData.hours.weekend}</p>
          </div>
          <div class="shop-actions">
            <a href="/web4/html/contact-us.html" class="btn btn-primary">
              <ion-icon name="location-outline"></ion-icon>
              Zobrazit na mapě
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  processSection.parentNode.insertBefore(shopSection, processSection.nextSibling);
}

function initializeReservationSystem() {
  // Product reservation buttons
  document.addEventListener('click', (e) => {
    const reserveBtn = e.target.closest('.product-btn');
    if (reserveBtn) {
      const productId = reserveBtn.dataset.productId;
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        showReservationModal(product);
      }
    }
    
    // Product image gallery
    const productImage = e.target.closest('.product-image');
    if (productImage) {
      const gallery = JSON.parse(productImage.dataset.gallery || '[]');
      if (gallery.length > 0) {
        showImageGallery(gallery);
      }
    }
  });
  
  // Create product modal
  createProductModal();
}

function showReservationModal(product) {
  const modal = document.getElementById('reservationModal');
  const modalContent = modal.querySelector('.modal-content');
  
  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeReservationModal()">
      <ion-icon name="close-outline"></ion-icon>
    </button>
    <div class="reservation-form">
      <h3>Objednávka z e-shopu: ${product.name}</h3>
      <div class="product-summary">
        <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
        <div>
          <h4>${product.name}</h4>
          <p>Cena: ${product.price}</p>
          <p>Dostupnost: ${product.availability}</p>
        </div>
      </div>
      
      <form id="reservationForm">
        <div class="form-group">
          <label for="quantity">Množství:</label>
          <input type="number" id="quantity" name="quantity" min="1" value="1" required>
        </div>
        
        <div class="form-group">
          <label for="pickupDate">Datum vyzvednutí:</label>
          <input type="date" id="pickupDate" name="pickupDate" required min="${getMinDate(product.minReservationTime)}">
        </div>
        
        <div class="form-group">
          <label for="pickupTime">Čas vyzvednutí:</label>
          <select id="pickupTime" name="pickupTime" required>
            <option value="">Vyberte čas</option>
            <option value="08:00">8:00</option>
            <option value="09:00">9:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="customerName">Jméno a příjmení:</label>
          <input type="text" id="customerName" name="customerName" required>
        </div>
        
        <div class="form-group">
          <label for="customerPhone">Telefon:</label>
          <input type="tel" id="customerPhone" name="customerPhone" required>
        </div>
        
        <div class="form-group">
          <label for="customerEmail">Email:</label>
          <input type="email" id="customerEmail" name="customerEmail" required>
        </div>
        
        <div class="form-group">
          <label for="notes">Poznámky (volitelné):</label>
          <textarea id="notes" name="notes" rows="3"></textarea>
        </div>
        
        <button type="submit" class="btn btn-primary" style="width: 100%;">
          <ion-icon name="calendar-outline"></ion-icon>
          Potvrdit objednávku
        </button>
      </form>
    </div>
  `;
  
  modal.style.display = 'flex';
  
  // Handle form submission
  document.getElementById('reservationForm').addEventListener('submit', handleReservationSubmit);
}

function createProductModal() {
  const modal = document.createElement('div');
  modal.id = 'reservationModal';
  modal.className = 'product-modal';
  modal.innerHTML = '<div class="modal-content"></div>';
  document.body.appendChild(modal);
  
  // Close modal on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeReservationModal();
    }
  });
}

function closeReservationModal() {
  document.getElementById('reservationModal').style.display = 'none';
}

function handleReservationSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const reservationData = Object.fromEntries(formData);
  
  // Here you would typically send the data to your backend
  console.log('E-shop order data:', reservationData);
  
  // Show success message
  alert('Objednávka byla úspěšně odeslána! Budeme vás kontaktovat pro potvrzení.');
  closeReservationModal();
}

function getMinDate(minTime) {
  const now = new Date();
  if (minTime && minTime.includes('24')) {
    now.setDate(now.getDate() + 1);
  }
  return now.toISOString().split('T')[0];
}

function showImageGallery(gallery) {
  const modal = document.getElementById('reservationModal');
  const modalContent = modal.querySelector('.modal-content');
  
  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeReservationModal()">
      <ion-icon name="close-outline"></ion-icon>
    </button>
    <div class="modal-gallery">
      ${gallery.map(img => `<img src="${img}" alt="Produktová fotka">`).join('')}
    </div>
  `;
  
  modal.style.display = 'flex';
}


