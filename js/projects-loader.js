// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('scrollTopBtn');
  if (btn) {
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
// Projects Gallery JavaScript
class ProjectsGallery {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.currentSort = 'newest';
        this.projectsPerPage = 9;
        this.currentPage = 1;
        this.loadedProjects = 0;
        
        this.init();
    }
    handleUrlProjectId() {
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('projectId');
        
        if (projectId) {
            // Wait for projects to load
            const checkInterval = setInterval(() => {
                if (this.filteredProjects.length > 0) {
                    clearInterval(checkInterval);
                    const index = this.findProjectIndexById(projectId);
                    if (index !== -1) {
                        // Scroll to the project first
                        const grid = document.getElementById('projectsGrid');
                        if (grid && grid.children[index]) {
                            grid.children[index].scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                        
                        // Then open the modal after a short delay
                        setTimeout(() => {
                            this.openProjectModal(index);
                        }, 800);
                    }
                }
            }, 100);
        }
    }

    async init() {
        try {
            await this.loadContent();
            this.setupEventListeners();
            this.renderProjects();
            this.animateCounters();
            this.handleUrlProjectId(); // Add this line
        } catch (error) {
            console.error('Error initializing projects gallery:', error);
        }
    }

    async loadContent() {
    try {
    const response = await fetch('/web4/data/content.json');
        const data = await response.json();
        
        // Extract projects from references section and add additional gallery projects
        this.projects = [
            ...data.references.projects.map(project => ({
                ...project,
                // Ensure each project has a unique ID
                id: project.id || `project-${Math.random().toString(36).substr(2, 9)}`
            })),
            {
                "image": "/web4/fotky/bytovka.png",
                "imageAlt": "Bytová výstavba",
                "title": "Bytový komplex Ostrava",
                "category": "Stavba",
                "description": "Výstavba moderního bytového komplexu s 80 bytovými jednotkami a podzemními garážemi.",
                    "location": "Ostrava, Moravskoslezský kraj",
                    "year": "2024"
                },
                {
                    "image": "/web4/fotky/energetika3.png",
                    "imageAlt": "Fotovoltaika",
                    "title": "Fotovoltaická elektrárna Pardubice",
                    "category": "Energetika",
                    "description": "Instalace rozsáhlé fotovoltaické elektrárny o výkonu 1,8 MW na střechách průmyslového areálu.",
                    "location": "Pardubice, Pardubický kraj",
                    "year": "2024"
                },
                {
                    "image": "/web4/fotky/kontejner.png",
                    "imageAlt": "Logistické centrum",
                    "title": "Logistické centrum České Budějovice",
                    "category": "Stavba",
                    "description": "Výstavba moderního logistického centra s automatizovanými systémy skladování.",
                    "location": "České Budějovice, Jihočeský kraj",
                    "year": "2023"
                },
                {
                    "image": "/web4/fotky/savrec.png",
                    "imageAlt": "TZB hospital",
                    "title": "Nemocnice Zlín - TZB rekonstrukce",
                    "category": "TZB",
                    "description": "Komplexní rekonstrukce TZB systémů nemocničního komplexu včetně specializovaných zdravotnických instalací.",
                    "location": "Zlín, Zlínský kraj",
                    "year": "2023"
                },
                {
                    "image": "/web4/fotky/bagr.png",
                    "imageAlt": "Infrastruktura",
                    "title": "Infrastrukturní projekt Hradec Králové",
                    "category": "Stavba",
                    "description": "Výstavba nové infrastruktury včetně komunikací, inženýrských sítí a veřejného osvětlení.",
                    "location": "Hradec Králové, Královéhradecký kraj",
                    "year": "2022"
                },
                {
                    "image": "/web4/fotky/kontejnerbig.png",
                    "imageAlt": "Průmyslová stavba",
                    "title": "Výrobní komplex Olomouc",
                    "category": "Stavba",
                    "description": "Stavba rozsáhlého výrobního komplexu s administrativním centrem a technologickým zázemím.",
                    "location": "Olomouc, Olomoucký kraj",
                    "year": "2024"
                },
                {
                    "image": "/web4/fotky/dronBrno.png",
                    "imageAlt": "Smart building",
                    "title": "Chytrá budova Brno - TZB",
                    "category": "TZB",
                    "description": "Implementace inteligentních TZB systémů s IoT senzory a centrálním řízením budovy.",
                    "location": "Brno, Jihomoravský kraj",
                    "year": "2024"
                },
                // Add more projects from divisions if needed
                ...this.extractDivisionProjects(data.divisions)
            ];
            
            this.filteredProjects = [...this.projects];
            this.updateMetaData(data.meta);
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    extractDivisionProjects(divisions) {
        const divisionProjects = [];
        
        Object.values(divisions).forEach(division => {
            if (division.projects) {
                division.projects.forEach(project => {
                    divisionProjects.push({
                        ...project,
                        category: division.title,
                        imageAlt: project.title
                    });
                });
            }
        });
        
        return divisionProjects;
    }

    updateMetaData(meta) {
        if (meta) {
            document.title = `Galerie projektů - ${meta.title}`;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.content = `Galerie projektů - ${meta.description}`;
            }
        }
    }

    setupEventListeners() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setActiveFilter(e.target);
                this.filterProjects(filter);
            });
        });

        // Sort select
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProjects(e.target.value);
            });
        }

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreProjects();
            });
        }

        // Modal events
        this.setupModalEvents();

        // Header scroll effect
        this.setupHeaderScroll();
    }

    setActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    filterProjects(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        this.loadedProjects = 0;

        if (filter === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.category.toLowerCase() === filter.toLowerCase()
            );
        }

        this.sortProjects(this.currentSort);
    }

    sortProjects(sortType) {
        this.currentSort = sortType;

        switch (sortType) {
            case 'newest':
                this.filteredProjects.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                break;
            case 'oldest':
                this.filteredProjects.sort((a, b) => parseInt(a.year) - parseInt(b.year));
                break;
            case 'alphabetical':
                this.filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        this.renderProjects();
    }

    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        // Clear grid
        grid.innerHTML = '';
        this.loadedProjects = 0;

        // Show initial projects
        this.loadMoreProjects();
    }

    loadMoreProjects() {
        const grid = document.getElementById('projectsGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (!grid) return;

        const startIndex = this.loadedProjects;
        const endIndex = Math.min(startIndex + this.projectsPerPage, this.filteredProjects.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const project = this.filteredProjects[i];
            const projectCard = this.createProjectCard(project, i);
            grid.appendChild(projectCard);
        }

        this.loadedProjects = endIndex;

        // Show/hide load more button
        if (loadMoreBtn) {
            if (this.loadedProjects >= this.filteredProjects.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }

        // Animate new cards
        this.animateProjectCards();
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.category = project.category.toLowerCase();
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.imageAlt || project.title}" loading="lazy">
                <div class="project-overlay">
                    <button class="project-view-btn" data-project-index="${index}">
                        <ion-icon name="eye-outline"></ion-icon>
                        Zobrazit detail
                    </button>
                </div>
            </div>
            <div class="project-content">
                <div class="project-meta">
                    <span class="project-category">${project.category}</span>
                    <span class="project-year">${project.year}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                ${project.location ? `<div class="project-location">
                    <ion-icon name="location-outline"></ion-icon>
                    ${project.location}
                </div>` : ''}
            </div>
        `;

        // Add click event for modal
        const viewBtn = card.querySelector('.project-view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openProjectModal(index);
            });
        }

        return card;
    }

    setupModalEvents() {
        const modal = document.getElementById('projectModal');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');

        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.closeProjectModal());
        }

        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeProjectModal());
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeProjectModal();
            }
        });
    }

    openProjectModal(projectIndex) {
        const project = this.filteredProjects[projectIndex];
        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');
        if (!modal || !modalBody) return;

        // Support multiple images: prefer project.images, fallback to [project.image]
        const images = Array.isArray(project.images) && project.images.length > 0 ? project.images : [project.image];
        let currentImg = 0;

        modalBody.innerHTML = `
            <div class="modal-project">
                <div class="modal-project-image" style="position:relative;display:flex;align-items:center;justify-content:center;height:70vh;width:100%;overflow:hidden;">
                    <button class="modal-arrow modal-arrow-left" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.4);border:none;border-radius:50%;width:32px;height:32px;display:${images.length>1?'flex':'none'};align-items:center;justify-content:center;color:#fff;z-index:2;cursor:pointer;">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </button>
                    <img src="${images[0]}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block;">
                    <button class="modal-arrow modal-arrow-right" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.4);border:none;border-radius:50%;width:32px;height:32px;display:${images.length>1?'flex':'none'};align-items:center;justify-content:center;color:#fff;z-index:2;cursor:pointer;">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </button>
                </div>
                <div class="modal-project-content">
                    <div class="modal-project-meta">
                        <span class="project-category">${project.category}</span>
                        <span class="project-year">${project.year}</span>
                    </div>
                    <h2 class="modal-project-title">${project.title}</h2>
                    <p class="modal-project-description">${project.description}</p>
                    ${project.location ? `<div class="modal-project-location">
                        <ion-icon name="location-outline"></ion-icon>
                        ${project.location}
                    </div>` : ''}
                    <div class="modal-project-actions">
                        <a href="#contact" class="btn btn-primary" onclick="projectsGallery.closeProjectModal()">
                            Kontaktovat nás
                        </a>
                        <button class="btn btn-secondary" onclick="projectsGallery.closeProjectModal()">
                            Zavřít
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add arrow event listeners if multiple images (after DOM is updated)
        function renderImage() {
            modalBody.querySelector('.modal-project-image img').src = images[currentImg];
        }
        if (images.length > 1) {
            const leftBtn = modalBody.querySelector('.modal-arrow-left');
            const rightBtn = modalBody.querySelector('.modal-arrow-right');
            leftBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentImg = (currentImg - 1 + images.length) % images.length;
                renderImage();
            });
