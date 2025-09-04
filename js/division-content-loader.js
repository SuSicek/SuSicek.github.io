// Division content loader and renderer
class DivisionContentRenderer {
    constructor() {
        this.content = null;
        this.currentDivision = null;
    }

    async loadContent() {
        try {
            const response = await fetch('/web4/data/content.json');
            this.content = await response.json();
            this.getCurrentDivisionFromURL();
            this.renderContent();
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    getCurrentDivisionFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const divisionParam = urlParams.get('division');
        
        if (divisionParam && this.content.divisions[divisionParam]) {
            this.currentDivision = divisionParam;
        } else {
            // Default to energetika if no valid division specified
            this.currentDivision = 'energetika';
        }
    }

    renderContent() {
        if (!this.content || !this.currentDivision) return;

        const division = this.content.divisions[this.currentDivision];
        
        this.renderMeta(division);
        this.renderNavigation();
        this.renderDivisionNavigation();
        this.renderHero(division);
        this.renderAboutDivision(division);
        this.renderServices(division);
        this.renderProjects(division);
        this.renderCTA(division);
        this.renderFooter();
    }

    renderMeta(division) {
        document.title = `${division.title} - ${this.content.meta.title}`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', division.description);
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

        // Menu items - adjust hrefs to point back to main page sections
        const navbarList = document.querySelector('.navbar-list');
        if (navbarList) {
            navbarList.innerHTML = nav.menuItems.map(item => {
                let href = item.href;
                // If it's a section link, prepend the main page path
                if (href.startsWith('#')) {
                    href = '/web4/html/index.html' + href;
                }
                return `<li><a href="${href}" class="navbar-link" data-nav-link>${item.text}</a></li>`;
            }).join('');
        }
    }

    renderDivisionNavigation() {
        // Set active state for current division navigation link
        const divisionNavLinks = document.querySelectorAll('.division-nav-link');
        divisionNavLinks.forEach(link => {
            const divisionType = link.getAttribute('data-division');
            if (divisionType === this.currentDivision) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    renderHero(division) {
        // New hero section with slideshow style
        const divisionHeroTitle = document.querySelector('.division-hero-title');
        if (divisionHeroTitle) divisionHeroTitle.textContent = division.title;

        const divisionSlideImg = document.querySelector('.division-slide__img');
        if (divisionSlideImg) {
            divisionSlideImg.style.backgroundImage = `url(${division.heroImage})`;
        }

        // Original division hero section (keeping for backward compatibility if needed)
        const divisionTitle = document.querySelector('.division-title');
        if (divisionTitle) divisionTitle.textContent = division.title;

        const divisionSubtitle = document.querySelector('.division-subtitle');
        if (divisionSubtitle) divisionSubtitle.textContent = division.subtitle;

        const heroImg = document.querySelector('.division-hero__img');
        if (heroImg) {
            heroImg.style.backgroundImage = `url(${division.heroImage})`;
        }
    }

    renderAboutDivision(division) {
        const aboutTitle = document.querySelector('.about-division-title');
        if (aboutTitle) aboutTitle.textContent = `O divizi ${division.title}`;

        const divisionDescription = document.querySelector('.division-description');
        if (divisionDescription) {
            divisionDescription.innerHTML = `<p>${division.description}</p>`;
        }
    }

    renderServices(division) {
        const servicesTitle = document.querySelector('.services-title');
        if (servicesTitle) servicesTitle.textContent = 'Naše služby';

        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            servicesGrid.innerHTML = division.services.map(service => `
                <div class="service-card">
                    <div class="service-icon">
                        <ion-icon name="${service.icon}"></ion-icon>
                    </div>
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-description">${service.description}</p>
                    ${service.buttonText && service.buttonLink ? `
                        <a href="${service.buttonLink}" class="service-info-btn">${service.buttonText}</a>
                    ` : ''}
                </div>
            `).join('');
        }
    }

    renderProjects(division) {
        const projectsTitle = document.querySelector('.projects-title');
        if (projectsTitle) projectsTitle.textContent = 'Realizované projekty';

        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = division.projects.map(project => `
                <div class="project-card">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-footer">
                            <span class="project-year">${project.year}</span>
                            <a href="#" class="project-info-btn">Více informací</a>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Render projects CTA button
        const projectsBtn = document.querySelector('.projects-btn');
        if (projectsBtn && division.projectsCta) {
            projectsBtn.textContent = division.projectsCta.text;
            projectsBtn.href = division.projectsCta.link;
        }
    }

    renderCTA(division) {
        const ctaTitle = document.querySelector('.cta-title');
        if (ctaTitle) ctaTitle.textContent = division.cta.title;

        const ctaText = document.querySelector('.cta-text');
        if (ctaText) ctaText.textContent = division.cta.text;

        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) ctaButton.textContent = division.cta.buttonText;
    }

    renderFooter() {
        const footer = this.content.footer;
        
        // Logo
        const footerLogo = document.querySelector('.footer-brand .logo img');
        if (footerLogo) {
            footerLogo.src = footer.logo;
            footerLogo.alt = footer.logoAlt;
        }

        // Contact title
        const contactTitle = document.querySelector('.contact-title');
        if (contactTitle) contactTitle.textContent = footer.contactTitle;

        // Contact items
        const footerContact = document.querySelector('.footer-contact ul');
        if (footerContact) {
            footerContact.innerHTML = footer.contacts.map(contact => {
                if (contact.type === 'address') {
                    return `
                        <li class="contact-item">
                            <ion-icon name="${contact.icon}"></ion-icon>
                            <address>${contact.value}</address>
                        </li>
                    `;
                } else {
                    return `
                        <li class="contact-item">
                            <ion-icon name="${contact.icon}"></ion-icon>
                            <a class="contact-link" href="${contact.href}">${contact.value}</a>
                        </li>
                    `;
                }
            }).join('');
        }

        // Footer links - adjust hrefs to point back to main page
        const footerBottomList = document.querySelector('.footer-bottom-list');
        if (footerBottomList) {
            footerBottomList.innerHTML = footer.links.map(link => `
                <li><a href="${link.href}" class="footer-bottom-link">${link.text}</a></li>
            `).join('');
        }

        // Copyright
        const footerCopyright = document.querySelector('.footer-copyright');
        if (footerCopyright) footerCopyright.textContent = footer.copyright;
    }
}

// Initialize division content renderer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const renderer = new DivisionContentRenderer();
    renderer.loadContent();
});
