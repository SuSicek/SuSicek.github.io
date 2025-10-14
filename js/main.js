// --- Add missing variable declarations to avoid ReferenceErrors ---
const elements = window.elements || {
  AboutUsText: null,
  AboutUsSection: null,
  counterStrip: null,
  cursor: null,
  slideshow: document.querySelector('.slideshow')
};
const slides = window.slides || Array.from(document.querySelectorAll('.slide'));
const thumbnails = window.thumbnails || Array.from(document.querySelectorAll('.thumbnail'));
const slideImages = window.slideImages || Array.from(document.querySelectorAll('.slide__img'));
const NEXT = 'next';
const PREV = 'prev';
const SLIDE_DURATION = 0.8; // seconds, adjust as needed
const RESET_DELAY = 8000; // ms, adjust as needed

const UPDATE = ({ x, y }) => {
  const xNorm = (x / window.innerWidth - 0.5) * 2;
  const yNorm = (y / window.innerHeight - 0.5) * 2;
  
  document.querySelectorAll('.slide.active').forEach(slide => {
    slide.style.setProperty('--x', xNorm);
    slide.style.setProperty('--y', yNorm);
  });
};

// Advanced Slideshow with GSAP - Optimized
document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements efficiently

  window.addEventListener('mousemove', UPDATE);

  let currentIndex = 0;
  let isAnimating = false;
  let autoSlideInterval;

  //for mobile//
  const handleOrientation = ({ beta, gamma }) => {
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  const xVal = Math.max(-1, Math.min(1, isLandscape ? (beta || 0) / 45 : (gamma || 0) / 45));
  const yVal = Math.max(-1, Math.min(1, isLandscape ? Math.abs(gamma || 0) / 45 : (beta || 0) / 45));

  document.querySelectorAll('.slide.active').forEach(slide => {
    slide.style.setProperty('--x', xVal);
    slide.style.setProperty('--y', yVal);
  });
};
    const slideshow = document.querySelector('.slideshow');
    // Stat number animation (copied from aboutus.js)
    document.addEventListener('DOMContentLoaded', function() {
      const counters = document.querySelectorAll('.stat-number[data-count]');
      if (!counters.length) return;
      const co = new IntersectionObserver((ents) => {
        ents.forEach(ent => {
          if (!ent.isIntersecting) return;
          const el = ent.target;
          const target = parseInt(el.dataset.count || '0', 10);
          const start = performance.now();
          const dur = 1000 + Math.min(2000, target * 15);
          function tick(ts) {
            const p = Math.min(1, (ts - start) / dur);
            el.textContent = Math.round(target * (0.2 + 0.8 * p));
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          co.unobserve(el);
        });
      }, { threshold: 0.4 });
      counters.forEach(el => co.observe(el));
    });
    if (!slideshow) return;

    function addSubtitle(slide) {
      const textWrap = slide.querySelector('.slide__text');
      if (!textWrap || textWrap.querySelector('.slide__subtitle')) return;
      const subtitle = document.createElement('div');
      subtitle.className = 'slide__subtitle';
      subtitle.textContent = slide.getAttribute('data-subtitle') || 'Profesionální řešení na klíč';
      textWrap.appendChild(subtitle);
    }

    // Add to any existing slides
    slideshow.querySelectorAll('.slide').forEach(addSubtitle);

    // Watch for slides added by scripts and decorate them
    const mo = new MutationObserver(mutations => {
      for (const m of mutations) {
        m.addedNodes && m.addedNodes.forEach(n => {
          if (n.nodeType !== 1) return;
          if (n.classList?.contains('slide')) addSubtitle(n);
          n.querySelectorAll?.('.slide').forEach(addSubtitle);
        });
      }
    });
    mo.observe(slideshow, { childList: true, subtree: true });
  });