// --- Logo and scroll-to-top arrow color swap logic for projects page ---
            rightBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentImg = (currentImg + 1) % images.length;
                renderImage();
            });
        }

        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    closeProjectModal() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    animateProjectCards() {
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.project-card:not(.animated)', 
                { 
                    opacity: 0, 
                    y: 50 
                },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    stagger: 0.1,
                    ease: "power2.out",
                    onComplete: function() {
                        document.querySelectorAll('.project-card:not(.animated)').forEach(card => {
                            card.classList.add('animated');
                        });
                    }
                }
            );
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.counter);
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        });
    }

    setupHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('active');
            } else {
                header.classList.remove('active');
            }
        });

        // Scroll indicator functionality
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const filterSection = document.querySelector('.projects-filter');
                if (filterSection) {
                    filterSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });

            // Hide scroll indicator when user scrolls past hero
            window.addEventListener('scroll', () => {
                const heroHeight = document.querySelector('.projects-hero')?.offsetHeight || 0;
                if (window.scrollY > heroHeight * 0.5) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '0.8';
                }
            });
        }

        // Mobile menu toggle
        const navOpenBtn = document.querySelector('[data-nav-open-btn]');
        const navCloseBtn = document.querySelector('[data-nav-close-btn]');
        const navbar = document.querySelector('[data-navbar]');
        const overlay = document.querySelector('[data-overlay]');

        const toggleNavbar = () => {
            navbar?.classList.toggle('active');
            overlay?.classList.toggle('active');
        };

        navOpenBtn?.addEventListener('click', toggleNavbar);
        navCloseBtn?.addEventListener('click', toggleNavbar);
        overlay?.addEventListener('click', toggleNavbar);
    }
}

