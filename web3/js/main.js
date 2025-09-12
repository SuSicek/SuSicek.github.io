// Advanced Slideshow with GSAP - Optimized
document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements efficiently

  
  let currentIndex = 0;
  let isAnimating = false;
  let autoSlideInterval;

  // Parallax scroll optimization
  if (window.gsap && window.ScrollTrigger && elements.AboutUsText && elements.AboutUsSection) {
    gsap.set(elements.AboutUsText, { y: '-40vh', opacity: 0 });
    gsap.to(elements.AboutUsText, {
      scrollTrigger: {
        trigger: elements.AboutUsSection,
        start: 'top 100%',
        end: 'top 10%',
        scrub: true,
      },
      y: '0vh',
      opacity: 1,
      ease: 'power2.out',
    });
  }

  // Initialize first slide efficiently
  function initializeSlideshow() {
    if (slides.length > 0) {
      slides[0].classList.add('active');
      slides[0].style.visibility = 'visible';
    }
    if (thumbnails.length > 0) {
      thumbnails[0].classList.add('active');
    }
    initCounterStrip();
    startAutoSlide();
  }

  // Optimized auto-slide functionality
  function startAutoSlide(delay = AUTO_SLIDE_DELAY) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      if (!isAnimating) navigate(NEXT);
    }, delay);
  }

  // Initialize counter strip efficiently
  function initCounterStrip() {
    if (!elements.counterStrip) return;
    
    elements.counterStrip.innerHTML = "";
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < slides.length; i++) {
      const numberDiv = document.createElement("div");
      numberDiv.className = "counter-number";
      numberDiv.textContent = (i + 1).toString().padStart(2, '0');
      fragment.appendChild(numberDiv);
    }
    
    elements.counterStrip.appendChild(fragment);
    gsap.set(elements.counterStrip, { y: 0 });

  }

  // Optimized counter animation
  function animateCounter(targetIndex, timeline) {
    if (!elements.counterStrip) return;
    
    const targetY = -targetIndex * 1.2;
    timeline.to(elements.counterStrip, {
      y: `${targetY}rem`,
      duration: SLIDE_DURATION,
      ease: "power2.inOut"
    }, 0.2);
  }

  // Optimized navigation function
  function navigate(direction) {
    if (isAnimating || slides.length === 0) return;
    
    const prevIndex = currentIndex;
    currentIndex = direction === NEXT
      ? (currentIndex + 1) % slides.length
      : (currentIndex - 1 + slides.length) % slides.length;
    
    performNavigation(prevIndex, currentIndex, direction);
  }

  // Optimized navigation animation
  function performNavigation(prevIndex, nextIndex, direction) {
    isAnimating = true;
    
    const currentSlide = slides[prevIndex];
    const currentImage = slideImages[prevIndex];
    const currentTextLines = currentSlide.querySelectorAll(".slide__text-line");
    const nextSlide = slides[nextIndex];
    const nextImage = slideImages[nextIndex];
    const nextTextLines = nextSlide.querySelectorAll(".slide__text-line");

    const tl = gsap.timeline({
      defaults: { duration: SLIDE_DURATION, ease: "power2.inOut" },
      onComplete: () => {
        gsap.set(currentSlide, { visibility: "hidden" });
        currentSlide.classList.remove("active");
        nextSlide.classList.add("active");
        updateThumbnails(nextIndex);
        isAnimating = false;
      }
    });

    animateCounter(nextIndex, tl);

    // Animate out current text
    tl.to(currentTextLines, {
      y: -80 + "%",
      opacity: 0,
      duration: 1.5,
      stagger: 0.05,
      ease: "power2.in"
    }, 0);

    const zoomDirection = direction === NEXT ? 1 : -1;
    const scaleIn = zoomDirection === 1 ? 0.7 : 1.3;
    const scaleOut = zoomDirection === 1 ? 1.3 : 0.7;

    // Set initial state for next slide
    gsap.set([nextSlide, nextImage], {
      scale: scaleIn,
      opacity: zoomDirection === 1 ? 0 : 0.5,
      transformOrigin: "center center"
    });
    gsap.set(nextSlide, { visibility: "visible" });

    // Animate out current slide
    tl.to([currentSlide, currentImage], {
      scale: scaleOut,
      opacity: 0,
      ease: "power2.in"
    }, 0.2);

    // Animate in next slide
    tl.to([nextSlide, nextImage], {
      scale: 1,
      opacity: 1,
      ease: "power2.out"
    }, 0.4);

    // Animate in next text
    gsap.set(nextTextLines, { y: "100%", opacity: 0 });
    tl.to(nextTextLines, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.3
    }, 0.7);
  }

  // Efficient thumbnail update
  function updateThumbnails(activeIndex) {
    thumbnails.forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === activeIndex);
    });
  }

  // Initialize slideshow
  initializeSlideshow();
  
  // Animate initial text lines efficiently
  slides.forEach((slide, idx) => {
    const textLines = slide.querySelectorAll('.slide__text-line');
    if (textLines.length > 0) {
      gsap.to(textLines, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        delay: 0.5 + idx * 0.2,
        ease: 'power2.out'
      });
    }
  });

  // Optimized cursor functionality
  if (elements.cursor) {
    let cursorTimeout;
    const windowWidth = window.innerWidth;
    
    document.addEventListener("mousemove", (e) => {
      gsap.to(elements.cursor, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1
      });
      
      elements.cursor.classList.add("active");
      elements.cursor.classList.toggle("prev", e.clientX < windowWidth / 2);
      elements.cursor.classList.toggle("next", e.clientX >= windowWidth / 2);

      clearTimeout(cursorTimeout);
      cursorTimeout = setTimeout(() => {
        elements.cursor.classList.remove("active");
      }, 2000);
    });

    document.addEventListener("mouseleave", () => {
      elements.cursor.classList.remove("active");
    });
  }

  // Event delegation for navigation links
  document.addEventListener('click', (e) => {
    if (e.target.matches('.navbar-link')) {
      const href = e.target.getAttribute('href');
      if (href?.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });

  // Optimized keyboard navigation
  document.addEventListener("keydown", (e) => {
    const { key } = e;
    if (key === "ArrowDown" || key === "ArrowRight") navigate(NEXT);
    else if (key === "ArrowUp" || key === "ArrowLeft") navigate(PREV);
  });

  // Optimized thumbnail navigation with event delegation
  if (thumbnails.length > 0) {
    elements.slideshow.addEventListener('click', (e) => {
      const thumb = e.target.closest('.thumbnail');
      if (!thumb || isAnimating) return;
      
      const idx = Array.from(thumbnails).indexOf(thumb);
      if (idx === -1 || idx === currentIndex) return;
      
      const direction = idx > currentIndex ? NEXT : PREV;
      performNavigation(currentIndex, idx, direction);
      currentIndex = idx;
      startAutoSlide(RESET_DELAY);
    });
  }

  // Jobs Tabs Functionality
  initJobsTabs();
});