const START = () => {
  if (DeviceOrientationEvent?.requestPermission) {
    DeviceOrientationEvent.requestPermission().then((result) => {
      if (result === "granted") {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    });
  } else {
    window.addEventListener("deviceorientation", handleOrientation);
  }
};

document.body.addEventListener("click", START, { once: true });

(function () {

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

  // Ensure each slide has a subtitle element (uses data-subtitle if provided)
  function ensureSlideSubtitles() {
    if (!window.slides) return;
    slides.forEach(slide => {
      if (!slide.querySelector('.slide__subtitle')) {
        const subtitleText =
          slide.getAttribute('data-subtitle') ||
          'Profesionální řešení na klíč';
        const subtitleEl = document.createElement('div');
        subtitleEl.className = 'slide__subtitle';
        subtitleEl.textContent = subtitleText;
        const textContainer = slide.querySelector('.slide__text');
        if (textContainer) textContainer.appendChild(subtitleEl);
      }
    });
  }

  // Starts the auto-advance timer
  function startAutoSlide(delay = 8000) { // was: AUTO_SLIDE_DELAY
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

    document.querySelectorAll('.slide').forEach(slide => {
      slide.style.setProperty('--x', 0);
      slide.style.setProperty('--y', 0);
    });    

    const currentSlide = slides[prevIndex];
    const currentImage = slideImages[prevIndex];
    const currentTextLines = currentSlide.querySelectorAll(".slide__text-line");
    const nextSlide = slides[nextIndex];
    const nextImage = slideImages[nextIndex];
    const nextTextLines = nextSlide.querySelectorAll(".slide__text-line");
    const currentSubtitle = currentSlide.querySelector(".slide__subtitle");
    const nextSubtitle = nextSlide.querySelector(".slide__subtitle");

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

    tl.call(() => {
      document.querySelector('.slide.active').style.setProperty('--x', 0);
      document.querySelector('.slide.active').style.setProperty('--y', 0);
    });

    animateCounter(nextIndex, tl);


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
  }

  // Efficient thumbnail update
  function updateThumbnails(activeIndex) {
    thumbnails.forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === activeIndex);
    });
  }

  // Initialize slideshow
  initializeSlideshow();


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
            window.location.href = `../html/projects.html?projectId=${projectId}`;
        });
    });
});


// --- Logo and Arrow Color Swap Logic (white by default, blue when main in view) ---
document.addEventListener('DOMContentLoaded', function() {
  const logo = document.getElementById('mainLogo');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const mainSection = document.querySelector('main');
  if (logo && scrollTopBtn && mainSection) {
    logo.src = '../fotky/logo.png';
    logo.style.transition = 'opacity 0.3s';
    scrollTopBtn.style.transition = 'color 0.3s';
    let currentIsBlue = null;
    function setLogoArrowColor(isBlue) {
      if (currentIsBlue === isBlue) return;
      currentIsBlue = isBlue;
      logo.style.opacity = 0;
      setTimeout(() => {
  logo.src = isBlue ? '../fotky/logo.blue.png' : '../fotky/logo.png';
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

// Footer data loader (moved from index.html)
document.addEventListener('DOMContentLoaded', () => {
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
      if (lnk && ln) { lnk.href = ln; }
      if (fbk && fb) { fbk.href = fb; }
    } catch (e) {
      /* noop */
    }
  })();
});





// Services Rolldown functionality
document.addEventListener('DOMContentLoaded', function() {
  const servicesTrigger = document.getElementById('servicesTrigger');
  const servicesPanel = document.getElementById('servicesPanel');
  const servicesRolldown = document.getElementById('servicesRolldown');
  
  if (!servicesTrigger || !servicesPanel) return;
  
  // Toggle menu on click
  servicesTrigger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const isOpen = servicesRolldown.classList.contains('open');
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!servicesRolldown.contains(e.target)) {
      closeMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
  
  function openMenu() {
    servicesRolldown.classList.add('open');
    servicesTrigger.setAttribute('aria-expanded', 'true');
  }
  
  function closeMenu() {
    servicesRolldown.classList.remove('open');
    servicesTrigger.setAttribute('aria-expanded', 'false');
  }
});

// Remove any slideshow-generated text so only the static overlay remains
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Restrict to main homepage slideshow only (assumes .slideshow--main or first .slideshow)
    const mainSlideshow = document.querySelector('.slideshow--main') || document.querySelector('.slideshow');
    if (!mainSlideshow) return;
    mainSlideshow.querySelectorAll('.slide .slide__text, .slide-info').forEach(el => el.remove());
  } catch (e) { /* noop */ }
});

// Ensure no dynamic slide text appears; keep only static overlay
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Restrict to main homepage slideshow only (assumes .slideshow--main or first .slideshow)
    const mainSlideshow = document.querySelector('.slideshow--main') || document.querySelector('.slideshow');
    if (!mainSlideshow) return;

    const cleanSlideTexts = () => {
      // Remove known dynamic text containers only in main slideshow
      mainSlideshow.querySelectorAll('.slide__text, .slide__subtitle, .slide__text-line, .slide-info').forEach(el => el.remove());
      // Clear any literal 'undefined' texts
      mainSlideshow.querySelectorAll('*').forEach(el => {
        const t = el.textContent && el.textContent.trim().toLowerCase();
        if (t === 'undefined') el.textContent = '';
      });
    };

    // Initial cleanup
    cleanSlideTexts();

    // Observe future changes and clean again
    const mo = new MutationObserver(() => cleanSlideTexts());
    mo.observe(mainSlideshow, { childList: true, subtree: true });
  } catch (e) { /* noop */ }
});