// Initialize when DOM is loaded

document.addEventListener('DOMContentLoaded', () => {
    window.projectsGallery = new ProjectsGallery();

    // --- Open project modal if ?project= is present in URL ---
    function openModalFromQuery() {
      const params = new URLSearchParams(window.location.search);
      const idx = params.get('project');
      if (idx !== null && !isNaN(idx)) {
        const projectIdx = Number(idx);
        const tryOpen = () => {
          if (window.projectsGallery && window.projectsGallery.filteredProjects && window.projectsGallery.filteredProjects.length > projectIdx) {
            const grid = document.getElementById('projectsGrid');
            if (grid) {
              // If the card is not rendered yet, load more projects
              while (grid.children.length <= projectIdx && window.projectsGallery.loadedProjects < window.projectsGallery.filteredProjects.length) {
                window.projectsGallery.loadMoreProjects();
              }
              const card = grid.children[projectIdx];
              if (card && typeof card.scrollIntoView === 'function') {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
            setTimeout(() => {
              window.projectsGallery.openProjectModal(projectIdx);
            }, 400);
          } else {
            setTimeout(tryOpen, 100);
          }
        };
        tryOpen();
      }
    }
    openModalFromQuery();

    // --- Logo and Arrow Color Swap Logic ---
    const logo = document.getElementById('mainLogo');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const projectsGridSection = document.querySelector('.projects-grid-section');
    if (logo && scrollTopBtn && projectsGridSection) {
      // Helper to set logo and arrow color
      // Add fade transition to logo and arrow
      logo.style.transition = 'opacity 0.3s';
      scrollTopBtn.style.transition = 'color 0.3s';
      let currentIsBlue = null;
      function setLogoArrowColor(isBlue) {
        if (currentIsBlue === isBlue) return;
        currentIsBlue = isBlue;
        // Fade out
        logo.style.opacity = 0;
        setTimeout(() => {
          logo.src = isBlue ? '/web4/fotky/logo.blue.png' : '/web4/fotky/logo.png';
          scrollTopBtn.style.color = isBlue ? '#0074d9' : '#fff';
          // Fade in
          logo.style.opacity = 1;
        }, 150);
      }

      // Use scroll event and getBoundingClientRect for reliable offset logic
      // Debounce for smoother transition
      let lastCall = 0;
      function handleLogoArrowSwap() {
        const now = Date.now();
        if (now - lastCall < 30) return;
        lastCall = now;
        const rect = projectsGridSection.getBoundingClientRect();
        // Switch to blue if top of section is above 50px from top of viewport and bottom is below -50px (100px lower)
        if (rect.top < 50 && rect.bottom > -50) {
          setLogoArrowColor(true);
        } else {
          setLogoArrowColor(false);
        }
      }
      window.addEventListener('scroll', handleLogoArrowSwap, { passive: true });
      // Run once on load
      handleLogoArrowSwap();
    }
});