// Optimized Jobs Tabs System
function initJobsTabs() {
  const elements = {
    tabsContainer: document.getElementById('jobsTabs'),
    tabPrev: document.getElementById('tabPrev'),
    tabNext: document.getElementById('tabNext'),
    tabs: document.querySelectorAll('.job-tab'),
    tabContents: document.querySelectorAll('.jobs-tab-content')
  };
  
  if (!elements.tabsContainer || !elements.tabs.length) return;

  // Constants
  const TAB_WIDTH = 166;
  const VISIBLE_TABS = 5;
  const ANIMATION_DURATION = 300;
  
  let currentTabIndex = 0;
  let visibleTabs = Math.min(VISIBLE_TABS, elements.tabs.length);

  // Optimized infinite scroll creation
  function createInfiniteScroll() {
    if (visibleTabs >= elements.tabs.length) return;
    
    const tabsArray = Array.from(elements.tabs);
    const fragment = document.createDocumentFragment();
    
    // Clone tabs for infinite scroll
    [...tabsArray.slice(0, visibleTabs), ...tabsArray.slice(-visibleTabs)].forEach((tab, index) => {
      const clone = tab.cloneNode(true);
      clone.classList.add('cloned');
      if (index < visibleTabs) {
        fragment.appendChild(clone);
      } else {
        elements.tabsContainer.insertBefore(clone, elements.tabsContainer.firstChild);
      }
    });
    
    elements.tabsContainer.appendChild(fragment);
    attachTabEventListeners();
  }

  // Optimized scroll parameters calculation
  function calculateScrollParams() {
    visibleTabs = Math.min(VISIBLE_TABS, elements.tabs.length);
    
    const showArrows = visibleTabs < elements.tabs.length;
    elements.tabPrev?.classList.toggle('active', showArrows);
    elements.tabNext?.classList.toggle('active', showArrows);
    
    if (showArrows) {
      currentTabIndex = visibleTabs;
      updateTabsPosition(false);
    }
  }

  // Optimized position update
  function updateTabsPosition(animate = true) {
    const translateX = currentTabIndex * TAB_WIDTH;
    
    elements.tabsContainer.style.transition = animate ? 'transform 0.3s ease' : 'none';
    elements.tabsContainer.style.transform = `translateX(-${translateX}px)`;
    
    // Update arrow opacity
    if (elements.tabPrev) elements.tabPrev.style.opacity = '1';
    if (elements.tabNext) elements.tabNext.style.opacity = '1';
  }

  // Optimized infinite scroll handling
  function handleInfiniteScroll(direction) {
    const isNext = direction === 'next';
    currentTabIndex += isNext ? 1 : -1;
    updateTabsPosition(true);
    
    setTimeout(() => {
      if (isNext && currentTabIndex >= elements.tabs.length + visibleTabs) {
        currentTabIndex = visibleTabs;
        updateTabsPosition(false);
      } else if (!isNext && currentTabIndex < visibleTabs) {
        currentTabIndex = elements.tabs.length + visibleTabs - 1;
        updateTabsPosition(false);
      }
    }, ANIMATION_DURATION);
  }

  // Optimized tab switching
  function switchTab(targetTab) {
    const tabData = targetTab.getAttribute('data-tab');
    if (!tabData) return;
    
    // Update all tabs and contents efficiently
    document.querySelectorAll('.job-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabData);
    });
    
    elements.tabContents.forEach(content => {
      content.classList.toggle('active', content.id === tabData);
    });
  }

  // Event delegation for tab clicks
  function attachTabEventListeners() {
    elements.tabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.job-tab');
      if (tab) switchTab(tab);
    });
  }

  // Event listeners
  elements.tabPrev?.addEventListener('click', () => handleInfiniteScroll('prev'));
  elements.tabNext?.addEventListener('click', () => handleInfiniteScroll('next'));

  // Optimized keyboard and wheel navigation
  const handleNavigation = (e) => {
    if (!document.querySelector('#jobs:hover') && !document.activeElement.closest('#jobs')) return;
    
    if (e.type === 'keydown') {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleInfiniteScroll('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleInfiniteScroll('next');
      }
    } else if (e.type === 'wheel' && visibleTabs < elements.tabs.length) {
      e.preventDefault();
      handleInfiniteScroll(e.deltaY > 0 ? 'next' : 'prev');
    }
  };

  document.addEventListener('keydown', handleNavigation);
  elements.tabsContainer.parentElement?.addEventListener('wheel', handleNavigation);

  // Initialize
  createInfiniteScroll();
  calculateScrollParams();
  window.addEventListener('resize', calculateScrollParams);
}

// Optimized Header Sticky and Go Top functionality
(function() {
  const elements = {
    header: document.querySelector('[data-header]'),
    goTopBtn: document.querySelector('[data-go-top]'),
    logo: document.querySelector('.header-top .logo'),
    phone: document.querySelector('.helpline-box'),
    social: document.querySelector('.social-list'),
    navbar: document.querySelector('.header-bottom'),
    navbarLinks: document.querySelectorAll('.navbar-link')
  };

  const SCROLL_THRESHOLD = 200;
  let isSticky = false;

  function toggleSticky(shouldBeSticky) {
    if (isSticky === shouldBeSticky) return;
    
    isSticky = shouldBeSticky;
    
    elements.header?.classList.toggle('active', isSticky);
    elements.goTopBtn?.classList.toggle('active', isSticky);
    
    // Toggle visibility of header elements
    [elements.logo, elements.phone, elements.social].forEach(el => {
      if (el) el.style.display = isSticky ? 'none' : '';
    });
    
    // Adjust navbar styling
    if (elements.navbar) {
      elements.navbar.style.height = isSticky ? '75px' : '';
      elements.navbar.style.top = isSticky ? '0px' : '';
    }
    
    // Update navbar link colors
    elements.navbarLinks.forEach(link => {
      link.style.color = isSticky ? '#222' : '';
    });
  }

  // Throttled scroll handler
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        toggleSticky(window.scrollY >= SCROLL_THRESHOLD);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
})();

// --- Ensure Ionicons scripts are present for icon rendering ---
(function ensureIonicons() {
  const head = document.head;
  if (!document.querySelector('script[src*="ionicons.esm.js"]')) {
    const scriptModule = document.createElement('script');
    scriptModule.type = 'module';
    scriptModule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
    head.appendChild(scriptModule);
  }
  if (!document.querySelector('script[src*="ionicons/ionicons.js"]')) {
    const scriptNoModule = document.createElement('script');
    scriptNoModule.setAttribute('nomodule', '');
    scriptNoModule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
    head.appendChild(scriptNoModule);
  }
})();


// Add this to your main page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Handle reference project clicks
    document.querySelectorAll('.reference-card .view-details-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.dataset.projectId;
            
            // Navigate to projects page with the project ID in URL
            window.location.href = `/web3/html/projects.html?projectId=${projectId}`;
        });
    });
});


// --- Logo and Arrow Color Swap Logic (white by default, blue when main in view) ---
document.addEventListener('DOMContentLoaded', function() {
  const logo = document.getElementById('mainLogo');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const mainSection = document.querySelector('main');
  if (logo && scrollTopBtn && mainSection) {
    logo.src = '/web3/fotky/logo.png';
    logo.style.transition = 'opacity 0.3s';
    scrollTopBtn.style.transition = 'color 0.3s';
    let currentIsBlue = null;
    function setLogoArrowColor(isBlue) {
      if (currentIsBlue === isBlue) return;
      currentIsBlue = isBlue;
      logo.style.opacity = 0;
      setTimeout(() => {
        logo.src = isBlue ? '/web3/fotky/logo.blue.png' : '/web3/fotky/logo.png';
        scrollTopBtn.style.color = isBlue ? '#0074d9' : '#fff';
        logo.style.opacity = 1;
      }, 150);
    }
    let lastCall = 0;
    function handleLogoArrowSwap() {
      const now = Date.now();
      if (now - lastCall < 30) return;
      lastCall = now;
      const rect = mainSection.getBoundingClientRect();
      // If main section is at least partially in view, switch to blue
      if (rect.top < 50 && rect.bottom > 50) {
        setLogoArrowColor(true);
      } else {
        setLogoArrowColor(false);
      }
    }
    window.addEventListener('scroll', handleLogoArrowSwap, { passive: true });
    handleLogoArrowSwap();
  }
});

// Tab switching logic
document.querySelectorAll('.contactus-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.contactus-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.contactus-tab-content').forEach(c => c.style.display = 'none');
    const target = document.getElementById(this.dataset.tab);
    if (target) target.style.display = 'block';
  });
});

// Scroll-to-top button logic
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}